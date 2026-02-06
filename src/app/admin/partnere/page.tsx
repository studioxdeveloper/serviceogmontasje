'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { partners } from '@/data/mockData'
import { 
  Building2, 
  MapPin,
  Phone,
  Mail,
  Plus,
  Send,
  ExternalLink,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminPartnersPage() {
  // Filter out Service og Montasje (id: '1') - we only show external partners
  const externalPartners = partners.filter(p => p.id !== '1')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Partnere</h1>
          <p className="text-gray-500 text-sm mt-1">Samarbeidspartnere i nettverket</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Legg til partner
        </Button>
      </div>

      {/* Info card */}
      <Card className="p-5 bg-brand-bg border-brand-light/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-light/30 flex items-center justify-center flex-shrink-0">
            <Send className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h3 className="font-medium text-brand-dark mb-1">Ordrefordeling til partnere</h3>
            <p className="text-sm text-gray-600">
              Du kan sende oppdrag til partnere direkte fra ordrevisningen. 
              Partnerne er selvstendige bedrifter med egne systemer - du har ikke innsyn i deres interne drift.
            </p>
          </div>
        </div>
      </Card>

      {/* Partners grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {externalPartners.map((partner) => (
          <Card key={partner.id} hover className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-brand-dark">{partner.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {partner.region}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <a 
                href={`mailto:${partner.email || 'kontakt@partner.no'}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{partner.email || 'kontakt@partner.no'}</span>
              </a>
              <a 
                href={`tel:${partner.phone || '+4722334455'}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{partner.phone || '+47 22 33 44 55'}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Send className="w-4 h-4 mr-1" />
                Send oppdrag
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {externalPartners.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Ingen partnere registrert</p>
          <p className="text-sm text-gray-400 mt-1">Legg til partnere for å kunne sende oppdrag</p>
        </Card>
      )}
    </div>
  )
}
