'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { orders, statusLabels } from '@/data/mockData'
import { 
  Download, 
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  Filter,
  TrendingUp,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PartnerBillingPage() {
  // Filter orders for this partner (Aktiv Handyman, partnerId: '2')
  const partnerOrders = orders.filter(o => o.partnerId === '2')
  
  // Filter orders that are completed and ready for billing
  const completedOrders = partnerOrders.filter(o => o.status === 'utfort')
  const billedOrders = partnerOrders.filter(o => o.status === 'fakturert')
  const ordersFromSM = completedOrders.filter(o => o.isFromSM)
  
  // Calculate totals
  const totalHours = completedOrders.reduce((sum, o) => sum + (o.hours || 0), 0)
  const totalKm = completedOrders.reduce((sum, o) => sum + (o.kilometers || 0), 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Fakturering</h1>
          <p className="text-gray-500 text-sm mt-1">Fakturagrunnlag og eksport</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer periode
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Eksporter til Excel
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-light/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{completedOrders.length}</p>
              <p className="text-sm text-gray-500">Klar for fakturering</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{ordersFromSM.length}</p>
              <p className="text-sm text-gray-500">Fra S&M</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-warning-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning-500" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{totalHours}</p>
              <p className="text-sm text-gray-500">Timer totalt</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{totalKm}</p>
              <p className="text-sm text-gray-500">Kilometer totalt</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Billing table */}
      <Card className="overflow-hidden p-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-heading font-semibold text-brand-dark">Fakturagrunnlag</h2>
          <p className="text-sm text-gray-500 mt-1">Oppdrag klare for fakturering</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kilde</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kunde</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Referanse</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timer</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Km</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {completedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {order.isFromSM ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <Building2 className="w-3 h-3" />
                        S&M
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Egen
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-brand-dark text-sm">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.equipmentType}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-mono">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-gray-700">{order.hours || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-gray-700">{order.kilometers || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-success-100 text-success-600">
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {completedOrders.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Ingen oppdrag klare for fakturering</p>
            <p className="text-sm text-gray-400 mt-1">Fullførte oppdrag vil vises her</p>
          </div>
        )}
      </Card>

      {/* Export options */}
      <Card className="p-6">
        <h2 className="font-heading font-semibold text-brand-dark mb-4">Eksportvalg</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-brand-bg transition-colors text-left">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-brand-dark">Excel (.xlsx)</p>
              <p className="text-xs text-gray-500">Eksporter til regneark</p>
            </div>
          </button>
          
          <button className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-brand-bg transition-colors text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-brand-dark">Tripletex</p>
              <p className="text-xs text-gray-500">Eksporter til regnskap</p>
            </div>
          </button>
          
          <button className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-brand-bg transition-colors text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-brand-dark">PowerOffice</p>
              <p className="text-xs text-gray-500">Eksporter til regnskap</p>
            </div>
          </button>
        </div>
      </Card>
    </div>
  )
}
