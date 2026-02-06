'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Package, 
  Wrench, 
  FileText, 
  Phone, 
  Mail,
  ChevronRight,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

// Mock customer data
const customerData = {
  name: 'Ullensaker Kommune',
  type: 'Kommune',
  locations: 5,
  equipment: 156,
  activeOrders: 3,
}

const equipment = [
  { id: '1', type: 'Sykesenger', count: 45, lastInspection: '2025-11-15', status: 'ok' },
  { id: '2', type: 'Takheiser', count: 28, lastInspection: '2025-10-20', status: 'ok' },
  { id: '3', type: 'Personløftere', count: 35, lastInspection: '2025-09-01', status: 'due' },
  { id: '4', type: 'Dusjstoler', count: 48, lastInspection: '2025-12-01', status: 'ok' },
]

const activeOrders = [
  { id: 'K1', description: 'Service sykeseng - Rom 204', status: 'paabegynt', date: '2026-02-03', location: 'Jessheim Sykehjem' },
  { id: 'K2', description: 'Reparasjon takheis - Avd. B', status: 'planlagt', date: '2026-02-05', location: 'Omsorgssenter Nord' },
  { id: 'K3', description: 'Periodisk kontroll - Sykesenger', status: 'planlagt', date: '2026-02-10', location: 'Jessheim Sykehjem' },
]

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-white text-xl font-bold">&amp;</span>
            </div>
            <div>
              <p className="text-brand-light text-sm">Kundeportal</p>
              <h1 className="text-white text-xl font-heading font-semibold">{customerData.name}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-4 pb-12">
        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Link href="/kunde/bestill">
            <Card hover className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-light/30 flex items-center justify-center mx-auto mb-2">
                <Plus className="w-6 h-6 text-brand" />
              </div>
              <p className="text-sm font-medium text-brand-dark">Bestill service</p>
            </Card>
          </Link>
          <Link href="/kunde/meld-feil">
            <Card hover className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-warning-100 flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-6 h-6 text-warning-500" />
              </div>
              <p className="text-sm font-medium text-brand-dark">Meld feil</p>
            </Card>
          </Link>
          <Link href="/kunde/oppdrag">
            <Card hover className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-brand-dark">Rapporter</p>
            </Card>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/kunde/utstyr">
            <Card hover className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-light/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-brand-dark">{customerData.equipment}</p>
                  <p className="text-sm text-gray-500">Utstyrsenheter</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/kunde/oppdrag">
            <Card hover className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-warning-100 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-warning-500" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-brand-dark">{customerData.activeOrders}</p>
                  <p className="text-sm text-gray-500">Aktive oppdrag</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Equipment overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-brand-dark">Utstyrsoversikt</h2>
            <Link href="/kunde/utstyr">
              <Button variant="ghost" size="sm">
                Se alle <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-8">
            {equipment.map((item) => (
              <Link 
                key={item.id}
                href={`/kunde/utstyr/${item.id}`}
              >
                <div className="flex items-center justify-between p-4 bg-brand-bg/50 rounded-xl hover:bg-brand-light/20 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <Package className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.count} enheter</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      {item.status === 'ok' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-success-600">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Kontrollert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-warning-600">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Kontroll forfalt
                        </span>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(item.lastInspection).toLocaleDateString('nb-NO')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Active orders */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-brand-dark">Pågående oppdrag</h2>
            <Link href="/kunde/oppdrag">
              <span className="text-sm text-brand font-medium hover:underline">{activeOrders.length} oppdrag</span>
            </Link>
          </div>
          
          <div className="space-y-8">
            {activeOrders.map((order) => (
              <Link 
                key={order.id}
                href={`/kunde/oppdrag/${order.id}`}
              >
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-brand-bg transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-light/30 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark text-sm">{order.description}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.date).toLocaleDateString('nb-NO', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`
                      px-2.5 py-1 rounded-full text-xs font-medium
                      ${order.status === 'paabegynt' ? 'bg-brand-light/30 text-brand-dark' : 'bg-gray-100 text-gray-600'}
                    `}>
                      {order.status === 'paabegynt' ? 'Påbegynt' : 'Planlagt'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6">
          <h2 className="font-heading font-semibold text-brand-dark mb-4">Kontakt Service og Montasje</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:62120012"
              className="flex items-center gap-3 p-4 bg-brand-bg rounded-xl hover:bg-brand-light/30 transition-colors flex-1"
            >
              <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-brand-dark">62 12 00 12</p>
                <p className="text-xs text-gray-500">Sentralbord</p>
              </div>
            </a>
            <a 
              href="mailto:firmapost@serviceogmontasje.no"
              className="flex items-center gap-3 p-4 bg-brand-bg rounded-xl hover:bg-brand-light/30 transition-colors flex-1"
            >
              <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-brand-dark text-sm">E-post</p>
                <p className="text-xs text-gray-500 truncate">firmapost@serviceogmontasje.no</p>
              </div>
            </a>
          </div>
        </Card>
      </main>
    </div>
  )
}
