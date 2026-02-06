'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Building2, 
  Bell, 
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Database,
  ChevronRight
} from 'lucide-react'

export default function PartnerSettingsPage() {
  const settingsSections = [
    {
      title: 'Generelt',
      description: 'Firmaopplysninger',
      icon: Globe,
    },
    {
      title: 'Varsler',
      description: 'E-post og push-varsler',
      icon: Bell,
    },
    {
      title: 'Integrasjoner',
      description: 'Koble til tjenester',
      icon: Database,
    },
  ]

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold text-brand-dark">Innstillinger</h1>
        <p className="text-gray-500 text-sm mt-1">Administrer firmaopplysninger og varsler</p>
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
        <div className="lg:col-span-2 space-y-6">
          {/* Company info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand" />
                <CardTitle>Firmaopplysninger</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input 
                  label="Firmanavn"
                  defaultValue="Aktiv Handyman AS"
                />
                <Input 
                  label="Org.nummer"
                  defaultValue="987 654 321"
                />
                <Input 
                  label="E-post"
                  type="email"
                  defaultValue="post@aktivhandyman.no"
                />
                <Input 
                  label="Telefon"
                  defaultValue="+47 22 33 44 55"
                />
                <div className="sm:col-span-2">
                  <Input 
                    label="Adresse"
                    defaultValue="Industriveien 10, 0580 Oslo"
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
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand" />
                <CardTitle>Varslingsinnstillinger</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Nye ordrer fra S&M', description: 'Varsle når nye ordrer tildeles fra Service og Montasje', enabled: true },
                  { label: 'Nye ordrer fra NAV', description: 'Varsle ved direktebestillinger fra NAV', enabled: true },
                  { label: 'Nettverksvarsler', description: 'Motta kunngjøringer fra Service og Montasje', enabled: true },
                  { label: 'Statusendringer', description: 'Varsle ved endring av ordrestatus', enabled: false },
                  { label: 'Daglig oppsummering', description: 'Motta daglig e-post med oversikt', enabled: true },
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
        </div>
      </div>
    </div>
  )
}
