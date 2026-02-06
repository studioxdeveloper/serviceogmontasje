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
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Top header - only on main pages */}
      {!isDetailPage && (
        <header className="bg-brand-dark px-4 py-3 flex items-center justify-between sticky top-0 z-20">
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
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href === '/tekniker' && pathname.startsWith('/tekniker/oppdrag'))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all',
                  isActive 
                    ? 'text-brand' 
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'text-brand')} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
