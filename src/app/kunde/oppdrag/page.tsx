'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Wrench, 
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Calendar,
  Search,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Mock orders for this customer
const customerOrders = [
  { 
    id: 'K1', 
    orderNumber: 'SM-2026-0234',
    description: 'Service sykeseng - Rom 204', 
    equipment: 'Invacare Medley Ergo',
    status: 'paabegynt', 
    date: '2026-02-03', 
    location: 'Jessheim Sykehjem',
    technician: 'Ole Hansen'
  },
  { 
    id: 'K2', 
    orderNumber: 'SM-2026-0235',
    description: 'Reparasjon takheis - Avd. B', 
    equipment: 'Guldmann GH3',
    status: 'planlagt', 
    date: '2026-02-05', 
    location: 'Omsorgssenter Nord',
    technician: 'Kari Nordmann'
  },
  { 
    id: 'K3', 
    orderNumber: 'SM-2026-0240',
    description: 'Periodisk kontroll - Sykesenger', 
    equipment: 'Diverse',
    status: 'planlagt', 
    date: '2026-02-10', 
    location: 'Jessheim Sykehjem',
    technician: null
  },
  { 
    id: 'K4', 
    orderNumber: 'SM-2026-0198',
    description: 'Årlig service personløfter', 
    equipment: 'Molift Smart 150',
    status: 'utfort', 
    date: '2026-01-25', 
    location: 'Omsorgssenter Sør',
    technician: 'Erik Berg'
  },
  { 
    id: 'K5', 
    orderNumber: 'SM-2026-0156',
    description: 'Montering ny takheis', 
    equipment: 'Likorall 242S',
    status: 'utfort', 
    date: '2026-01-15', 
    location: 'Jessheim Sykehjem',
    technician: 'Ole Hansen'
  },
]

const statusLabels: Record<string, string> = {
  planlagt: 'Planlagt',
  paabegynt: 'Påbegynt',
  utfort: 'Utført',
}

export default function CustomerOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = customerOrders.filter(order => {
    const matchesSearch = order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && order.status !== 'utfort') ||
      (filter === 'completed' && order.status === 'utfort')
    
    return matchesSearch && matchesFilter
  })

  const activeCount = customerOrders.filter(o => o.status !== 'utfort').length
  const completedCount = customerOrders.filter(o => o.status === 'utfort').length

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/kunde" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Tilbake</span>
          </Link>
          <h1 className="text-white text-xl font-heading font-semibold">Mine oppdrag</h1>
          <p className="text-brand-light text-sm mt-1">{customerOrders.length} oppdrag totalt</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-xl font-semibold text-brand-dark">{activeCount}</p>
                <p className="text-xs text-gray-500">Aktive oppdrag</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-xl font-semibold text-brand-dark">{completedCount}</p>
                <p className="text-xs text-gray-500">Fullført</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action */}
        <Link href="/kunde/bestill">
          <Button className="w-full mb-6">
            <Plus className="w-4 h-4 mr-2" />
            Bestill nytt oppdrag
          </Button>
        </Link>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Søk etter oppdrag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border-0 text-sm focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filter === f
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {f === 'all' ? 'Alle' : f === 'active' ? 'Aktive' : 'Fullførte'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Orders list */}
        <div className="space-y-8">
          {filteredOrders.map((order) => (
            <Link key={order.id} href={`/kunde/oppdrag/${order.id}`}>
              <Card hover className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      order.status === 'utfort' ? 'bg-success-100' : 'bg-brand-light/30'
                    )}>
                      {order.status === 'utfort' ? (
                        <CheckCircle className="w-5 h-5 text-success-600" />
                      ) : (
                        <Wrench className="w-5 h-5 text-brand" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark">{order.description}</p>
                      <p className="text-xs text-gray-500 font-mono">{order.orderNumber}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(order.date).toLocaleDateString('nb-NO', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                    <span>{order.location}</span>
                  </div>
                  <span className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    order.status === 'planlagt' && 'bg-gray-100 text-gray-600',
                    order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                    order.status === 'utfort' && 'bg-success-100 text-success-600',
                  )}>
                    {statusLabels[order.status]}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="p-12 text-center">
            <Wrench className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Ingen oppdrag funnet</p>
          </Card>
        )}
      </main>
    </div>
  )
}
