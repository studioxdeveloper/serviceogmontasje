'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DummyMap } from '@/components/ui/DummyMap'
import { orders, technicians } from '@/data/mockData'
import { 
  MapPin, 
  List,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const currentTechnician = technicians[0]

export default function TechnicianMapPage() {
  const myOrders = orders.filter(o => 
    o.technicianId === currentTechnician.id && o.status !== 'utfort' && o.status !== 'fakturert' && o.status !== 'kansellert'
  )

  // Create markers from orders
  const markers = myOrders.slice(0, 3).map((order, index) => ({
    id: order.id,
    lat: 59.9 + (index * 0.02),
    lng: 10.7 + (index * 0.03),
    type: order.priority === 'haster' ? 'urgent' as const : 'default' as const,
    label: order.customerName.split(' ')[0]
  }))

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <DummyMap 
          markers={markers}
          showControls={true}
          showUserLocation={true}
          height="h-full"
          className="rounded-none"
        />

        {/* Map overlay - info */}
        <div className="absolute top-4 left-4 right-16">
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
                order.priority === 'haster' ? 'bg-red-100 text-red-600' : 'bg-brand-100 text-brand-600'
              )}>
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{order.customerName}</p>
                <p className="text-sm text-gray-500 truncate">{order.address}, {order.city}</p>
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
