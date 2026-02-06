'use client'

import Link from 'next/link'
import { 
  Shield, 
  Building2, 
  Wrench, 
  Users,
  ChevronRight,
  ArrowRight,
  MapPin
} from 'lucide-react'

const roles = [
  {
    href: '/admin',
    title: 'Administrator',
    subtitle: 'Service og Montasje',
    description: 'Ordrehåndtering, partnerfordeling og fakturering',
    icon: Shield,
    gradient: 'from-brand-dark to-brand',
    stats: { label: 'Aktive oppdrag', value: '46' },
  },
  {
    href: '/partner',
    title: 'Firmaadmin',
    subtitle: 'Aktiv Handyman AS',
    description: 'Se tildelte oppdrag og administrer teknikere',
    icon: Building2,
    gradient: 'from-brand to-brand-light',
    stats: { label: 'Tildelte oppdrag', value: '12' },
  },
  {
    href: '/tekniker',
    title: 'Tekniker',
    subtitle: 'Ole Hansen',
    description: 'Mine oppdrag, registrering og dokumentasjon',
    icon: Wrench,
    gradient: 'from-brand-light to-brand-bg',
    textDark: true,
    stats: { label: 'I dag', value: '3' },
  },
  {
    href: '/kunde',
    title: 'Kundeportal',
    subtitle: 'Ullensaker Kommune',
    description: 'Utstyrsoversikt og servicebestilling',
    icon: Users,
    gradient: 'from-gray-600 to-gray-800',
    stats: { label: 'Utstyr', value: '156' },
  },
]

const partners = [
  { name: 'Aktiv Handyman AS', region: 'Oslo/Akershus' },
  { name: 'Elektromedisinsk Service AS', region: 'Østlandet' },
  { name: 'Helseservice AS', region: 'Vestlandet' },
  { name: 'HVH Service AS', region: 'Vestfold' },
  { name: 'Trollholmen AS', region: 'Midt-Norge' },
  { name: 'Hjelpemiddelservice', region: 'Nord-Norge' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-dark">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            {/* Logo symbol */}
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">&amp;</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-heading font-semibold tracking-tight">
                Service og Montasje
              </h1>
              <p className="text-brand-light text-sm">Prototype v1.0</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-b from-brand-dark to-brand py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-4">
            Ordre- og ettersynssystem
          </h2>
          <p className="text-brand-light text-lg max-w-2xl mx-auto">
            Digitalisert ordrehåndtering, dokumentasjon og rapportering for 
            servicenettverket i hele Norge.
          </p>
        </div>
      </section>

      {/* Role cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="group block"
            >
              <div className={`
                bg-gradient-to-br ${role.gradient} 
                rounded-2xl p-6 h-full
                transition-all duration-300
                hover:shadow-large hover:scale-[1.02]
              `}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`
                    w-12 h-12 rounded-xl 
                    ${role.textDark ? 'bg-brand-dark/10' : 'bg-white/20'} 
                    flex items-center justify-center
                  `}>
                    <role.icon className={`w-6 h-6 ${role.textDark ? 'text-brand-dark' : 'text-white'}`} />
                  </div>
                  <div className={`
                    px-3 py-1.5 rounded-full text-sm font-medium
                    ${role.textDark ? 'bg-brand-dark/10 text-brand-dark' : 'bg-white/20 text-white'}
                  `}>
                    {role.stats.value} {role.stats.label}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className={`text-xl font-heading font-semibold ${role.textDark ? 'text-brand-dark' : 'text-white'}`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm ${role.textDark ? 'text-brand-dark/70' : 'text-white/80'}`}>
                    {role.subtitle}
                  </p>
                </div>
                
                <p className={`text-sm mb-6 ${role.textDark ? 'text-brand-dark/60' : 'text-white/70'}`}>
                  {role.description}
                </p>
                
                <div className={`
                  flex items-center gap-2 text-sm font-medium
                  ${role.textDark ? 'text-brand-dark' : 'text-white'}
                  group-hover:gap-3 transition-all
                `}>
                  <span>Åpne</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Partner network */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-brand-dark">
                Servicenettverk
              </h3>
              <p className="text-gray-500 text-sm">9 partnere over hele landet</p>
            </div>
            <Link 
              href="/admin/partnere" 
              className="text-brand text-sm font-medium hover:underline flex items-center gap-1"
            >
              Se alle <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partners.map((partner) => (
              <div 
                key={partner.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-bg/50 border border-brand-light/30"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-light/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-brand-dark text-sm truncate">{partner.name}</p>
                  <p className="text-xs text-gray-500">{partner.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold">&amp;</span>
            </div>
            <span className="text-white/80 text-sm">Service og Montasje AS</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="tel:62120012" className="text-brand-light hover:text-white transition-colors">
              62 12 00 12
            </a>
            <a href="mailto:firmapost@serviceogmontasje.no" className="text-brand-light hover:text-white transition-colors">
              firmapost@serviceogmontasje.no
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
