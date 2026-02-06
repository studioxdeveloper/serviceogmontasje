'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Package, 
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  FileText,
  Wrench,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock equipment data per category
const equipmentData: Record<string, {
  type: string
  count: number
  lastInspection: string
  status: 'ok' | 'due'
  items: Array<{
    id: string
    serialNumber: string
    brand: string
    model: string
    location: string
    room: string
    status: 'ok' | 'needs_service' | 'due'
    lastService: string
  }>
}> = {
  '1': {
    type: 'Sykesenger',
    count: 45,
    lastInspection: '2025-11-15',
    status: 'ok',
    items: [
      { id: 'S1', serialNumber: 'INV-2021-001', brand: 'Invacare', model: 'Medley Ergo', location: 'Jessheim Sykehjem', room: 'Rom 204', status: 'ok', lastService: '2025-11-15' },
      { id: 'S2', serialNumber: 'INV-2021-002', brand: 'Invacare', model: 'Medley Ergo', location: 'Jessheim Sykehjem', room: 'Rom 205', status: 'needs_service', lastService: '2025-08-10' },
      { id: 'S3', serialNumber: 'INV-2020-015', brand: 'Invacare', model: 'SB755', location: 'Omsorgssenter Nord', room: 'Avd. A', status: 'ok', lastService: '2025-10-20' },
      { id: 'S4', serialNumber: 'LIN-2022-033', brand: 'Linak', model: 'HC40', location: 'Omsorgssenter Nord', room: 'Avd. B', status: 'due', lastService: '2025-06-01' },
      { id: 'S5', serialNumber: 'INV-2023-101', brand: 'Invacare', model: 'Medley Ergo', location: 'Jessheim Sykehjem', room: 'Rom 301', status: 'ok', lastService: '2025-11-15' },
    ]
  },
  '2': {
    type: 'Takheiser',
    count: 28,
    lastInspection: '2025-10-20',
    status: 'ok',
    items: [
      { id: 'T1', serialNumber: 'GH-2020-001', brand: 'Guldmann', model: 'GH3', location: 'Jessheim Sykehjem', room: 'Rom 204', status: 'ok', lastService: '2025-10-20' },
      { id: 'T2', serialNumber: 'GH-2021-015', brand: 'Guldmann', model: 'GH3', location: 'Omsorgssenter Nord', room: 'Bad 1', status: 'ok', lastService: '2025-10-20' },
      { id: 'T3', serialNumber: 'LIK-2022-008', brand: 'Likorall', model: '242S', location: 'Omsorgssenter Sør', room: 'Avd. C', status: 'needs_service', lastService: '2025-07-15' },
    ]
  },
  '3': {
    type: 'Personløftere',
    count: 35,
    lastInspection: '2025-09-01',
    status: 'due',
    items: [
      { id: 'P1', serialNumber: 'MOL-2019-001', brand: 'Molift', model: 'Smart 150', location: 'Jessheim Sykehjem', room: 'Felles', status: 'due', lastService: '2025-09-01' },
      { id: 'P2', serialNumber: 'MOL-2020-022', brand: 'Molift', model: 'Mover 180', location: 'Omsorgssenter Nord', room: 'Felles', status: 'due', lastService: '2025-08-15' },
      { id: 'P3', serialNumber: 'ARJ-2021-005', brand: 'Arjo', model: 'Maxi Move', location: 'Omsorgssenter Sør', room: 'Avd. A', status: 'ok', lastService: '2025-11-01' },
    ]
  },
  '4': {
    type: 'Dusjstoler',
    count: 48,
    lastInspection: '2025-12-01',
    status: 'ok',
    items: [
      { id: 'D1', serialNumber: 'ETA-2022-001', brand: 'Etac', model: 'Clean', location: 'Jessheim Sykehjem', room: 'Bad 1', status: 'ok', lastService: '2025-12-01' },
      { id: 'D2', serialNumber: 'ETA-2022-002', brand: 'Etac', model: 'Clean', location: 'Jessheim Sykehjem', room: 'Bad 2', status: 'ok', lastService: '2025-12-01' },
    ]
  },
}

export default function EquipmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.id as string
  
  const category = equipmentData[categoryId]

  if (!category) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">Utstyrskategori ikke funnet</p>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
        </Card>
      </div>
    )
  }

  const needsServiceCount = category.items.filter(i => i.status === 'needs_service' || i.status === 'due').length

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/kunde/utstyr" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Tilbake til oversikt</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl font-heading font-semibold">{category.type}</h1>
              <p className="text-brand-light text-sm">{category.count} enheter registrert</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <p className="text-2xl font-semibold text-brand-dark">{category.items.length}</p>
            <p className="text-xs text-gray-500">Vises her</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-success-600">
              {category.items.filter(i => i.status === 'ok').length}
            </p>
            <p className="text-xs text-gray-500">OK</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-warning-600">{needsServiceCount}</p>
            <p className="text-xs text-gray-500">Trenger service</p>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <Link href="/kunde/bestill" className="flex-1">
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Bestill service
            </Button>
          </Link>
          <Link href="/kunde/meld-feil" className="flex-1">
            <Button variant="outline" className="w-full">
              <AlertCircle className="w-4 h-4 mr-2" />
              Meld feil
            </Button>
          </Link>
        </div>

        {/* Equipment items */}
        <Card className="p-6">
          <h2 className="font-heading font-semibold text-brand-dark mb-4">Enheter</h2>
          
          <div className="space-y-4">
            {category.items.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-brand-bg transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-brand-dark">{item.brand} {item.model}</p>
                    <p className="text-xs text-gray-500 font-mono">{item.serialNumber}</p>
                  </div>
                  <span className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    item.status === 'ok' && 'bg-success-100 text-success-600',
                    item.status === 'needs_service' && 'bg-warning-100 text-warning-600',
                    item.status === 'due' && 'bg-danger-100 text-danger-600',
                  )}>
                    {item.status === 'ok' ? 'OK' : item.status === 'needs_service' ? 'Trenger service' : 'Kontroll forfalt'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" />
                    {item.room}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Sist: {new Date(item.lastService).toLocaleDateString('nb-NO')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Service history */}
        <Card className="p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Servicehistorikk</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-success-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-dark">Periodisk kontroll utført</p>
                <p className="text-xs text-gray-500">15. november 2025 • Service og Montasje AS</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-brand" />
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-dark">Reparasjon - Motorbytte</p>
                <p className="text-xs text-gray-500">3. september 2025 • HVH Service AS</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-success-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-dark">Årlig service</p>
                <p className="text-xs text-gray-500">20. mai 2025 • Service og Montasje AS</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
