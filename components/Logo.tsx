/**
 * PLACEHOLDER university emblem — replace with the official logo
 * (e.g. swap this component for <Image src="/img/logo.png" … />).
 */
export function Logo({ className = 'size-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="University emblem (placeholder)">
      <circle cx="32" cy="32" r="31" fill="#0e3322" />
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="#c99a35" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24.5" fill="none" stroke="#c99a35" strokeWidth="0.6" strokeDasharray="1.4 2.2" />
      {/* central leaf */}
      <path d="M32 14c8 7 9.5 17 0 30-9.5-13-8-23 0-30Z" fill="#4fa845" />
      <path d="M32 18v24" stroke="#0e3322" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 26l-4-3M32 31l-5-3.5M32 26l4-3M32 31l5-3.5M32 36l-4-2.5M32 36l4-2.5" stroke="#0e3322" strokeWidth="0.9" strokeLinecap="round" />
      {/* side leaves */}
      <path d="M30 44c-9 1-14-4-15-11 7 0 12 4 15 11Z" fill="#3a8f36" />
      <path d="M34 44c9 1 14-4 15-11-7 0-12 4-15 11Z" fill="#3a8f36" />
      {/* sun / fruit */}
      <circle cx="32" cy="49.5" r="3.2" fill="#dcb458" />
    </svg>
  )
}
