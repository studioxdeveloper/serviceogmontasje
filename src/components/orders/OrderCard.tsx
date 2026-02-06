'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { 
  Order, 
  statusLabels, 
  orderTypeLabels
} from '@/data/mockData'
import { 
  MapPin, 
  Calendar,
  ChevronRight,
  AlertTriangle,
  Wrench,
  Settings,
  ShieldCheck,
  Package,
  Truck,
  FileText
} from 'lucide-react'

interface OrderCardProps {
  order: Order
  variant?: 'default' | 'compact'
  href?: string
}

const orderTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  montering: Package,
  demontering: Truck,
  service: Settings,
  reparasjon: Wrench,
  periodisk_kontroll: ShieldCheck,
  prosjektering: FileText,
}

export function OrderCard({ order, variant = 'default', href }: OrderCardProps) {
  const Icon = orderTypeIcons[order.orderType] || Settings
  
  const content = (
    <Card hover className={cn(variant === 'compact' && 'p-3')}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 rounded-xl flex items-center justify-center',
          variant === 'default' ? 'w-12 h-12' : 'w-10 h-10',
          order.priority === 'haster' ? 'bg-danger-100 text-danger-600' :
          order.priority === 'hoy' ? 'bg-warning-100 text-warning-500' :
          'bg-brand-light/30 text-brand'
        )}>
          <Icon className={variant === 'default' ? 'w-6 h-6' : 'w-5 h-5'} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold text-brand-dark truncate">
                {order.orderNumber} • {order.customerName}
              </h3>
              <p className="text-sm text-gray-500">
                {order.equipmentType}{order.equipmentBrand ? ` - ${order.equipmentBrand}` : ''}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              order.status === 'uaapnet' && 'bg-gray-100 text-gray-700',
              order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
              order.status === 'deler' && 'bg-warning-100 text-warning-600',
              order.status === 'utfort' && 'bg-success-100 text-success-600',
              order.status === 'fakturert' && 'bg-brand-50 text-brand',
              order.status === 'kansellert' && 'bg-danger-100 text-danger-600',
            )}>
              {statusLabels[order.status]}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              {orderTypeLabels[order.orderType]}
            </span>
          </div>

          {/* Meta info */}
          {variant === 'default' && (
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{order.city}</span>
              </div>
              {order.scheduledDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(order.scheduledDate).toLocaleDateString('nb-NO', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}</span>
                </div>
              )}
            </div>
          )}

          {/* Priority warning */}
          {order.priority === 'haster' && (
            <div className="flex items-center gap-1.5 mt-2 text-danger-600 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Haster!</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
