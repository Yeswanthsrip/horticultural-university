import {
  Award,
  BookOpen,
  Building2,
  FlaskConical,
  GraduationCap,
  Leaf,
  Microscope,
  Phone,
  Sprout,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '@/data/site'

const ICONS: Record<IconName, LucideIcon> = {
  graduation: GraduationCap,
  book: BookOpen,
  flask: FlaskConical,
  building: Building2,
  award: Award,
  phone: Phone,
  sprout: Sprout,
  users: Users,
  microscope: Microscope,
  leaf: Leaf,
}

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Cmp = ICONS[name]
  return <Cmp aria-hidden="true" className={className} strokeWidth={strokeWidth} />
}

/* Brand marks (not included in the icon library). */
export function SocialIcon({ network, className = 'size-5' }: { network: 'facebook' | 'x' | 'youtube' | 'instagram'; className?: string }) {
  const common = { className, 'aria-hidden': true, fill: 'currentColor', viewBox: '0 0 24 24' } as const
  switch (network) {
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.4V21h3.1Z" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.2L5.6 21h-3l7.1-8.1L2.2 3h6.2l4.3 5.7L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}
