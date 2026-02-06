'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Package, 
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Mock equipment categories
const equipmentCategories = [
  { id: '1', type: 'Sykesenger', count: 45, lastInspection: '2025-11-15', status: 'ok', locations: 3 },
  { id: '2', type: 'Takheiser', count: 28, lastInspection: '2025-10-20', status: 'ok', locations: 2 },
  { id: '3', type: 'Personløftere', count: 35, lastInspection: '2025-09-01', status: 'due', locations: 4 },
  { id: '4', type: 'Dusjstoler', count: 48, lastInspection: '2025-12-01', status: 'ok', locations: 5 },
  { id: '5', type: 'Trappeheiser', count: 12, lastInspection: '2025-08-15', status: 'due', locations: 2 },
  { id: '6', type: 'Elektriske rullestoler', count: 8, lastInspection: '2025-11-01', status: 'ok', locations: 1 },
]

export default function EquipmentListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'ok' | 'due'>('all')

  const filteredEquipment = equipmentCategories.filter(item => {
    const matchesSearch = item.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalEquipment = equipmentCategories.reduce((sum, item) => sum + item.count, 0)
  const dueCount = equipmentCategories.filter(item => item.status === 'due').length

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/kunde" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Tilbake</span>
          </Link>
          <h1 className="text-white text-xl font-heading font-semibold">Utstyrsoversikt</h1>
          <p className="text-brand-light text-sm mt-1">{totalEquipment} enheter totalt</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-xl font-semibold text-brand-dark">
                  {equipmentCategories.filter(e => e.status === 'ok').length}
                </p>
                <p className="text-xs text-gray-500">Kontrollert</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning-500" />
              </div>
              <div>
                <p className="text-xl font-semibold text-brand-dark">{dueCount}</p>
                <p className="text-xs text-gray-500">Trenger kontroll</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Søk etter utstyr..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border-0 text-sm focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'ok', 'due'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filterStatus === status
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {status === 'all' ? 'Alle' : status === 'ok' ? 'OK' : 'Forfalt'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Equipment list */}
        <div className="space-y-3">
          {filteredEquipment.map((item) => (
            <Link key={item.id} href={`/kunde/utstyr/${item.id}`}>
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-light/30 flex items-center justify-center">
                      <Package className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.count} enheter • {item.locations} lokasjoner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
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
                        Sist: {new Date(item.lastInspection).toLocaleDateString('nb-NO')}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Ingen utstyr funnet</p>
          </Card>
        )}
      </main>
    </div>
  )
}
