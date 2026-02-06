'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { orders, statusLabels } from '@/data/mockData'
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  MapPin,
  User,
  Filter,
  Building2
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const DAYS = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']
const MONTHS = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

export default function PartnerCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)) // February 2026
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-02-03')
  
  // Filter orders for this partner (Aktiv Handyman, partnerId: '2')
  const partnerOrders = orders.filter(o => o.partnerId === '2')
  
  // Get days in month
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDayOfWeek = (firstDay.getDay() + 6) % 7 // Monday = 0
  
  // Generate calendar days
  const calendarDays: (number | null)[] = []
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }
  
  // Get orders for a specific date
  const getOrdersForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return partnerOrders.filter(o => o.scheduledDate === dateStr)
  }
  
  // Get orders for selected date
  const selectedOrders = selectedDate 
    ? partnerOrders.filter(o => o.scheduledDate === selectedDate)
    : []

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Kalender</h1>
          <p className="text-gray-500 text-sm mt-1">Planlagte oppdrag og frister</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nytt oppdrag
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 p-6">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-heading font-semibold text-brand-dark">
              {MONTHS[month]} {year}
            </h2>
            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-24" />
              }
              
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const dayOrders = getOrdersForDate(day)
              const isSelected = selectedDate === dateStr
              const isToday = dateStr === '2026-02-03'
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    'h-24 p-2 rounded-xl text-left transition-all border',
                    isSelected 
                      ? 'bg-brand-bg border-brand' 
                      : 'bg-white border-gray-100 hover:border-brand-light',
                    isToday && !isSelected && 'border-brand-light'
                  )}
                >
                  <div className={cn(
                    'text-sm font-medium mb-1',
                    isToday ? 'text-brand' : 'text-gray-700'
                  )}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayOrders.slice(0, 2).map((order) => (
                      <div 
                        key={order.id}
                        className={cn(
                          'text-xs px-1.5 py-0.5 rounded truncate',
                          order.isFromSM ? 'bg-blue-100 text-blue-700' :
                          order.priority === 'haster' ? 'bg-danger-100 text-danger-700' :
                          order.status === 'paabegynt' ? 'bg-brand-light/30 text-brand-dark' :
                          'bg-gray-100 text-gray-600'
                        )}
                      >
                        {order.isFromSM && '● '}{order.customerName.split(' ')[0]}
                      </div>
                    ))}
                    {dayOrders.length > 2 && (
                      <div className="text-xs text-gray-400 px-1.5">
                        +{dayOrders.length - 2} flere
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Selected date details */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-semibold text-brand-dark">
              {selectedDate 
                ? new Date(selectedDate).toLocaleDateString('nb-NO', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })
                : 'Velg en dato'
              }
            </h2>
          </div>

          {selectedOrders.length > 0 ? (
            <div>
              {selectedOrders.map((order) => (
                <Link 
                  key={order.id}
                  href={`/partner/ordrer/${order.id}`}
                  className="block p-4 bg-gray-50 rounded-xl hover:bg-brand-bg transition-colors mb-2"
                >
                  {order.isFromSM && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Building2 className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600">Fra Service og Montasje</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-medium text-brand-dark text-sm">{order.customerName}</p>
                    <span className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      order.status === 'uaapnet' && 'bg-gray-100 text-gray-700',
                      order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                      order.priority === 'haster' && 'bg-danger-100 text-danger-600',
                    )}>
                      {order.priority === 'haster' ? 'Haster' : statusLabels[order.status]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{order.equipmentType}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {order.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {order.technicianName || 'Ikke tildelt'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Ingen oppdrag denne dagen</p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-2">Fargeforklaring</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-100" />
                <span className="text-xs text-gray-600">Fra Service og Montasje</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-danger-100" />
                <span className="text-xs text-gray-600">Haster</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-100" />
                <span className="text-xs text-gray-600">Egne ordrer</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
