'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Building2,
  Users,
  Receipt,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Send,
  Megaphone
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Oversikt', href: '/admin', icon: LayoutDashboard },
  { name: 'Oppdrag', href: '/admin/ordrer', icon: ClipboardList },
  { name: 'Kalender', href: '/admin/kalender', icon: Calendar },
  { name: 'Kunder', href: '/admin/kunder', icon: Users },
  { name: 'Teknikere', href: '/admin/teknikere', icon: Users },
  { name: 'Fakturering', href: '/admin/fakturering', icon: Receipt },
  { name: 'Nettverksvarsler', href: '/admin/varsler', icon: Megaphone },
  { name: 'Partnere', href: '/admin/partnere', icon: Building2 },
  { name: 'Innstillinger', href: '/admin/innstillinger', icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 bg-brand-dark z-50 transform transition-transform duration-200',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold">&amp;</span>
            </div>
            <span className="text-white font-heading font-semibold">S&M Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive 
                    ? 'bg-brand text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
              <span className="text-white font-medium">TH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Therese Stenvåg</p>
              <p className="text-white/50 text-xs">Administrator</p>
            </div>
          </div>
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logg ut
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 w-80">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Søk etter oppdrag, kunde..."
                  className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-warning-400 rounded-full" />
              </button>

              {/* User avatar (mobile) */}
              <div className="lg:hidden w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                <span className="text-white text-sm font-medium">TH</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
