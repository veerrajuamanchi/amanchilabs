import { chromium, expect, test } from '@playwright/test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const activeCanvas = '.panel-canvas:not(.panel-canvas--outgoing)'
const existingPanels = ['overview', 'products', 'wealth', 'derma', 'principles', 'contact']

test('existing direct routes and invalid fallback', async ({ page }) => {
  for (const panel of existingPanels) {
    await page.goto('/#' + panel)
    await expect(page.locator(activeCanvas + ' > section')).toHaveClass(new RegExp(panel + '-panel'))
    await expect(page.locator(activeCanvas).getByRole('heading', { level: 1 })).toBeVisible()
    await page.reload()
    await expect(page.locator(activeCanvas + ' > section')).toHaveClass(new RegExp(panel + '-panel'))
  }
  for (const path of ['/', '/#unknown']) {
    await page.goto(path)
    await expect(page.locator(activeCanvas + ' > section')).toHaveClass('overview-panel')
  }
})

test('native hash history and focus stay synchronized', async ({ page }) => {
  await page.goto('/#overview')
  const nav = page.locator('.sidebar')
  await nav.getByRole('link', { name: 'Principles', exact: true }).click()
  await expect(page).toHaveURL(/#principles$/)
  await expect(page.locator('#main-content')).toBeFocused()
  await nav.getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL(/#contact$/)
  await page.goBack()
  await expect(page.locator(activeCanvas + ' > section')).toHaveClass('principles-panel')
  await page.goForward()
  await expect(page.locator(activeCanvas + ' > section')).toHaveClass('contact-panel')
  await expect(page.locator('.panel-canvas--outgoing')).toHaveCount(0)
})

test('mobile drawer traps focus and restores it on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/#overview')
  const toggle = page.getByRole('button', { name: 'Open navigation menu' })
  await toggle.click()
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' })
  const close = dialog.getByRole('button', { name: 'Close navigation menu' })
  await expect(close).toBeFocused()
  await expect(page.locator('#main-content')).toHaveAttribute('inert', '')
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: 'Contact', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(page.locator('#main-content')).not.toHaveAttribute('inert')
  await toggle.click()
  await dialog.getByRole('link', { name: 'Principles', exact: true }).click()
  await expect(dialog).toHaveCount(0)
  await expect(page).toHaveURL(/#principles$/)
  await expect(page.locator('#main-content')).toBeFocused()
})

test('existing external and email destinations are preserved', async ({ page }) => {
  await page.goto('/#wealth')
  await expect(page.locator(activeCanvas + ' a')).toHaveAttribute('href', 'mailto:founder@amanchilabs.com?subject=WealthPrivate%20inquiry')
  await page.goto('/#derma')
  const external = page.locator(activeCanvas + ' a')
  await expect(external).toHaveAttribute('href', 'https://dermaprivate-website.onrender.com/index.html')
  await expect(external).toHaveAttribute('rel', 'noopener noreferrer')
  await page.goto('/#contact')
  await expect(page.locator(activeCanvas + ' a[href^="mailto:founder@"]')).toHaveCount(1)
  await expect(page.locator(activeCanvas + ' a[href^="mailto:support@"]')).toHaveCount(1)
})

test('four-item navigation and product discovery preserve individual routes', async ({ page }) => {
  await page.goto('/#overview')
  const nav = page.locator('.sidebar nav')
  await expect(nav.getByRole('link')).toHaveText(['Overview', 'Products', 'Principles', 'Contact'])
  await nav.getByRole('link', { name: 'Products', exact: true }).click()
  await expect(page).toHaveURL(/#products$/)
  await expect(page.locator(activeCanvas + ' article')).toHaveCount(2)
  await page.getByRole('button', { name: 'Discover WealthPrivate' }).click()
  await expect(page).toHaveURL(/#wealth$/)
  await expect(nav.getByRole('link', { name: 'Products', exact: true })).not.toHaveAttribute('aria-current')
  await page.goBack()
  await expect(page).toHaveURL(/#products$/)
  await page.getByRole('button', { name: 'Discover DermaPrivate' }).click()
  await expect(page).toHaveURL(/#derma$/)
  await page.goBack()
  await page.getByRole('button', { name: 'Back to Overview' }).click()
  await expect(page).toHaveURL(/#overview$/)
})

test('desktop keyboard navigation, brand, and skip link work', async ({ page }) => {
  await page.goto('/#overview')
  const nav = page.locator('.sidebar nav')
  const overview = nav.getByRole('link', { name: 'Overview', exact: true })
  await overview.focus()
  await page.keyboard.press('ArrowUp')
  await expect(nav.getByRole('link', { name: 'Contact', exact: true })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(overview).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#products$/)
  await nav.getByRole('link', { name: 'Principles', exact: true }).focus()
  await page.keyboard.press('Space')
  await expect(page).toHaveURL(/#principles$/)
  await page.locator('.sidebar .brand').click()
  await expect(page).toHaveURL(/#overview$/)
  await page.getByRole('link', { name: 'Skip to content' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  await expect(page.locator(activeCanvas + ' > section')).toHaveClass('overview-panel')
})

test('Overview copy, diagram, and actions follow the approved narrative', async ({ page }) => {
  await page.goto('/#overview')
  await expect(page.locator(activeCanvas + ' article')).toHaveCount(0)
  for (const heading of ['Your life is not a dataset.', 'Not everything needs the cloud.', 'Intelligence without unnecessary exposure.', 'Your information remains yours.', 'Your information. Your decision.']) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toHaveCount(1)
  }
  await expect(page.locator('figcaption')).toContainText('Our design intention:')
  await expect(page.locator('figcaption')).toContainText('external AI feature')
  await expect(page.locator('figcaption')).toContainText('Illustrative design philosophy')
  await page.getByRole('button', { name: 'Explore our philosophy' }).click()
  await expect(page).toHaveURL(/#principles$/)
  await page.goBack()
  await page.getByRole('button', { name: 'Explore our products' }).click()
  await expect(page).toHaveURL(/#products$/)
  await expect(page.locator(activeCanvas)).toContainText('Features and data-handling practices vary by product')
})

for (const [width, height] of [[1440, 900], [1280, 800], [1024, 768], [375, 812], [768, 900], [1023, 768], [1280, 600], [1024, 600]]) {
  test(`responsive layout ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    for (const panel of ['overview', 'products']) {
      await page.goto('/#' + panel)
      await page.evaluate(() => document.fonts.ready)
      const metrics = await page.locator(activeCanvas).evaluate(canvas => {
        const rect = canvas.getBoundingClientRect()
        const controls = Array.from(canvas.querySelectorAll('button'))
        return {
          overflow: canvas.scrollWidth > canvas.clientWidth,
          headingTop: canvas.querySelector('h1')!.getBoundingClientRect().top,
          firstActionBottom: controls[0].getBoundingClientRect().bottom,
          clippedContainers: Array.from(canvas.querySelectorAll('section')).filter(element => ['hidden', 'clip'].includes(getComputedStyle(element).overflowY)).length,
          offscreen: Array.from(canvas.querySelectorAll('h1, h2, h3, p, button, figure')).filter(element => {
            const child = element.getBoundingClientRect()
            return child.left < rect.left - 1 || child.right > rect.right + 1 || element.scrollWidth > element.clientWidth + 1
          }).map(element => element.className),
          smallTargets: controls.filter(element => element.getBoundingClientRect().height < 44).length,
        }
      })
      expect(metrics.overflow).toBe(false)
      expect(metrics.offscreen).toEqual([])
      expect(metrics.clippedContainers).toBe(0)
      expect(metrics.smallTargets).toBe(0)
      if (panel === 'overview') {
        expect(metrics.firstActionBottom).toBeLessThan(height)
        expect(metrics.headingTop).toBeLessThan(160)
      }
      await page.locator(activeCanvas + ' button').last().scrollIntoViewIfNeeded()
      await expect(page.locator(activeCanvas + ' button').last()).toBeInViewport()
      if (panel === 'products' && width >= 1280 && height >= 800) {
        expect(await page.locator(activeCanvas).evaluate(element => element.scrollHeight <= element.clientHeight)).toBe(true)
      }
    }
  })
}

test('mobile same-route, history, and breakpoint cleanup', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/#overview')
  const toggle = page.locator('.mobile-nav__toggle')
  await toggle.click()
  await expect(page.locator('.mobile-drawer nav a')).toHaveText(['Overview', 'Products', 'Principles', 'Contact'])
  await page.locator('.mobile-drawer').getByRole('link', { name: 'Overview', exact: true }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(toggle).toBeFocused()
  await toggle.click()
  await page.locator('.mobile-drawer').getByRole('link', { name: 'Products', exact: true }).click()
  await toggle.click()
  await page.goBack()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('#main-content')).not.toHaveAttribute('inert')
  await page.goForward()
  await expect(page).toHaveURL(/#products$/)
  await toggle.click()
  await page.setViewportSize({ width: 1024, height: 768 })
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('#main-content')).not.toHaveAttribute('inert')
})

test('rapid external hash changes and reduced motion settle cleanly', async ({ page }) => {
  await page.goto('/#overview')
  for (const panel of ['products', 'wealth', 'derma', 'contact']) {
    await page.evaluate(panel => { window.location.hash = panel }, panel)
  }
  await expect(page.locator(activeCanvas + ' > section')).toHaveClass('contact-panel')
  await expect(page.locator('.panel-canvas--outgoing')).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('.sidebar').getByRole('link', { name: 'Products', exact: true }).click()
  await expect(page.locator('.panel-canvas--outgoing')).toHaveCount(0)
  await expect(page.locator('#main-content')).toBeFocused()
  expect(await page.locator(activeCanvas).evaluate(element => getComputedStyle(element).animationName)).toBe('none')
})

test('fonts, assets, headings, and page runtime have no errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('requestfailed', request => errors.push(request.url()))
  for (const panel of existingPanels) {
    await page.goto('/#' + panel)
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.fonts.check('16px Inter') && document.fonts.check('40px "Instrument Serif"'))).toBe(true)
    await expect(page.getByRole('main')).toHaveCount(1)
    await expect(page.locator(activeCanvas).getByRole('heading', { level: 1 })).toHaveCount(1)
  }
  expect(errors).toEqual([])
})

test('actual browser zoom preserves routes and reachable content', async ({}, testInfo) => {
  test.setTimeout(60000)
  const profile = await mkdtemp(join(tmpdir(), 'amanchi-zoom-'))
  const context = await chromium.launchPersistentContext(profile, {
    channel: process.env.PLAYWRIGHT_CHANNEL,
    viewport: null,
    args: ['--window-size=1440,987'],
    reducedMotion: 'reduce',
  })
  try {
    const page = await context.newPage()
    for (const zoom of ['125%', '200%']) {
      await page.goto('chrome://settings/appearance')
      await page.locator('select#zoomLevel').selectOption({ label: zoom })
      for (const panel of existingPanels) {
        await page.goto(String(testInfo.project.use.baseURL) + '/#' + panel)
        await page.evaluate(() => document.fonts.ready)
        expect(await page.evaluate(() => devicePixelRatio)).toBe(Number.parseInt(zoom) / 100)
        const canvas = page.locator(activeCanvas)
        expect(await canvas.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
        await expect(canvas.getByRole('heading', { level: 1 })).toBeVisible()
        const finalControl = canvas.locator('button, a').last()
        if (await finalControl.count()) {
          await finalControl.scrollIntoViewIfNeeded()
          await expect(finalControl).toBeInViewport()
        }
      }
    }
  } finally {
    await context.close()
    await rm(profile, { recursive: true, force: true })
  }
})