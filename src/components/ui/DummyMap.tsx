'use client'

import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MapMarker {
  id: string
  lat: number
  lng: number
  type: 'default' | 'urgent' | 'user'
  label?: string
}

interface DummyMapProps {
  markers?: MapMarker[]
  showControls?: boolean
  showUserLocation?: boolean
  className?: string
  height?: string
  interactive?: boolean
}

export function DummyMap({ 
  markers = [], 
  showControls = true, 
  showUserLocation = true,
  className,
  height = 'h-64',
  interactive = true
}: DummyMapProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl', height, className)}>
      {/* Map background - Oslo area style */}
      <div className="absolute inset-0">
        {/* Water/fjord */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-blue-200/60" />
        
        {/* Land base */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100" />
        
        {/* Major roads */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {/* Highway */}
          <path 
            d="M0,150 Q100,120 200,150 T400,140" 
            stroke="#f59e0b" 
            strokeWidth="4" 
            fill="none"
            opacity="0.7"
          />
          {/* Main roads */}
          <path d="M50,0 L80,300" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M150,0 L180,300" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M280,0 L250,300" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M0,80 L400,100" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M0,220 L400,200" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.5" />
          
          {/* Secondary roads */}
          <path d="M100,50 L120,250" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M200,30 L220,270" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M320,20 L300,280" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>

        {/* Building blocks */}
        <div className="absolute top-[15%] left-[20%] w-8 h-6 bg-gray-300/50 rounded-sm" />
        <div className="absolute top-[25%] left-[35%] w-12 h-8 bg-gray-300/50 rounded-sm" />
        <div className="absolute top-[40%] left-[15%] w-6 h-10 bg-gray-300/50 rounded-sm" />
        <div className="absolute top-[60%] left-[45%] w-10 h-6 bg-gray-300/50 rounded-sm" />
        <div className="absolute top-[30%] left-[60%] w-8 h-8 bg-gray-300/50 rounded-sm" />
        <div className="absolute top-[70%] left-[25%] w-14 h-6 bg-gray-300/50 rounded-sm" />
        <div className="absolute top-[50%] left-[70%] w-6 h-12 bg-gray-300/50 rounded-sm" />
        
        {/* Parks/green areas */}
        <div className="absolute top-[20%] left-[50%] w-16 h-12 bg-green-300/40 rounded-full blur-sm" />
        <div className="absolute top-[65%] left-[60%] w-20 h-14 bg-green-300/40 rounded-full blur-sm" />
      </div>

      {/* Map markers */}
      {markers.map((marker, index) => (
        <div 
          key={marker.id}
          className="absolute transform -translate-x-1/2 -translate-y-full"
          style={{ 
            left: `${20 + (index * 25) % 60}%`, 
            top: `${30 + (index * 20) % 50}%` 
          }}
        >
          <div className={cn(
            'relative transition-transform',
            interactive && 'hover:scale-110 cursor-pointer'
          )}>
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center shadow-lg',
              marker.type === 'urgent' && 'bg-red-500 animate-pulse',
              marker.type === 'default' && 'bg-brand',
              marker.type === 'user' && 'bg-blue-500'
            )}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className={cn(
              'absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45',
              marker.type === 'urgent' && 'bg-red-500',
              marker.type === 'default' && 'bg-brand',
              marker.type === 'user' && 'bg-blue-500'
            )} />
            {marker.label && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-0.5 rounded text-xs font-medium shadow-sm">
                {marker.label}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* User location */}
      {showUserLocation && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg z-10 relative" />
          <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-50" />
          <div className="absolute -inset-4 bg-blue-400/20 rounded-full" />
        </div>
      )}

      {/* Map controls */}
      {showControls && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-brand hover:bg-brand-50 transition-colors">
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Attribution */}
      <div className="absolute bottom-1 left-1 text-[8px] text-gray-400 bg-white/80 px-1 rounded">
        Demo kart
      </div>
    </div>
  )
}
