'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { customers } from '@/data/mockData'
import { 
  Search, 
  Plus,
  Building2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Filter
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const customerTypeLabels: Record<string, string> = {
  nav: 'NAV',
  kommune: 'Kommune',
  leverandor: 'Leverandør',
  privat: 'Privat',
}

const customerTypeColors: Record<string, string> = {
  nav: 'bg-blue-100 text-blue-700',
  kommune: 'bg-brand-light/30 text-brand-dark',
  leverandor: 'bg-warning-100 text-warning-600',
  privat: 'bg-gray-100 text-gray-600',
}

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchQuery === '' ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === 'all' || customer.type === typeFilter

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Kunder</h1>
          <p className="text-gray-500 text-sm mt-1">{customers.length} registrerte kunder</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Ny kunde
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Søk etter kunde..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border-0 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 rounded-xl border-0 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">Alle typer</option>
              <option value="nav">NAV</option>
              <option value="kommune">Kommune</option>
              <option value="leverandor">Leverandør</option>
              <option value="privat">Privat</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Customer list */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} hover className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light/30 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-brand-dark truncate">{customer.name}</h3>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
                    customerTypeColors[customer.type]
                  )}>
                    {customerTypeLabels[customer.type]}
                  </span>
                </div>
                
                <div className="space-y-1.5 mt-3">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {customer.address}, {customer.postalCode} {customer.city}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Kontaktperson: <span className="font-medium text-gray-700">{customer.contactPerson}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Ingen kunder funnet</p>
          <p className="text-sm text-gray-400 mt-1">Prøv å endre søket eller filteret</p>
        </Card>
      )}
    </div>
  )
}
