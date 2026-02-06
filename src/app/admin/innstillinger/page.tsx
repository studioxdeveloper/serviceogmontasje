'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Bell, 
  Shield, 
  Database,
  Mail,
  Globe,
  Save,
  ChevronRight
} from 'lucide-react'

export default function AdminSettingsPage() {
  const settingsSections = [
    {
      title: 'Generelt',
      description: 'Grunnleggende systeminnstillinger',
      icon: Globe,
      items: ['Språk', 'Tidssone', 'Datoformat']
    },
    {
      title: 'Varsler',
      description: 'E-post og push-varsler',
      icon: Bell,
      items: ['E-postvarsler', 'Push-varsler', 'Påminnelser']
    },
    {
      title: 'Sikkerhet',
      description: 'Passord og tilgang',
      icon: Shield,
      items: ['To-faktor', 'Sesjonshåndtering', 'API-nøkler']
    },
    {
      title: 'Integrasjoner',
      description: 'Koble til eksterne tjenester',
      icon: Database,
      items: ['Postmark', 'Mapbox', 'Tripletex']
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold text-brand-dark">Innstillinger</h1>
        <p className="text-gray-500 text-sm mt-1">Administrer systeminnstillinger</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <Card className="p-0 overflow-hidden">
            {settingsSections.map((section, index) => (
              <button
                key={section.title}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                  index !== settingsSections.length - 1 ? 'border-b border-gray-100' : ''
                } ${index === 0 ? 'bg-brand-bg' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  index === 0 ? 'bg-brand-light/30 text-brand' : 'bg-gray-100 text-gray-600'
                }`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-brand-dark">{section.title}</p>
                  <p className="text-xs text-gray-500">{section.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </Card>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Company info */}
          <Card>
            <CardHeader>
              <CardTitle>Firmaopplysninger</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input 
                  label="Firmanavn"
                  defaultValue="Service og Montasje AS"
                />
                <Input 
                  label="Org.nummer"
                  defaultValue="123 456 789"
                />
                <Input 
                  label="E-post"
                  type="email"
                  defaultValue="post@serviceogmontasje.no"
                />
                <Input 
                  label="Telefon"
                  defaultValue="+47 22 33 44 55"
                />
                <div className="sm:col-span-2">
                  <Input 
                    label="Adresse"
                    defaultValue="Industriveien 1, 0001 Oslo"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Lagre endringer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Varslingsinnstillinger</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Nye ordrer', description: 'Varsle når nye ordrer kommer inn', enabled: true },
                  { label: 'Statusendringer', description: 'Varsle ved endring av ordrestatus', enabled: true },
                  { label: 'Daglig oppsummering', description: 'Motta daglig e-post med oversikt', enabled: false },
                  { label: 'Ukentlig rapport', description: 'Motta ukentlig statistikk', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-brand-dark">{setting.label}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <button className={`w-12 h-7 rounded-full relative transition-colors ${
                      setting.enabled ? 'bg-brand' : 'bg-gray-200'
                    }`}>
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        setting.enabled ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Integrasjoner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Postmark', description: 'E-postvarsler', status: 'connected', icon: Mail },
                  { name: 'Mapbox', description: 'Kart og ruteplanlegging', status: 'connected', icon: Globe },
                  { name: 'Tripletex', description: 'Fakturering', status: 'not_connected', icon: Database },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <integration.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark">{integration.name}</p>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    {integration.status === 'connected' ? (
                      <span className="px-3 py-1 bg-success-100 text-success-600 rounded-full text-sm font-medium">
                        Tilkoblet
                      </span>
                    ) : (
                      <Button variant="outline" size="sm">
                        Koble til
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
