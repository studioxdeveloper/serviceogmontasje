'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { orders, technicians, statusLabels, OrderStatus } from '@/data/mockData'
import { Search, Filter, X, MapPin, Calendar, ChevronRight, AlertTriangle, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const currentTechnician = technicians[0]

const statusFilters: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'uaapnet', label: 'Uåpnet' },
  { value: 'paabegynt', label: 'Påbegynt' },
  { value: 'deler', label: 'Venter deler' },
  { value: 'utfort', label: 'Utført' },
]

export default function TechnicianOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')

  // Filter orders for current technician
  const myOrders = orders.filter(o => o.technicianId === currentTechnician.id)
  
  // Apply filters
  const filteredOrders = myOrders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.equipmentType.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Group by date - today is 2026-02-03
  const today = '2026-02-03'
  const tomorrow = '2026-02-04'
  
  const todayOrders = filteredOrders.filter(o => o.scheduledDate === today && o.status !== 'utfort')
  const tomorrowOrders = filteredOrders.filter(o => o.scheduledDate === tomorrow && o.status !== 'utfort')
  const laterOrders = filteredOrders.filter(o => 
    o.scheduledDate && o.scheduledDate > tomorrow && o.status !== 'utfort'
  )
  const completedOrders = filteredOrders.filter(o => o.status === 'utfort')

  return (
    <div className="px-4 py-6 animate-fade-in">
      {/* Header */}
      <h1 className="text-2xl font-heading font-semibold text-sm-dark mb-6">Mine oppdrag</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Søk etter ordre, kunde..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-3 bg-white rounded-2xl border border-gray-100 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sm-primary/20 focus:border-sm-light"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Status filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              statusFilter === filter.value
                ? 'bg-sm-primary text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100 hover:border-sm-light'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredOrders.length} oppdrag
      </p>

      {/* Grouped orders */}
      <div className="space-y-6">
        {todayOrders.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-sm-primary uppercase tracking-wider mb-3">
              I dag ({todayOrders.length})
            </h2>
            <div className="space-y-3">
              {todayOrders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {tomorrowOrders.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              I morgen ({tomorrowOrders.length})
            </h2>
            <div className="space-y-3">
              {tomorrowOrders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {laterOrders.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Senere ({laterOrders.length})
            </h2>
            <div className="space-y-3">
              {laterOrders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {completedOrders.length > 0 && statusFilter === 'all' && (
          <div>
            <h2 className="text-sm font-semibold text-success-600 uppercase tracking-wider mb-3">
              Fullført ({completedOrders.length})
            </h2>
            <div className="space-y-3">
              {completedOrders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Ingen oppdrag funnet</p>
            <p className="text-sm text-gray-400 mt-1">Prøv å endre søket eller filteret</p>
          </div>
        )}
      </div>
    </div>
  )
}

function OrderListItem({ order }: { order: typeof orders[0] }) {
  return (
    <Link href={`/tekniker/oppdrag/${order.id}`}>
      <Card hover className={cn(
        'p-4',
        order.priority === 'haster' && 'border-warning-200 bg-warning-50/30'
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
            order.priority === 'haster' ? 'bg-danger-100 text-danger-600' :
            order.priority === 'hoy' ? 'bg-warning-100 text-warning-500' :
            'bg-sm-light/30 text-sm-primary'
          )}>
            <ClipboardList className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm-dark text-sm truncate">
                  {order.customerName}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {order.equipmentType} {order.equipmentBrand && `• ${order.equipmentBrand}`}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                order.status === 'uaapnet' && 'bg-gray-100 text-gray-700',
                order.status === 'paabegynt' && 'bg-sm-light/30 text-sm-dark',
                order.status === 'deler' && 'bg-warning-100 text-warning-600',
                order.status === 'utfort' && 'bg-success-100 text-success-600',
              )}>
                {statusLabels[order.status]}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                {order.city}
              </span>
              {order.scheduledDate && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(order.scheduledDate).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>

            {order.priority === 'haster' && (
              <div className="flex items-center gap-1.5 mt-2 text-danger-600 text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="font-medium">Haster!</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
