'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const serviceTypes = [
  { id: 'service', label: 'Vanlig service', description: 'Årlig eller periodisk service' },
  { id: 'reparasjon', label: 'Reparasjon', description: 'Noe er ødelagt og må fikses' },
  { id: 'kontroll', label: 'Periodisk kontroll', description: 'Lovpålagt kontroll' },
  { id: 'montering', label: 'Montering', description: 'Nytt utstyr skal monteres' },
  { id: 'demontering', label: 'Demontering', description: 'Utstyr skal fjernes' },
]

const equipmentTypes = [
  'Sykeseng',
  'Takheis',
  'Personløfter',
  'Dusjstol',
  'Trappeheis',
  'Elektrisk rullestol',
  'Annet',
]

const locations = [
  'Jessheim Sykehjem',
  'Omsorgssenter Nord',
  'Omsorgssenter Sør',
  'Hjemmetjenesten',
  'Annen lokasjon',
]

export default function OrderServicePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: '',
    equipmentType: '',
    location: '',
    room: '',
    serialNumber: '',
    description: '',
    preferredDate: '',
    priority: 'normal',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <header className="bg-brand-dark px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-xl font-heading font-semibold">Bestilling sendt</h1>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-6 py-6">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-brand-dark mb-2">
              Takk for din bestilling!
            </h2>
            <p className="text-gray-600 mb-6">
              Vi har mottatt din forespørsel og vil kontakte deg snart med bekreftelse.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Referansenummer: <span className="font-mono font-medium">SM-2026-0245</span>
            </p>
            <Link href="/kunde">
              <Button>Tilbake til forsiden</Button>
            </Link>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/kunde" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Avbryt</span>
          </Link>
          <h1 className="text-white text-xl font-heading font-semibold">Bestill service</h1>
          <p className="text-brand-light text-sm mt-1">Steg {step} av 3</p>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                s <= step ? 'bg-brand' : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pb-6">
        {/* Step 1: Service type */}
        {step === 1 && (
          <Card className="p-6">
            <h2 className="font-heading font-semibold text-brand-dark mb-4">Hva slags service trenger du?</h2>
            
            <div className="space-y-6">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setFormData({ ...formData, serviceType: type.id })
                    setStep(2)
                  }}
                  className={cn(
                    'w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left',
                    formData.serviceType === type.id 
                      ? 'border-brand bg-brand-bg' 
                      : 'border-gray-200 hover:border-brand-light'
                  )}
                >
                  <div>
                    <p className="font-medium text-brand-dark">{type.label}</p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Equipment & Location */}
        {step === 2 && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Utstyr</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type utstyr</label>
                  <select
                    value={formData.equipmentType}
                    onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    <option value="">Velg type...</option>
                    {equipmentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serienummer (valgfritt)</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    placeholder="F.eks. INV-2021-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Lokasjon</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hvor står utstyret?</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    <option value="">Velg lokasjon...</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rom/avdeling</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="F.eks. Rom 204 eller Avdeling B"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  />
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Tilbake
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                className="flex-1"
                disabled={!formData.equipmentType || !formData.location}
              >
                Neste
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Details & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-brand" />
                <h2 className="font-heading font-semibold text-brand-dark">Detaljer</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beskriv problemet eller ønsket service</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Gi en kort beskrivelse..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ønsket dato (valgfritt)</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioritet</label>
                  <div className="flex gap-3">
                    {[
                      { value: 'normal', label: 'Normal' },
                      { value: 'hoy', label: 'Høy' },
                      { value: 'haster', label: 'Haster!' },
                    ].map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setFormData({ ...formData, priority: p.value })}
                        className={cn(
                          'flex-1 py-2 rounded-xl text-sm font-medium transition-all',
                          formData.priority === p.value
                            ? p.value === 'haster' 
                              ? 'bg-danger-100 text-danger-600 border-2 border-danger-300'
                              : p.value === 'hoy'
                                ? 'bg-warning-100 text-warning-600 border-2 border-warning-300'
                                : 'bg-brand text-white border-2 border-brand'
                            : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Summary */}
            <Card className="p-6 bg-gray-50">
              <h3 className="font-medium text-brand-dark mb-3">Oppsummering</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-brand-dark">{serviceTypes.find(s => s.id === formData.serviceType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Utstyr:</span>
                  <span className="text-brand-dark">{formData.equipmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lokasjon:</span>
                  <span className="text-brand-dark">{formData.location}</span>
                </div>
                {formData.room && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rom:</span>
                    <span className="text-brand-dark">{formData.room}</span>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Tilbake
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Send bestilling
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
