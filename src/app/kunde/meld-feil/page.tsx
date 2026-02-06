'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  AlertCircle,
  Package,
  MapPin,
  Camera,
  CheckCircle,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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

export default function ReportErrorPage() {
  const [formData, setFormData] = useState({
    equipmentType: '',
    location: '',
    room: '',
    serialNumber: '',
    description: '',
    urgent: false,
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
            <h1 className="text-white text-xl font-heading font-semibold">Feilmelding sendt</h1>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-6 py-6">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-brand-dark mb-2">
              Takk for din feilmelding!
            </h2>
            <p className="text-gray-600 mb-6">
              Vi har mottatt din melding og vil håndtere den så raskt som mulig.
              {formData.urgent && ' Siden dette er en hastesak, vil vi prioritere denne.'}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Saksnummer: <span className="font-mono font-medium">FEIL-2026-0089</span>
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning-400" />
            </div>
            <div>
              <h1 className="text-white text-xl font-heading font-semibold">Meld feil</h1>
              <p className="text-brand-light text-sm">Rapporter en feil på utstyr</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Urgent toggle */}
        <Card className={cn(
          'p-4 transition-colors',
          formData.urgent ? 'bg-danger-50 border-danger-200' : ''
        )}>
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.urgent}
              onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
              className="sr-only"
            />
            <div className={cn(
              'w-12 h-7 rounded-full relative transition-colors',
              formData.urgent ? 'bg-danger-500' : 'bg-gray-200'
            )}>
              <div className={cn(
                'absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow',
                formData.urgent ? 'right-1' : 'left-1'
              )} />
            </div>
            <div>
              <p className={cn(
                'font-medium',
                formData.urgent ? 'text-danger-700' : 'text-brand-dark'
              )}>
                Dette haster!
              </p>
              <p className="text-sm text-gray-500">
                Utstyret er kritisk for pasient/bruker
              </p>
            </div>
          </label>
        </Card>

        {/* Equipment */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Hvilket utstyr gjelder det?</h2>
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
                placeholder="Står ofte på en etikett på utstyret"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Hvor står utstyret?</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasjon</label>
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

        {/* Description */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Beskriv feilen</h2>
          </div>
          
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Hva er problemet? Beskriv så detaljert som mulig..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
          />
        </Card>

        {/* Photo upload */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Legg ved bilde (valgfritt)</h2>
          </div>
          
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-light transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Trykk for å laste opp bilde</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG. Maks 10MB</p>
          </div>
        </Card>

        {/* Submit */}
        <Button 
          onClick={handleSubmit} 
          className={cn(
            'w-full',
            formData.urgent && 'bg-danger-500 hover:bg-danger-600'
          )}
          disabled={!formData.equipmentType || !formData.location || !formData.description}
        >
          {formData.urgent ? 'Send hastemelding' : 'Send feilmelding'}
        </Button>
      </main>
    </div>
  )
}
