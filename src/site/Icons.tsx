import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>
export function ArrowIcon(props: IconProps) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
export function ExternalIcon(props: IconProps) {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}><path d="M6 3H3.75A.75.75 0 0 0 3 3.75v8.5c0 .41.34.75.75.75h8.5a.75.75 0 0 0 .75-.75V10M8 3h5v5m-.25-4.75L7 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
