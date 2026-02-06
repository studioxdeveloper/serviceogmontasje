'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  orders, 
  statusLabels, 
  orderTypeLabels,
  priorityLabels,
  OrderStatus
} from '@/data/mockData'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  MapPin,
  Phone,
  Navigation,
  Clock,
  Wrench,
  FileText,
  Camera,
  CheckCircle,
  AlertTriangle,
  Building2,
  Calendar,
  Edit
} from 'lucide-react'
import { DummyMap } from '@/components/ui/DummyMap'

export default function TechnicianOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | null>(null)
  
  const order = orders.find(o => o.id === params.id)

  if (!order) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-gray-500 mb-4">Oppdrag ikke funnet</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbake
        </Button>
      </div>
    )
  }

  const displayStatus = currentStatus || order.status
  const statusFlow: OrderStatus[] = ['uaapnet', 'paabegynt', 'utfort']
  const currentIndex = statusFlow.indexOf(displayStatus)

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus)
    setShowStatusModal(false)
  }

  return (
    <div className="min-h-screen bg-brand-bg pb-32">
      {/* Header */}
      <div className="bg-brand-dark px-4 py-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-white">Oppdrag {order.orderNumber}</h1>
            <p className="text-sm text-brand-light">{orderTypeLabels[order.orderType]}</p>
          </div>
          {order.priority === 'haster' && (
            <span className="px-2.5 py-1 bg-danger-500 text-white text-xs font-medium rounded-full">
              Haster
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Status card */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Status</span>
            <div className="flex gap-2">
              <span className={cn(
                'px-3 py-1 rounded-full text-sm font-medium',
                displayStatus === 'uaapnet' && 'bg-gray-100 text-gray-700',
                displayStatus === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                displayStatus === 'deler' && 'bg-warning-100 text-warning-600',
                displayStatus === 'utfort' && 'bg-success-100 text-success-600',
              )}>
                {statusLabels[displayStatus]}
              </span>
            </div>
          </div>

          {/* Status progress */}
          <div className="flex items-center gap-2">
            {statusFlow.map((status, index) => {
              const isCompleted = currentIndex >= index
              const isCurrent = displayStatus === status
              
              return (
                <div key={status} className="flex-1 flex items-center">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    isCompleted ? 'bg-brand text-white' : 'bg-gray-100 text-gray-400',
                    isCurrent && 'ring-4 ring-brand-light/50'
                  )}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  {index < statusFlow.length - 1 && (
                    <div className={cn(
                      'flex-1 h-1 mx-2 rounded-full',
                      isCompleted && index < currentIndex ? 'bg-brand' : 'bg-gray-100'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Uåpnet</span>
            <span>Påbegynt</span>
            <span>Utført</span>
          </div>
        </Card>

        {/* Priority warning */}
        {order.priority === 'haster' && (
          <Card className="p-4 bg-danger-50 border-danger-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-danger-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="font-medium text-danger-800">Dette oppdraget haster!</p>
                <p className="text-sm text-danger-600">Frist: {order.deadline ? new Date(order.deadline).toLocaleDateString('nb-NO') : 'I dag'}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Customer info */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Kunde</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-brand-dark">{order.customerName}</p>
              <p className="text-sm text-gray-500">{order.address}</p>
              <p className="text-sm text-gray-500">{order.city}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Ring
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                <Navigation className="w-4 h-4 mr-2" />
                Navigér
              </Button>
            </div>
          </div>
        </Card>

        {/* Location map */}
        <Card className="p-0 overflow-hidden">
          <DummyMap 
            markers={[{
              id: order.id,
              lat: 59.9,
              lng: 10.7,
              type: order.priority === 'haster' ? 'urgent' : 'default',
              label: order.city
            }]}
            showControls={false}
            showUserLocation={false}
            height="h-40"
          />
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{order.address}, {order.city}</span>
              </div>
              <Button variant="secondary" size="sm">
                <Navigation className="w-4 h-4 mr-1" />
                Åpne i kart
              </Button>
            </div>
          </div>
        </Card>

        {/* Equipment info */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Utstyr</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Type</p>
              <p className="font-medium text-brand-dark">{order.equipmentType}</p>
            </div>
            {order.equipmentBrand && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Merke</p>
                <p className="font-medium text-brand-dark">{order.equipmentBrand}</p>
              </div>
            )}
            {order.equipmentModel && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Modell</p>
                <p className="font-medium text-brand-dark">{order.equipmentModel}</p>
              </div>
            )}
            {order.serialNumber && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Serienr.</p>
                <p className="font-medium text-brand-dark font-mono text-sm">{order.serialNumber}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Description */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Beskrivelse</h2>
          </div>
          <p className="text-gray-700">{order.description}</p>
        </Card>

        {/* Schedule */}
        {order.scheduledDate && (
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-brand" />
              <h2 className="font-heading font-semibold text-brand-dark">Planlagt</h2>
            </div>
            <p className="text-brand-dark font-medium">
              {new Date(order.scheduledDate).toLocaleDateString('nb-NO', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            {order.deadline && (
              <p className="text-sm text-gray-500 mt-1">
                Frist: {new Date(order.deadline).toLocaleDateString('nb-NO')}
              </p>
            )}
          </Card>
        )}

        {/* Technician notes */}
        {order.technicianNotes && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-semibold text-brand-dark">Mine notater</h2>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-700 bg-brand-bg p-3 rounded-xl text-sm">{order.technicianNotes}</p>
          </Card>
        )}

        {/* Time registration */}
        <Card className="p-5">
          <h2 className="font-heading font-semibold text-brand-dark mb-4">Registrer tid og kostnader</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Timer</label>
              <input 
                type="number" 
                defaultValue={order.hours || 0}
                className="w-full mt-1 px-3 py-2.5 bg-gray-50 rounded-xl border-0 text-sm focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Kilometer</label>
              <input 
                type="number" 
                defaultValue={order.kilometers || 0}
                className="w-full mt-1 px-3 py-2.5 bg-gray-50 rounded-xl border-0 text-sm focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex gap-3 max-w-lg mx-auto">
          {displayStatus !== 'utfort' && (
            <>
              <Button variant="outline" size="lg" className="flex-1">
                <Camera className="w-5 h-5 mr-2" />
                Ta bilde
              </Button>
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => setShowStatusModal(true)}
              >
                {displayStatus === 'uaapnet' ? 'Start oppdrag' : 'Fullfør'}
              </Button>
            </>
          )}
          {displayStatus === 'utfort' && (
            <Button variant="secondary" size="lg" className="w-full">
              <CheckCircle className="w-5 h-5 mr-2" />
              Oppdrag fullført
            </Button>
          )}
        </div>
      </div>

      {/* Status change modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <h3 className="text-lg font-heading font-semibold text-brand-dark mb-4">Oppdater status</h3>
            <div className="space-y-2">
              {displayStatus === 'uaapnet' ? (
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => handleStatusChange('paabegynt')}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Start oppdrag
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => handleStatusChange('utfort')}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Marker som fullført
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full"
                onClick={() => setShowStatusModal(false)}
              >
                Avbryt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
