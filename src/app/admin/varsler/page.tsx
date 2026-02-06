'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { partners } from '@/data/mockData'
import { 
  Megaphone,
  Send,
  Bell,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Calendar,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock sent notifications
const sentNotifications = [
  {
    id: '1',
    title: 'Ny avtale med Mediq AS',
    message: 'Oppdaterte priser fra 1. mars 2026. Se vedlagt prisliste.',
    sentAt: '2026-02-03T10:30:00',
    recipients: 'all',
    type: 'info',
  },
  {
    id: '2',
    title: 'Prisjustering NAV',
    message: 'KPI-justering trer i kraft 15. mars. Alle partnere må oppdatere sine priser.',
    sentAt: '2026-02-01T14:00:00',
    recipients: 'all',
    type: 'warning',
  },
  {
    id: '3',
    title: 'Påske 2026',
    message: 'Husk å planlegge fravær og vaktordninger for påsken.',
    sentAt: '2026-01-28T09:00:00',
    recipients: 'all',
    type: 'info',
  },
]

export default function AdminNotificationsPage() {
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [selectedRecipients, setSelectedRecipients] = useState<string>('all')

  const externalPartners = partners.filter(p => p.id !== '1')

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Nettverksvarsler</h1>
          <p className="text-gray-500 text-sm mt-1">Send kunngjøringer til alle partnere i nettverket</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* New notification form */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Megaphone className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Ny kunngjøring</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tittel
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="F.eks. 'Prisjustering fra 1. april'"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Melding
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Skriv meldingen som skal sendes til partnerne..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mottakere
              </label>
              <select
                value={selectedRecipients}
                onChange={(e) => setSelectedRecipients(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                <option value="all">Alle partnere ({externalPartners.length} firmaer)</option>
                {externalPartners.map(partner => (
                  <option key={partner.id} value={partner.id}>
                    Kun {partner.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button disabled={!newTitle || !newMessage}>
                <Send className="w-4 h-4 mr-2" />
                Send kunngjøring
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Planlegg sending
              </Button>
            </div>
          </div>
        </Card>

        {/* Recipients overview */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Mottakere</h2>
          </div>

          <div className="space-y-8">
            {externalPartners.map((partner) => (
              <div 
                key={partner.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-dark text-sm truncate">{partner.name}</p>
                  <p className="text-xs text-gray-500">{partner.region}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-success-500" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-brand-dark">{externalPartners.length}</span> partnere vil motta varselet
            </p>
          </div>
        </Card>
      </div>

      {/* Sent notifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Sendte kunngjøringer</h2>
          </div>
        </div>

        <div className="space-y-8">
          {sentNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={cn(
                'p-4 rounded-xl border',
                notification.type === 'warning' ? 'bg-warning-50 border-warning-100' : 'bg-gray-50 border-gray-100'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  notification.type === 'warning' ? 'bg-warning-100' : 'bg-brand-light/30'
                )}>
                  {notification.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-warning-500" />
                  ) : (
                    <Bell className="w-5 h-5 text-brand" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-brand-dark">{notification.title}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(notification.sentAt).toLocaleDateString('nb-NO', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Sendt til alle partnere
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
