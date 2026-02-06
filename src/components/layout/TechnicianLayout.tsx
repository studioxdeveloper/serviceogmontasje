'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  ClipboardList,
  MapPin,
  Calendar,
  User
} from 'lucide-react'

const navigation = [
  { name: 'Oppdrag', href: '/tekniker', icon: ClipboardList },
  { name: 'Kart', href: '/tekniker/kart', icon: MapPin },
  { name: 'Kalender', href: '/tekniker/kalender', icon: Calendar },
  { name: 'Profil', href: '/tekniker/profil', icon: User },
]

export function TechnicianLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we're in a detail page
  const isDetailPage = pathname.includes('/oppdrag/') && pathname !== '/tekniker/oppdrag'

  return (
    <div className="min-h-screen bg-brand-bg flex justify-center">
      {/* Max-width container for iPad/iPhone */}
      <div className="w-full max-w-[900px] flex flex-col min-h-screen relative bg-brand-bg shadow-xl">
        {/* Top header - iOS glass style */}
        {!isDetailPage && (
          <header className="sticky top-0 z-20 px-4 py-3 flex items-center justify-between bg-brand-dark/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">&amp;</span>
              </div>
              <span className="text-white font-heading font-medium">Service og Montasje</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
              <span className="text-white text-xs font-medium">OH</span>
            </div>
          </header>
        )}

        {/* Main content */}
        <main className="flex-1 pb-24">
          {children}
        </main>

        {/* Bottom navigation - Floating pill style */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 w-full max-w-[900px]">
          <nav className="mx-auto max-w-sm bg-brand-dark/95 backdrop-blur-xl rounded-full shadow-2xl px-2 py-2">
            <div className="flex items-center justify-around">
              {navigation.map((item) => {
                // Oppdrag is active on /tekniker and /tekniker/oppdrag/*
                // Other items are active when pathname starts with their href
                const isActive = item.href === '/tekniker'
                  ? pathname === '/tekniker' || pathname.startsWith('/tekniker/oppdrag')
                  : pathname.startsWith(item.href)
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex flex-col items-center gap-1 py-2 px-5 rounded-full transition-all',
                      isActive 
                        ? 'bg-brand text-white' 
                        : 'text-white/60 hover:text-white'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
