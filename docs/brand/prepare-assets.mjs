import { copyFile, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const { default: sharp } = await import(pathToFileURL(process.env.SHARP_MODULE).href)
const sourceDirectory = resolve(process.argv[2])
const originalDirectory = resolve('docs/brand/originals')
const outputDirectory = resolve('public/brand')
await mkdir(originalDirectory, { recursive: true })
await mkdir(outputDirectory, { recursive: true })
const usages = {
  Amanchi_Labs_Logo: 'Complete horizontal master; opaque off-white, fine tagline. Preserve; not readable as-is at sidebar size.',
  Amanchi_Labs_Stacked_Vertical_Logo: 'Transparent stacked artwork; isolate symbol for compact derivatives. Full stacked version for presentations.',
  Amanchi_Labs_Wordmark_Name_Only: 'Transparent dark serif wordmark; trim empty canvas and use in compact lockup.',
  Amanchi_Labs_Footer_Logo: 'Opaque off-white footer artwork with copyright and dark type. Reference only; use high-contrast compact derivative on charcoal.',
  Amanchi_Labs_Favicon: 'Opaque presentation sheet with size labels; never publish whole sheet as a favicon.',
  Amanchi_Labs_Favicon_16px: 'Opaque symbol on large near-white canvas; reference for small-size visual checks, not a true 16px export.',
  Amanchi_Labs_Apple_Touch_Icon: 'Opaque rounded-square illustration and shadow; reference only. Production tile derives from isolated approved symbol.',
  'Amanchi_Labs_PWA_Icon_192_×_192': 'Opaque tile with name/tagline; too detailed at small sizes. Retain for reference; use symbol-only derivative.',
  'Amanchi_Labs_PWA_Icon_512_×_512': 'Opaque tile with name/tagline and decorative lighting. Retain for reference; use symbol-only derivative.',
  Amanchi_Labs_Social_Sharing_Image: 'Scenic branded social artwork; resize to 1200x630. Not used as website hero imagery.',
  Amanchi_Labs_Square_Social_Profile_Avatar: 'Opaque stacked logo on light background; future social profile artwork, not live website UI.',
  Amanchi_Labs_Email_Signature_Logo: 'Transparent horizontal full lockup with fine tagline; future email signature reference.',
  Amanchi_Labs_Native_App_Icon_ArtWork: 'Opaque rounded-square native artwork and shadows; future reference, not a change to individual app icons.',
}
const inventory = []
for (const [name, usage] of Object.entries(usages)) {
  const filename = name + '.png'
  const source = join(sourceDirectory, filename)
  const bytes = await readFile(source)
  const destination = join(originalDirectory, filename)
  try {
    if (!(await readFile(destination)).equals(bytes)) throw new Error('Existing original differs: ' + filename)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    await copyFile(source, destination)
  }
  const metadata = await sharp(bytes).metadata()
  const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let transparent = 0
  let partial = 0
  for (let offset = 3; offset < data.length; offset += 4) {
    if (data[offset] === 0) transparent++
    else if (data[offset] < 255) partial++
  }
  inventory.push({ filename, width: metadata.width, height: metadata.height, format: metadata.format, bytes: bytes.length, hasAlpha: metadata.hasAlpha, transparentPixels: transparent, partialAlphaPixels: partial, cornerRGBA: Array.from(data.subarray(0, 4)), sha256: createHash('sha256').update(bytes).digest('hex'), usage })
  if (info.channels !== 4 || !(await readFile(destination)).equals(bytes)) throw new Error('Original validation failed')
}
if (inventory.length !== 13) throw new Error('Expected 13 originals')
const symbolCrop = await sharp(join(originalDirectory, 'Amanchi_Labs_Stacked_Vertical_Logo.png'))
  .extract({ left: 160, top: 225, width: 930, height: 620 })
  .png().toBuffer()
const symbol = await sharp(symbolCrop).trim({ background: '#00000000', threshold: 16 }).png().toBuffer()
const wordmark = await sharp(join(originalDirectory, 'Amanchi_Labs_Wordmark_Name_Only.png'))
  .trim({ background: '#00000000', threshold: 16 }).png().toBuffer()
const symbolSized = await sharp(symbol).resize({ width: 104, height: 80, fit: 'inside' }).png().toBuffer()
const wordmarkSized = await sharp(wordmark).resize({ width: 512, height: 64, fit: 'inside' }).png().toBuffer()
const symbolMeta = await sharp(symbolSized).metadata()
const wordmarkMeta = await sharp(wordmarkSized).metadata()
const header = await sharp({ create: { width: 640, height: 100, channels: 4, background: '#00000000' } })
  .composite([
    { input: symbolSized, left: 4, top: Math.floor((100 - symbolMeta.height) / 2) },
    { input: wordmarkSized, left: 120, top: Math.floor((100 - wordmarkMeta.height) / 2) },
  ]).png({ compressionLevel: 9 }).toBuffer()
await writeFile(join(outputDirectory, 'logo-header.png'), header)
const footer = await sharp(header).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
for (let offset = 0; offset < footer.data.length; offset += 4) {
  footer.data[offset] = 240
  footer.data[offset + 1] = 240
  footer.data[offset + 2] = 236
}
await sharp(footer.data, { raw: footer.info }).png({ compressionLevel: 9 }).toFile(join(outputDirectory, 'logo-footer.png'))
await sharp(symbol).resize({ width: 512 }).png({ compressionLevel: 9 }).toFile(join(outputDirectory, 'brandmark.png'))
const sizes = { 'favicon-16x16.png': 16, 'favicon-32x32.png': 32, 'apple-touch-icon.png': 180, 'pwa-192x192.png': 192, 'pwa-512x512.png': 512 }
for (const [filename, size] of Object.entries(sizes)) {
  const artwork = await sharp(symbol).resize({ width: Math.round(size * (size <= 32 ? 0.9 : 0.72)), height: Math.round(size * 0.72), fit: 'inside' }).png().toBuffer()
  const metadata = await sharp(artwork).metadata()
  await sharp({ create: { width: size, height: size, channels: 4, background: '#FAFAF8' } })
    .composite([{ input: artwork, left: Math.floor((size - metadata.width) / 2), top: Math.floor((size - metadata.height) / 2) }])
    .flatten({ background: '#FAFAF8' }).png({ compressionLevel: 9 }).toFile(join(outputDirectory, filename))
}
const iconImages = await Promise.all([16, 32].map(size => readFile(join(outputDirectory, `favicon-${size}x${size}.png`))))
const iconHeader = Buffer.alloc(6 + iconImages.length * 16)
iconHeader.writeUInt16LE(1, 2)
iconHeader.writeUInt16LE(iconImages.length, 4)
let imageOffset = iconHeader.length
for (const [index, size] of [16, 32].entries()) {
  const entryOffset = 6 + index * 16
  iconHeader[entryOffset] = iconHeader[entryOffset + 1] = size
  iconHeader.writeUInt16LE(1, entryOffset + 4)
  iconHeader.writeUInt16LE(32, entryOffset + 6)
  iconHeader.writeUInt32LE(iconImages[index].length, entryOffset + 8)
  iconHeader.writeUInt32LE(imageOffset, entryOffset + 12)
  imageOffset += iconImages[index].length
}
await writeFile(join(outputDirectory, 'favicon.ico'), Buffer.concat([iconHeader, ...iconImages]))
await sharp(join(originalDirectory, 'Amanchi_Labs_Social_Sharing_Image.png')).resize(1200, 630, { fit: 'cover', position: 'centre' }).png({ palette: true, quality: 95, compressionLevel: 9 }).toFile(join(outputDirectory, 'og-image.png'))
const derivatives = []
for (const filename of await readdir(outputDirectory)) {
  const path = join(outputDirectory, filename)
  if (!filename.endsWith('.png')) { derivatives.push({ filename, bytes: (await stat(path)).size, format: 'ico', dimensions: '16x16 and 32x32 PNG entries' }); continue }
  const metadata = await sharp(path).metadata()
  const expected = sizes[filename] ? [sizes[filename], sizes[filename]] : filename === 'og-image.png' ? [1200, 630] : filename.startsWith('logo-') ? [640, 100] : [512, metadata.height]
  if (metadata.width !== expected[0] || metadata.height !== expected[1]) throw new Error('Unexpected derivative dimensions: ' + filename)
  derivatives.push({ filename, width: metadata.width, height: metadata.height, hasAlpha: metadata.hasAlpha, bytes: (await stat(path)).size, format: metadata.format })
}
await writeFile('docs/brand/asset-inventory.json', JSON.stringify({ originals: inventory, derivatives }, null, 2) + '\n')
const rows = inventory.map(asset => `| ${asset.filename} | ${asset.width}x${asset.height} | ${asset.bytes} | ${asset.hasAlpha ? `Yes; ${asset.transparentPixels} clear, ${asset.partialAlphaPixels} partial pixels` : 'No; opaque'} | ${asset.cornerRGBA.join(', ')} | ${asset.usage} |`).join('\n')
const outputs = derivatives.map(asset => `| ${asset.filename} | ${asset.width ? `${asset.width}x${asset.height}` : asset.dimensions} | ${asset.bytes} |`).join('\n')
await writeFile('docs/brand/BRAND_ASSETS.md', `# Brand Asset Inventory\n\nAll 13 originals are byte-preserved; SHA-256 hashes and full alpha counts are in asset-inventory.json. RGB beneath transparent pixels is not a visible black background. Corner samples characterize the background, not the entire image. Original dimensions must never be inferred from filenames.\n\n| Original | Dimensions | Bytes | Alpha | Corner RGBA | Intended use / suitability |\n| --- | --- | --- | --- | --- | --- |\n${rows}\n\n## Production Derivatives\n\n| File in public/brand | Dimensions | Bytes |\n| --- | --- | --- |\n${outputs}\n\nCompact header: isolate the stacked A (crop x160 y225, 930x620), trim transparency and combine with trimmed wordmark in a 640x100 transparent canvas. Tagline deliberately omitted at compact size; master retained unchanged. Footer: same lockup recolored off-white RGB 240,240,236 with original alpha, excluding embedded copyright. Symbol colors/proportions remain unchanged in header/icons. Icons remove text, tile artwork, shadows and size labels by using the isolated symbol; Apple/PWA have an intentional opaque off-white square. PWA derivatives are future-use exports only, not a manifest or installability claim; no maskable designation. Social artwork is center-cropped minimally to 1200x630, quantized at high quality, not stretched or used as a website hero. No new vector master/SVG is claimed. Legacy public/favicon.svg and public/og-image.svg are retained unchanged but no longer referenced.\n\nReproduce from repo root using Node and Sharp (image tooling only): SHARP_MODULE=/absolute/path/to/sharp/dist/index.mjs node docs/brand/prepare-assets.mjs /path/to/original-directory. Sharp is not a site dependency.\n`)
console.log(JSON.stringify({ originals: inventory.length, derivatives, preserved: true }, null, 2))