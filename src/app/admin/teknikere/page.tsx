'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { technicians, partners, orders } from '@/data/mockData'
import { 
  Search, 
  Plus,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminTechniciansPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTechnicianStats = (techId: string) => {
    const techOrders = orders.filter(o => o.technicianId === techId)
    return {
      total: techOrders.length,
      completed: techOrders.filter(o => o.status === 'utfort' || o.status === 'fakturert').length,
      active: techOrders.filter(o => o.status !== 'utfort' && o.status !== 'fakturert' && o.status !== 'kansellert').length,
    }
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teknikere</h1>
          <p className="text-gray-500 mt-1">Administrer teknikere i nettverket</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Legg til tekniker
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{technicians.length}</p>
              <p className="text-sm text-gray-500">Totalt teknikere</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{technicians.length}</p>
              <p className="text-sm text-gray-500">Aktive</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-500">Utnyttelse</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-500">Snitt rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Søk etter tekniker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Kort
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Liste
            </Button>
          </div>
        </div>
      </Card>

      {/* Technicians grid */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechnicians.map((tech) => {
            const partner = partners.find(p => p.id === tech.partnerId)
            const stats = getTechnicianStats(tech.id)
            
            return (
              <Card key={tech.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={tech.name} size="lg" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                      <p className="text-sm text-gray-500">Tekniker</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{tech.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{tech.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{partner?.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Partner</span>
                    <span className="font-medium text-gray-900">{partner?.name.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-900">{stats.active}</p>
                    <p className="text-xs text-gray-500">Aktive</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-900">{stats.completed}</p>
                    <p className="text-xs text-gray-500">Fullført</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-900">4.8</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Se profil
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    Tildel ordre
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-0">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50">
                <th className="p-4 font-medium">Tekniker</th>
                <th className="p-4 font-medium hidden sm:table-cell">Kontakt</th>
                <th className="p-4 font-medium hidden md:table-cell">Partner</th>
                <th className="p-4 font-medium">Aktive</th>
                <th className="p-4 font-medium hidden lg:table-cell">Fullført</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Handlinger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTechnicians.map((tech) => {
                const partner = partners.find(p => p.id === tech.partnerId)
                const stats = getTechnicianStats(tech.id)
                
                return (
                  <tr key={tech.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={tech.name} size="md" />
                        <div>
                          <p className="font-medium text-gray-900">{tech.name}</p>
                          <p className="text-xs text-gray-500">Tekniker</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <p className="text-sm text-gray-700">{tech.email}</p>
                      <p className="text-xs text-gray-500">{tech.phone}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-700">{partner?.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-900">{stats.active}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-700">{stats.completed}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="success">Aktiv</Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
