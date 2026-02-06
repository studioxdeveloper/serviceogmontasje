'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  orders, 
  partners,
  technicians,
  statusLabels, 
  statusColors, 
  orderTypeLabels,
  priorityLabels,
  isOverdue,
  OrderStatus
} from '@/data/mockData'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Phone,
  Mail,
  Navigation,
  Clock,
  FileText,
  Camera,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  User,
  Building2,
  Wrench,
  Send,
  Download,
  Edit2,
  History,
  ExternalLink,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { DummyMap } from '@/components/ui/DummyMap'

// Mock log history
const getLogHistory = (orderId: string) => [
  { id: '1', timestamp: '2026-02-03 09:15', action: 'Status endret til Påbegynt', user: 'Ole Hansen', type: 'status' },
  { id: '2', timestamp: '2026-02-02 14:30', action: 'Tekniker tildelt: Ole Hansen', user: 'Therese Stenvåg', type: 'assign' },
  { id: '3', timestamp: '2026-02-01 10:00', action: 'Oppdrag tildelt HVH Service AS', user: 'Marte Engebakken', type: 'assign' },
  { id: '4', timestamp: '2026-01-30 08:45', action: 'Oppdrag opprettet fra e-post', user: 'System', type: 'create' },
]

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | null>(null)
  
  const order = orders.find(o => o.id === params.id)

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Oppdrag ikke funnet</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbake
        </Button>
      </div>
    )
  }

  const displayStatus = currentStatus || order.status
  const overdue = isOverdue(order)
  const logHistory = getLogHistory(order.id)
  const partner = partners.find(p => p.id === order.partnerId)
  const technician = order.technicianId ? technicians.find(t => t.id === order.technicianId) : null

  const statusOptions: OrderStatus[] = ['uaapnet', 'paabegynt', 'deler', 'utfort', 'fakturert', 'kansellert']

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus)
    setShowStatusDropdown(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-heading font-semibold text-brand-dark">
                {order.orderNumber}
              </h1>
              {overdue && (
                <span className="px-2.5 py-1 bg-danger-100 text-danger-600 text-xs font-medium rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Forfalt
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">{order.customerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit2 className="w-4 h-4 mr-2" />
            Rediger
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Generer rapport
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Order details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order info card */}
          <Card className="p-6">
            <h2 className="font-heading font-semibold text-brand-dark mb-6">Oppdragsinformasjon</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Status</label>
                  <div className="relative mt-1">
                    <button
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium',
                        displayStatus === 'uaapnet' && 'bg-gray-100 text-gray-700',
                        displayStatus === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                        displayStatus === 'deler' && 'bg-warning-100 text-warning-600',
                        displayStatus === 'utfort' && 'bg-success-100 text-success-600',
                        displayStatus === 'fakturert' && 'bg-brand-50 text-brand',
                        displayStatus === 'kansellert' && 'bg-danger-100 text-danger-600',
                      )}
                    >
                      {statusLabels[displayStatus]}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showStatusDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={cn(
                              'w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors',
                              displayStatus === status && 'bg-brand-bg font-medium'
                            )}
                          >
                            {statusLabels[status]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Type</label>
                  <p className="text-brand-dark font-medium mt-1">{orderTypeLabels[order.orderType]}</p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Prioritet</label>
                  <p className={cn(
                    'font-medium mt-1',
                    order.priority === 'haster' && 'text-danger-600',
                    order.priority === 'hoy' && 'text-warning-500',
                    order.priority === 'normal' && 'text-brand',
                    order.priority === 'lav' && 'text-gray-500',
                  )}>
                    {priorityLabels[order.priority]}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Opprettet</label>
                  <p className="text-brand-dark font-medium mt-1">
                    {new Date(order.createdAt).toLocaleDateString('nb-NO', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Frist</label>
                  <p className={cn(
                    'font-medium mt-1',
                    overdue ? 'text-danger-600' : 'text-brand-dark'
                  )}>
                    {order.deadline 
                      ? new Date(order.deadline).toLocaleDateString('nb-NO', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })
                      : 'Ikke satt'
                    }
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Referanse</label>
                  <p className="text-brand-dark font-medium mt-1 font-mono">{order.reference || order.orderNumber}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Beskrivelse</label>
              <p className="text-gray-700 mt-2">{order.description}</p>
            </div>
          </Card>

          {/* Equipment card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-brand" />
              <h2 className="font-heading font-semibold text-brand-dark">Utstyr</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Type</label>
                <p className="text-brand-dark font-medium mt-1">{order.equipmentType}</p>
              </div>
              {order.equipmentBrand && (
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Merke</label>
                  <p className="text-brand-dark font-medium mt-1">{order.equipmentBrand}</p>
                </div>
              )}
              {order.equipmentModel && (
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Modell</label>
                  <p className="text-brand-dark font-medium mt-1">{order.equipmentModel}</p>
                </div>
              )}
              {order.serialNumber && (
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Serienummer</label>
                  <p className="text-brand-dark font-medium mt-1 font-mono">{order.serialNumber}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Billing card */}
          <Card className="p-6">
            <h2 className="font-heading font-semibold text-brand-dark mb-4">Faktureringsgrunnlag</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Timer</label>
                <input 
                  type="number" 
                  defaultValue={order.hours || 0}
                  className="w-full mt-1 px-3 py-2 bg-gray-50 rounded-lg border-0 text-sm focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Km</label>
                <input 
                  type="number" 
                  defaultValue={order.kilometers || 0}
                  className="w-full mt-1 px-3 py-2 bg-gray-50 rounded-lg border-0 text-sm focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Kjøretid</label>
                <input 
                  type="number" 
                  defaultValue={order.driveTime || 0}
                  className="w-full mt-1 px-3 py-2 bg-gray-50 rounded-lg border-0 text-sm focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Parkering</label>
                <input 
                  type="number" 
                  defaultValue={order.parking || 0}
                  className="w-full mt-1 px-3 py-2 bg-gray-50 rounded-lg border-0 text-sm focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Deler</label>
                <input 
                  type="text" 
                  defaultValue={order.parts || ''}
                  placeholder="Beskrivelse"
                  className="w-full mt-1 px-3 py-2 bg-gray-50 rounded-lg border-0 text-sm focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>
          </Card>

          {/* Log history */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-brand" />
              <h2 className="font-heading font-semibold text-brand-dark">Logghistorikk</h2>
            </div>
            
            <div className="space-y-4">
              {logHistory.map((log, index) => (
                <div key={log.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      log.type === 'create' && 'bg-brand',
                      log.type === 'assign' && 'bg-warning-400',
                      log.type === 'status' && 'bg-success-500',
                    )} />
                    {index < logHistory.length - 1 && (
                      <div className="w-px h-full bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-brand-dark font-medium">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {log.timestamp} • {log.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Location card */}
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
              height="h-36"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark text-sm">Lokasjon</h2>
              </div>
              <div className="space-y-1 mb-3">
                <p className="font-medium text-brand-dark text-sm">{order.address}</p>
                <p className="text-xs text-gray-500">{order.city}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Åpne i kart
              </Button>
            </div>
          </Card>

          {/* Customer card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-brand" />
              <h2 className="font-heading font-semibold text-brand-dark">Kunde</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-brand-dark">{order.customerName}</p>
                <p className="text-xs text-gray-500 mt-0.5">Oppdragsgiver</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Partner card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-brand" />
              <h2 className="font-heading font-semibold text-brand-dark">Utfører</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-brand-dark">{partner?.name || order.partnerName}</p>
                <p className="text-xs text-gray-500 mt-0.5">Partnerfirma</p>
              </div>
              
              {technician ? (
                <div className="p-3 bg-brand-bg rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {technician.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark text-sm">{technician.name}</p>
                      <p className="text-xs text-gray-500">{technician.phone}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-warning-50 rounded-xl">
                  <p className="text-sm text-warning-600">Ingen tekniker tildelt</p>
                </div>
              )}
            </div>
          </Card>

          {/* Documents card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Dokumenter</h2>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <FileText className="w-5 h-5 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">Bestilling.pdf</p>
                  <p className="text-xs text-gray-500">256 KB</p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <Camera className="w-5 h-5 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">Bilde_utstyr.jpg</p>
                  <p className="text-xs text-gray-500">1.2 MB</p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
