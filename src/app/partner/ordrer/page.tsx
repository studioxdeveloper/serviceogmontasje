'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  getOrdersForPartner, 
  getSMOrdersForPartner, 
  getInternalOrdersForPartner,
  statusLabels, 
  orderTypeLabels,
  isOverdue,
  OrderStatus
} from '@/data/mockData'
import { 
  Search, 
  Filter, 
  Plus,
  ChevronRight,
  Download,
  AlertTriangle,
  X,
  Send,
  Lock,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const PARTNER_ID = '2'

const statusFilters: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'uaapnet', label: 'Uåpnet' },
  { value: 'paabegynt', label: 'Påbegynt' },
  { value: 'deler', label: 'Venter deler' },
  { value: 'utfort', label: 'Utført' },
  { value: 'fakturert', label: 'Fakturert' },
]

export default function PartnerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')

  const allOrders = getOrdersForPartner(PARTNER_ID)
  const ordersFromSM = getSMOrdersForPartner(PARTNER_ID)
  const internalOrders = getInternalOrdersForPartner(PARTNER_ID)
  
  // Apply filters
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.equipmentType.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSource = sourceFilter === 'all' || 
      (sourceFilter === 'sm' && order.isFromSM && !order.isInternal) ||
      (sourceFilter === 'internal' && order.isInternal)

    return matchesSearch && matchesStatus && matchesSource
  })

  // Sort by created date (newest first)
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Oppdrag</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredOrders.length} av {allOrders.length} oppdrag</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/partner/kalender">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Kalender
            </Button>
          </Link>
          <Link href="/partner/ordrer/ny">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nytt oppdrag
            </Button>
          </Link>
        </div>
      </div>

      {/* Source filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSourceFilter('all')}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2',
            sourceFilter === 'all'
              ? 'bg-brand text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-light'
          )}
        >
          Alle oppdrag
          <span className={cn(
            'px-1.5 py-0.5 rounded-full text-xs',
            sourceFilter === 'all' ? 'bg-white/20' : 'bg-gray-100'
          )}>
            {allOrders.length}
          </span>
        </button>
        <button
          onClick={() => setSourceFilter('sm')}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2',
            sourceFilter === 'sm'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
          )}
        >
          <Send className="w-4 h-4" />
          Fra S&M
          <span className={cn(
            'px-1.5 py-0.5 rounded-full text-xs',
            sourceFilter === 'sm' ? 'bg-white/20' : 'bg-blue-100 text-blue-700'
          )}>
            {ordersFromSM.length}
          </span>
        </button>
        <button
          onClick={() => setSourceFilter('internal')}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2',
            sourceFilter === 'internal'
              ? 'bg-gray-700 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
          )}
        >
          <Lock className="w-4 h-4" />
          Egne ordrer
          <span className={cn(
            'px-1.5 py-0.5 rounded-full text-xs',
            sourceFilter === 'internal' ? 'bg-white/20' : 'bg-gray-100'
          )}>
            {internalOrders.length}
          </span>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Søk etter kunde, referanse, utstyr..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 rounded-xl border-0 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
              className="px-4 py-2.5 bg-gray-50 rounded-xl border-0 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {statusFilters.map(filter => (
                <option key={filter.value} value={filter.value}>{filter.label}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              statusFilter === filter.value
                ? 'bg-brand text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-light'
            )}
          >
            {filter.label}
            {filter.value !== 'all' && (
              <span className={cn(
                'ml-2 px-1.5 py-0.5 rounded-full text-xs',
                statusFilter === filter.value ? 'bg-white/20' : 'bg-gray-100'
              )}>
                {allOrders.filter(o => o.status === filter.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kilde</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kunde</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Referanse</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tekniker</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Frist</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedOrders.map((order) => {
                const overdue = isOverdue(order)
                return (
                  <tr 
                    key={order.id} 
                    className={cn(
                      'hover:bg-brand-bg/50 transition-colors',
                      overdue && 'bg-danger-50/50'
                    )}
                  >
                    <td className="px-6 py-4">
                      {order.isFromSM && !order.isInternal ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          <Send className="w-3 h-3" />
                          S&M
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          <Lock className="w-3 h-3" />
                          Egen
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-brand-dark text-sm">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.equipmentType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 font-mono">{order.orderNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{orderTypeLabels[order.orderType]}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'inline-flex px-2.5 py-1 rounded-full text-xs font-medium',
                        order.status === 'uaapnet' && 'bg-gray-100 text-gray-700',
                        order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                        order.status === 'deler' && 'bg-warning-100 text-warning-600',
                        order.status === 'utfort' && 'bg-success-100 text-success-600',
                        order.status === 'fakturert' && 'bg-brand-50 text-brand',
                      )}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{order.technicianName || 'Ikke tildelt'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {overdue && <AlertTriangle className="w-4 h-4 text-danger-500" />}
                        <span className={cn(
                          'text-sm',
                          overdue ? 'text-danger-600 font-medium' : 'text-gray-600'
                        )}>
                          {order.deadline 
                            ? new Date(order.deadline).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })
                            : '-'
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/partner/ordrer/${order.id}`}
                        className="inline-flex items-center gap-1 text-sm text-brand hover:underline font-medium"
                      >
                        Detaljer
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Ingen oppdrag funnet</p>
            <p className="text-sm text-gray-400 mt-1">Prøv å endre søket eller filteret</p>
          </div>
        )}
      </Card>

      {/* Export button */}
      {sortedOrders.length > 0 && (
        <div className="flex justify-end">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Eksporter til Excel
          </Button>
        </div>
      )}
    </div>
  )
}
