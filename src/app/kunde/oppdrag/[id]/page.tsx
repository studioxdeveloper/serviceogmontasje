'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Wrench, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  Phone,
  FileText,
  Package,
  MessageSquare,
  Navigation
} from 'lucide-react'
import Link from 'next/link'
import { DummyMap } from '@/components/ui/DummyMap'
import { cn } from '@/lib/utils'

// Mock order details
const ordersData: Record<string, {
  id: string
  orderNumber: string
  description: string
  equipment: string
  equipmentBrand: string
  equipmentModel: string
  serialNumber: string
  status: 'planlagt' | 'paabegynt' | 'utfort'
  priority: string
  date: string
  createdAt: string
  location: string
  address: string
  technician: string | null
  technicianPhone: string | null
  notes: string
  updates: Array<{ timestamp: string; message: string; user: string }>
}> = {
  'K1': {
    id: 'K1',
    orderNumber: 'SM-2026-0234',
    description: 'Service sykeseng - Rom 204',
    equipment: 'Sykeseng',
    equipmentBrand: 'Invacare',
    equipmentModel: 'Medley Ergo',
    serialNumber: 'INV-2021-001',
    status: 'paabegynt',
    priority: 'Normal',
    date: '2026-02-03',
    createdAt: '2026-01-28',
    location: 'Jessheim Sykehjem',
    address: 'Sykehjemveien 1, 2050 Jessheim',
    technician: 'Ole Hansen',
    technicianPhone: '+47 912 34 567',
    notes: 'Bruker melder at sengen ikke hever seg ordentlig. Startet feilsøking.',
    updates: [
      { timestamp: '2026-02-03 09:30', message: 'Ankom lokasjon. Starter feilsøking.', user: 'Ole Hansen' },
      { timestamp: '2026-02-03 09:00', message: 'På vei til lokasjon.', user: 'Ole Hansen' },
      { timestamp: '2026-01-30 14:00', message: 'Tekniker tildelt: Ole Hansen', user: 'System' },
      { timestamp: '2026-01-28 10:15', message: 'Oppdrag mottatt og registrert.', user: 'System' },
    ]
  },
  'K2': {
    id: 'K2',
    orderNumber: 'SM-2026-0235',
    description: 'Reparasjon takheis - Avd. B',
    equipment: 'Takheis',
    equipmentBrand: 'Guldmann',
    equipmentModel: 'GH3',
    serialNumber: 'GH-2021-015',
    status: 'planlagt',
    priority: 'Høy',
    date: '2026-02-05',
    createdAt: '2026-01-29',
    location: 'Omsorgssenter Nord',
    address: 'Omsorgsveien 5, 2050 Jessheim',
    technician: 'Kari Nordmann',
    technicianPhone: '+47 923 45 678',
    notes: 'Takheis stopper midt i løftet. Må undersøkes.',
    updates: [
      { timestamp: '2026-01-31 10:00', message: 'Tekniker tildelt: Kari Nordmann', user: 'System' },
      { timestamp: '2026-01-29 08:30', message: 'Oppdrag mottatt og registrert.', user: 'System' },
    ]
  },
  'K3': {
    id: 'K3',
    orderNumber: 'SM-2026-0240',
    description: 'Periodisk kontroll - Sykesenger',
    equipment: 'Sykesenger',
    equipmentBrand: 'Diverse',
    equipmentModel: 'Flere modeller',
    serialNumber: '-',
    status: 'planlagt',
    priority: 'Normal',
    date: '2026-02-10',
    createdAt: '2026-02-01',
    location: 'Jessheim Sykehjem',
    address: 'Sykehjemveien 1, 2050 Jessheim',
    technician: null,
    technicianPhone: null,
    notes: 'Årlig periodisk kontroll av alle sykesenger.',
    updates: [
      { timestamp: '2026-02-01 12:00', message: 'Oppdrag mottatt og registrert.', user: 'System' },
    ]
  },
  'K4': {
    id: 'K4',
    orderNumber: 'SM-2026-0198',
    description: 'Årlig service personløfter',
    equipment: 'Personløfter',
    equipmentBrand: 'Molift',
    equipmentModel: 'Smart 150',
    serialNumber: 'MOL-2019-001',
    status: 'utfort',
    priority: 'Normal',
    date: '2026-01-25',
    createdAt: '2026-01-15',
    location: 'Omsorgssenter Sør',
    address: 'Sørveien 12, 2050 Jessheim',
    technician: 'Erik Berg',
    technicianPhone: '+47 934 56 789',
    notes: 'Service utført. Smurt og justert. Alt OK.',
    updates: [
      { timestamp: '2026-01-25 14:30', message: 'Oppdrag fullført. Alt fungerer som det skal.', user: 'Erik Berg' },
      { timestamp: '2026-01-25 13:00', message: 'Service pågår.', user: 'Erik Berg' },
      { timestamp: '2026-01-25 12:30', message: 'Ankom lokasjon.', user: 'Erik Berg' },
      { timestamp: '2026-01-20 09:00', message: 'Tekniker tildelt: Erik Berg', user: 'System' },
      { timestamp: '2026-01-15 10:00', message: 'Oppdrag mottatt og registrert.', user: 'System' },
    ]
  },
}

