'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { orders, technicians } from '@/data/mockData'
import { 
  MapPin, 
  Navigation, 
  List,
  ChevronRight,
  Clock,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const currentTechnician = technicians[0]

export default function TechnicianMapPage() {
  const myOrders = orders.filter(o => 
    o.technicianId === currentTechnician.id && o.status !== 'completed'
  )

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Map placeholder */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden">
        {/* Simulated map */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50">
          {/* Grid pattern to simulate map */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Map markers */}
          <div className="absolute top-1/4 left-1/3 animate-bounce">
            <div className="relative">
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-600 rotate-45" />
            </div>
          </div>

          <div className="absolute top-1/2 left-2/3">
            <div className="relative">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rotate-45" />
            </div>
          </div>

          <div className="absolute top-3/4 left-1/4">
            <div className="relative">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rotate-45" />
            </div>
          </div>

          {/* User location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50" />
          </div>
        </div>

        {/* Map overlay - info */}
        <div className="absolute top-4 left-4 right-4">
          <Card className="shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Aktive oppdrag</p>
                <p className="text-2xl font-bold text-gray-900">{myOrders.length}</p>
              </div>
              <Button variant="secondary" size="sm">
                <List className="w-4 h-4 mr-2" />
                Liste
              </Button>
            </div>
          </Card>
        </div>

        {/* Map controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
            +
          </button>
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
            −
          </button>
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-brand-600 hover:bg-brand-50">
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom sheet - orders */}
      <div className="bg-white border-t border-gray-200 rounded-t-3xl -mt-4 relative z-10 px-4 pt-4 pb-20">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <h2 className="font-semibold text-gray-900 mb-3">Nærmeste oppdrag</h2>
        
        <div className="space-y-2">
          {myOrders.slice(0, 2).map((order) => (
            <Link 
              key={order.id} 
              href={`/tekniker/oppdrag/${order.id}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                order.priority === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-brand-100 text-brand-600'
              )}>
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{order.customerName}</p>
                <p className="text-sm text-gray-500 truncate">{order.customerAddress}</p>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">2.3 km</p>
                  <p className="text-xs text-gray-500">8 min</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
