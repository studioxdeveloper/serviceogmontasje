'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getOrdersVisibleToSM, orders, partners, statusLabels, isOverdue } from '@/data/mockData'
import { 
  ClipboardList, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  ChevronRight,
  Plus,
  Bell,
  TrendingUp,
  MapPin,
  Calendar,
  FileText,
  ArrowUpRight
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const visibleOrders = getOrdersVisibleToSM()
  
  // Calculate stats
  const stats = {
    uaapnet: visibleOrders.filter(o => o.status === 'uaapnet').length,
    paabegynt: visibleOrders.filter(o => o.status === 'paabegynt').length,
    deler: visibleOrders.filter(o => o.status === 'deler').length,
    utfort: visibleOrders.filter(o => o.status === 'utfort').length,
    total: visibleOrders.length,
    overdue: visibleOrders.filter(o => isOverdue(o)).length,
  }

  const overdueOrders = visibleOrders.filter(o => isOverdue(o))
  const recentOrders = [...visibleOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Status chart data (simplified visual)
  const chartData = [
    { label: 'Uåpnet', value: stats.uaapnet, color: 'bg-gray-400' },
    { label: 'Påbegynt', value: stats.paabegynt, color: 'bg-brand-light' },
    { label: 'Venter deler', value: stats.deler, color: 'bg-warning-400' },
    { label: 'Utført', value: stats.utfort, color: 'bg-success-500' },
  ]
  const maxValue = Math.max(...chartData.map(d => d.value), 1)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Oversikt</h1>
          <p className="text-gray-500 text-sm mt-1">Tirsdag 3. februar 2026</p>
        </div>
        <Link href="/admin/ordrer/ny">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nytt oppdrag
          </Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{stats.uaapnet}</p>
              <p className="text-sm text-gray-500">Uåpnet</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-light/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{stats.paabegynt}</p>
              <p className="text-sm text-gray-500">Påbegynt</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-success-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-brand-dark">{stats.utfort}</p>
              <p className="text-sm text-gray-500">Utført</p>
            </div>
          </div>
        </Card>

        <Card className={`p-5 ${stats.overdue > 0 ? 'bg-danger-50 border-danger-100' : ''}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stats.overdue > 0 ? 'bg-danger-100' : 'bg-gray-100'}`}>
              <AlertTriangle className={`w-5 h-5 ${stats.overdue > 0 ? 'text-danger-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className={`text-2xl font-semibold ${stats.overdue > 0 ? 'text-danger-600' : 'text-brand-dark'}`}>
                {stats.overdue}
              </p>
              <p className="text-sm text-gray-500">Forfalt</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Status chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-brand-dark">Statusfordeling</h2>
            <span className="text-sm text-gray-500">{stats.total} totalt</span>
          </div>
          
          <div className="space-y-4">
            {chartData.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-600">{item.label}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-lg transition-all duration-500`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-medium text-gray-700 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Announcements */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">Kunngjøringer</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-brand-bg rounded-lg">
              <p className="text-sm font-medium text-brand-dark">Ny avtale med Mediq AS</p>
              <p className="text-xs text-gray-500 mt-1">Oppdaterte priser fra 1. mars 2026</p>
            </div>
            <div className="p-3 bg-warning-50 rounded-lg">
              <p className="text-sm font-medium text-warning-600">Prisjustering NAV</p>
              <p className="text-xs text-gray-500 mt-1">KPI-justering trer i kraft 15. mars</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Påske 2026</p>
              <p className="text-xs text-gray-500 mt-1">Husk å planlegge fravær</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Orders and deadlines row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-brand-dark">Siste oppdrag</h2>
            <Link href="/admin/ordrer" className="text-sm text-brand font-medium hover:underline flex items-center gap-1">
              Se alle <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-5">
            {recentOrders.map((order) => (
              <Link 
                key={order.id}
                href={`/admin/ordrer/${order.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-bg transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-light/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-dark text-sm truncate">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {order.orderNumber} • {order.partnerName}
                  </p>
                </div>
                <span className={`
                  px-2.5 py-1 rounded-full text-xs font-medium
                  ${order.status === 'uaapnet' ? 'bg-gray-100 text-gray-700' : ''}
                  ${order.status === 'paabegynt' ? 'bg-brand-light/30 text-brand-dark' : ''}
                  ${order.status === 'deler' ? 'bg-warning-100 text-warning-600' : ''}
                  ${order.status === 'utfort' ? 'bg-success-100 text-success-600' : ''}
                `}>
                  {statusLabels[order.status]}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-brand transition-colors" />
              </Link>
            ))}
          </div>
        </Card>

        {/* Overdue orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning-400" />
              <h2 className="font-heading font-semibold text-brand-dark">Forfalte frister</h2>
            </div>
            {overdueOrders.length > 0 && (
              <span className="px-2 py-0.5 bg-danger-100 text-danger-600 text-xs font-medium rounded-full">
                {overdueOrders.length} oppdrag
              </span>
            )}
          </div>
          
          {overdueOrders.length > 0 ? (
            <div className="space-y-5">
              {overdueOrders.slice(0, 4).map((order) => (
                <Link 
                  key={order.id}
                  href={`/admin/ordrer/${order.id}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-danger-50 hover:bg-danger-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-danger-700 text-sm truncate">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-danger-600/70">
                      Frist: {order.deadline ? new Date(order.deadline).toLocaleDateString('nb-NO') : 'Ikke satt'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-danger-400" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Ingen forfalte frister</p>
              <p className="text-sm text-gray-400 mt-1">Alle oppdrag er innenfor frist</p>
            </div>
          )}
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/ordrer" className="group">
          <Card className="p-5 hover:border-brand-light transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light/20 flex items-center justify-center group-hover:bg-brand-light/40 transition-colors">
                <ClipboardList className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-medium text-brand-dark text-sm">Alle oppdrag</p>
                <p className="text-xs text-gray-500">{stats.total} totalt</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/kalender" className="group">
          <Card className="p-5 hover:border-brand-light transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light/20 flex items-center justify-center group-hover:bg-brand-light/40 transition-colors">
                <Calendar className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-medium text-brand-dark text-sm">Kalender</p>
                <p className="text-xs text-gray-500">Planlegging</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/partnere" className="group">
          <Card className="p-5 hover:border-brand-light transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light/20 flex items-center justify-center group-hover:bg-brand-light/40 transition-colors">
                <MapPin className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-medium text-brand-dark text-sm">Partnere</p>
                <p className="text-xs text-gray-500">{partners.length - 1} firmaer</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/fakturering" className="group">
          <Card className="p-5 hover:border-brand-light transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light/20 flex items-center justify-center group-hover:bg-brand-light/40 transition-colors">
                <TrendingUp className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-medium text-brand-dark text-sm">Fakturering</p>
                <p className="text-xs text-gray-500">Eksport</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
