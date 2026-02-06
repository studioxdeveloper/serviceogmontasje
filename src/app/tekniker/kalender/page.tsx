'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { orders, statusLabels } from '@/data/mockData'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const DAYS = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']
const MONTHS = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

export default function TechnicianCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)) // February 2026
  const [selectedDate, setSelectedDate] = useState<string>('2026-02-03')
  
  // Filter orders for technician (Ole Hansen, id: '1')
  const technicianOrders = orders.filter(o => o.technicianId === '1')
  
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
    return technicianOrders.filter(o => o.scheduledDate === dateStr)
  }
  
  // Get orders for selected date
  const selectedOrders = selectedDate 
    ? technicianOrders.filter(o => o.scheduledDate === selectedDate)
    : []

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="px-4 py-6 space-y-6 animate-fade-in pb-20">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-brand-dark">Kalender</h1>
        <span className="text-sm text-gray-500">
          {MONTHS[month]} {year}
        </span>
      </div>

      {/* Calendar Card */}
      <Card className="p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-base font-semibold text-brand-dark">
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
            <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="h-12" />
            }
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const dayOrders = getOrdersForDate(day)
            const isSelected = selectedDate === dateStr
            const isToday = dateStr === '2026-02-03'
            const hasUrgent = dayOrders.some(o => o.priority === 'haster')
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(dateStr)}
                className={cn(
                  'h-12 rounded-xl flex flex-col items-center justify-center transition-all relative',
                  isSelected 
                    ? 'bg-brand text-white' 
                    : isToday 
                      ? 'bg-brand-bg text-brand-dark'
                      : 'hover:bg-gray-50 text-gray-700'
                )}
              >
                <span className={cn(
                  'text-sm font-medium',
                  isSelected && 'text-white'
                )}>
                  {day}
                </span>
                {dayOrders.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {hasUrgent ? (
                      <div className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        isSelected ? 'bg-white' : 'bg-danger-500'
                      )} />
                    ) : (
                      <div className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        isSelected ? 'bg-white' : 'bg-brand-light'
                      )} />
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </Card>

      {/* Selected date header */}
      <div className="flex items-center gap-2 pt-2">
        <CalendarIcon className="w-5 h-5 text-brand" />
        <h2 className="font-semibold text-brand-dark">
          {selectedDate 
            ? new Date(selectedDate).toLocaleDateString('nb-NO', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })
            : 'Velg en dato'
          }
        </h2>
        {selectedOrders.length > 0 && (
          <span className="ml-auto text-sm text-gray-500">
            {selectedOrders.length} oppdrag
          </span>
        )}
      </div>

      {/* Orders for selected date */}
      {selectedOrders.length > 0 ? (
        <div className="space-y-6">
          {selectedOrders.map((order) => (
            <Link 
              key={order.id}
              href={`/tekniker/oppdrag/${order.id}`}
            >
              <Card hover className="p-4">
                <div className="flex items-start gap-3">
                  {order.priority === 'haster' && (
                    <div className="w-10 h-10 rounded-xl bg-danger-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-danger-500" />
                    </div>
                  )}
                  {order.priority !== 'haster' && (
                    <div className="w-10 h-10 rounded-xl bg-brand-light/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-brand" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-brand-dark truncate">{order.customerName}</p>
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
                        order.priority === 'haster' && 'bg-danger-100 text-danger-600',
                        order.status === 'uaapnet' && order.priority !== 'haster' && 'bg-gray-100 text-gray-600',
                        order.status === 'paabegynt' && 'bg-brand-light/30 text-brand-dark',
                        order.status === 'deler' && 'bg-warning-100 text-warning-600',
                        order.status === 'utfort' && 'bg-success-100 text-success-600',
                      )}>
                        {order.priority === 'haster' ? 'Haster' : statusLabels[order.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{order.equipmentType} - {order.equipmentBrand}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {order.address}, {order.city}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <CalendarIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Ingen oppdrag</p>
          <p className="text-sm text-gray-400 mt-1">Du har ingen planlagte oppdrag denne dagen</p>
        </Card>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-light" />
          <span className="text-xs text-gray-500">Oppdrag</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-danger-500" />
          <span className="text-xs text-gray-500">Haster</span>
        </div>
      </div>
    </div>
  )
}
