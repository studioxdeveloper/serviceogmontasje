'use client'

import { Card } from '@/components/ui/Card'
import { orders, technicians, statusLabels, isOverdue } from '@/data/mockData'
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ChevronRight,
  MapPin,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Simulate logged in technician - Ole Hansen from S&M
const currentTechnician = technicians[0]

export default function TechnicianHomePage() {
  // Filter orders for current technician
  const myOrders = orders.filter(o => o.technicianId === currentTechnician.id)
  const todayOrders = myOrders.filter(o => o.scheduledDate === '2026-02-03')
  const activeOrders = myOrders.filter(o => o.status !== 'utfort' && o.status !== 'fakturert')
  const urgentOrders = myOrders.filter(o => o.priority === 'haster' || o.priority === 'hoy')
  const completedOrders = myOrders.filter(o => o.status === 'utfort')

  const stats = [
    { label: 'Aktive', value: activeOrders.length, icon: ClipboardList, color: 'bg-brand-light/30 text-brand' },
    { label: 'I dag', value: todayOrders.length, icon: Calendar, color: 'bg-warning-100 text-warning-500' },
    { label: 'Haster', value: urgentOrders.filter(o => o.priority === 'haster').length, icon: AlertTriangle, color: 'bg-danger-100 text-danger-500' },
    { label: 'Fullført', value: completedOrders.length, icon: CheckCircle, color: 'bg-success-100 text-success-500' },
  ]

  return (
    <div className="px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center">
          <span className="text-white text-xl font-semibold">OH</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">God morgen,</p>
          <h1 className="text-xl font-heading font-semibold text-brand-dark">{currentTechnician.name}</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-brand-dark">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Today's orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-brand-dark">Dagens oppdrag</h2>
          <Link href="/tekniker/oppdrag" className="text-sm text-brand font-medium flex items-center gap-1">
            Se alle <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {todayOrders.length > 0 ? (
          <div className="space-y-8">
            {todayOrders.map((order) => {
              const overdue = isOverdue(order)
              return (
                <Link key={order.id} href={`/tekniker/oppdrag/${order.id}`}>
                  <Card hover className={cn(
                    'p-4',
                    overdue && 'border-danger-200 bg-danger-50/50',
                    order.priority === 'haster' && !overdue && 'border-warning-200'
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                        order.priority === 'haster' ? 'bg-danger-100 text-danger-600' :
                        order.priority === 'hoy' ? 'bg-warning-100 text-warning-500' :
                        'bg-brand-light/30 text-brand'
                      )}>
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-brand-dark text-sm truncate">
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
                            order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                            order.status === 'deler' && 'bg-warning-100 text-warning-600',
                            order.status === 'utfort' && 'bg-success-100 text-success-600',
                          )}>
                            {statusLabels[order.status]}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {order.city}
                          </span>
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
            })}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Ingen oppdrag i dag!</p>
            <p className="text-sm text-gray-400 mt-1">God jobb!</p>
          </Card>
        )}
      </div>

      {/* Upcoming orders */}
      {activeOrders.filter(o => o.scheduledDate !== '2026-02-03').length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-brand-dark mb-4">Kommende oppdrag</h2>
          <div className="space-y-8">
            {activeOrders
              .filter(o => o.scheduledDate !== '2026-02-03')
              .slice(0, 3)
              .map((order) => (
                <Link key={order.id} href={`/tekniker/oppdrag/${order.id}`}>
                  <Card hover className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-brand-dark text-sm truncate">{order.customerName}</h3>
                        <p className="text-xs text-gray-500">
                          {order.scheduledDate 
                            ? new Date(order.scheduledDate).toLocaleDateString('nb-NO', { 
                                weekday: 'short', 
                                day: 'numeric', 
                                month: 'short' 
                              })
                            : 'Ikke planlagt'
                          }
                        </p>
                      </div>
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        order.status === 'uaapnet' && 'bg-gray-100 text-gray-700',
                        order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                        order.status === 'deler' && 'bg-warning-100 text-warning-600',
                      )}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