const statusLabels: Record<string, string> = {
  planlagt: 'Planlagt',
  paabegynt: 'Påbegynt',
  utfort: 'Utført',
}

export default function CustomerOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  
  const order = ordersData[orderId]

  if (!order) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">Oppdrag ikke funnet</p>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/kunde/oppdrag" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Tilbake til oppdrag</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              order.status === 'utfort' ? 'bg-success-500/20' : 'bg-white/10'
            )}>
              {order.status === 'utfort' ? (
                <CheckCircle className="w-6 h-6 text-success-400" />
              ) : (
                <Wrench className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-white text-xl font-heading font-semibold">{order.orderNumber}</h1>
              <p className="text-brand-light text-sm">{order.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Status banner */}
        <Card className={cn(
          'p-4 mb-6',
          order.status === 'utfort' && 'bg-success-50 border-success-100',
          order.status === 'paabegynt' && 'bg-brand-bg border-brand-light',
          order.status === 'planlagt' && 'bg-gray-50 border-gray-200'
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {order.status === 'utfort' ? (
                <CheckCircle className="w-5 h-5 text-success-600" />
              ) : order.status === 'paabegynt' ? (
                <Clock className="w-5 h-5 text-brand" />
              ) : (
                <Calendar className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <p className={cn(
                  'font-medium',
                  order.status === 'utfort' && 'text-success-700',
                  order.status === 'paabegynt' && 'text-brand-dark',
                  order.status === 'planlagt' && 'text-gray-700'
                )}>
                  {statusLabels[order.status]}
                </p>
                <p className="text-sm text-gray-500">
                  {order.status === 'utfort' 
                    ? `Fullført ${new Date(order.date).toLocaleDateString('nb-NO')}`
                    : `Planlagt ${new Date(order.date).toLocaleDateString('nb-NO')}`
                  }
                </p>
              </div>
            </div>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium',
              order.priority === 'Høy' ? 'bg-warning-100 text-warning-600' : 'bg-gray-100 text-gray-600'
            )}>
              {order.priority} prioritet
            </span>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equipment info */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Utstyr</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Type</p>
                  <p className="font-medium text-brand-dark">{order.equipment}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Merke</p>
                  <p className="font-medium text-brand-dark">{order.equipmentBrand}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Modell</p>
                  <p className="font-medium text-brand-dark">{order.equipmentModel}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Serienummer</p>
                  <p className="font-medium text-brand-dark font-mono">{order.serialNumber}</p>
                </div>
              </div>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-brand" />
                  <h2 className="font-heading font-semibold text-brand-dark">Beskrivelse</h2>
                </div>
                <p className="text-gray-700">{order.notes}</p>
              </Card>
            )}

            {/* Timeline */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Oppdateringer</h2>
              </div>
              
              <div className="space-y-4">
                {order.updates.map((update, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-3 h-3 rounded-full',
                        index === 0 ? 'bg-brand' : 'bg-gray-300'
                      )} />
                      {index < order.updates.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-brand-dark font-medium">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {update.timestamp} • {update.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            <Card className="p-0 overflow-hidden">
              <DummyMap 
                markers={[{
                  id: order.id,
                  lat: 59.9,
                  lng: 10.7,
                  type: 'default',
                  label: order.location.split(' ')[0]
                }]}
                showControls={false}
                showUserLocation={false}
                height="h-32"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-brand" />
                  <h2 className="font-heading font-semibold text-brand-dark text-sm">Lokasjon</h2>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-brand-dark text-sm">{order.location}</p>
                  <p className="text-xs text-gray-500">{order.address}</p>
                </div>
              </div>
            </Card>

            {/* Technician */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Tekniker</h2>
              </div>
              
              {order.technician ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {order.technician.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark">{order.technician}</p>
                      <p className="text-xs text-gray-500">Service og Montasje AS</p>
                    </div>
                  </div>
                  {order.technicianPhone && (
                    <a 
                      href={`tel:${order.technicianPhone}`}
                      className="flex items-center gap-2 p-3 bg-brand-bg rounded-xl hover:bg-brand-light/30 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-brand" />
                      <span className="text-sm font-medium text-brand-dark">{order.technicianPhone}</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Ikke tildelt ennå</p>
                </div>
              )}
            </Card>

            {/* Documents */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Dokumenter</h2>
              </div>
              
              {order.status === 'utfort' ? (
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Servicerapport.pdf</p>
                      <p className="text-xs text-gray-500">256 KB</p>
                    </div>
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Dokumenter blir tilgjengelig når oppdraget er fullført.</p>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
