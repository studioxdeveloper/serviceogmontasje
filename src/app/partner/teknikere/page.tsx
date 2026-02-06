'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { technicians, orders, getOrdersForPartner } from '@/data/mockData'
import { 
  Plus,
  Mail,
  Phone,
  ClipboardList,
  CheckCircle
} from 'lucide-react'

const PARTNER_ID = '2'

export default function PartnerTechniciansPage() {
  const partnerTechnicians = technicians.filter(t => t.partnerId === PARTNER_ID)
  const partnerOrders = getOrdersForPartner(PARTNER_ID)

  const getTechnicianStats = (techId: string) => {
    const techOrders = partnerOrders.filter(o => o.technicianId === techId)
    return {
      active: techOrders.filter(o => o.status !== 'completed').length,
      completed: techOrders.filter(o => o.status === 'completed').length,
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teknikere</h1>
          <p className="text-gray-500 mt-1">Våre teknikere hos Aktiv Handyman AS</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Legg til tekniker
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partnerTechnicians.map((tech) => {
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
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
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
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-4 border-t border-gray-100">
                <div className="bg-emerald-50 rounded-lg py-2">
                  <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.active}</p>
                  <p className="text-xs text-gray-500">Aktive</p>
                </div>
                <div className="bg-green-50 rounded-lg py-2">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.completed}</p>
                  <p className="text-xs text-gray-500">Fullført</p>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Se detaljer
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
