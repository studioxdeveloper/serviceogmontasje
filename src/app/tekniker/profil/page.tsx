'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { technicians, partners } from '@/data/mockData'
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'

const currentTechnician = technicians[0]
const currentPartner = partners.find(p => p.id === currentTechnician.partnerId)

export default function TechnicianProfilePage() {
  const menuItems = [
    { icon: Bell, label: 'Varsler', href: '#', badge: '3' },
    { icon: Moon, label: 'Mørk modus', href: '#', toggle: true },
    { icon: Smartphone, label: 'Offline-innstillinger', href: '#' },
    { icon: Shield, label: 'Personvern', href: '#' },
    { icon: HelpCircle, label: 'Hjelp og støtte', href: '#' },
  ]

  return (
    <div className="px-4 py-6">
      {/* Profile header */}
      <div className="text-center mb-6">
        <Avatar name={currentTechnician.name} size="lg" className="w-20 h-20 mx-auto mb-4 text-xl" />
        <h1 className="text-xl font-bold text-gray-900">{currentTechnician.name}</h1>
        <p className="text-sm text-gray-500">Tekniker</p>
      </div>

      {/* Contact info */}
      <Card className="mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Kontaktinformasjon</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">E-post</p>
              <p className="font-medium text-gray-900">{currentTechnician.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Telefon</p>
              <p className="font-medium text-gray-900">{currentTechnician.phone}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Organization */}
      <Card className="mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Organisasjon</h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{currentPartner?.name}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {currentPartner?.location}
            </p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <Card className="mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Statistikk denne måneden</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500">Fullført</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">2.1</p>
            <p className="text-xs text-gray-500">Snitt (dager)</p>
          </div>
        </div>
      </Card>

      {/* Menu items */}
      <Card className="mb-4 p-0">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <item.icon className="w-5 h-5 text-gray-600" />
            </div>
            <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                {item.badge}
              </span>
            )}
            {item.toggle ? (
              <div className="w-12 h-7 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
        ))}
      </Card>

      {/* Logout */}
      <Link href="/">
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-2" />
          Logg ut
        </Button>
      </Link>

      {/* Version */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Service og Montasje v0.1.0 (Prototype)
      </p>
    </div>
  )
}
