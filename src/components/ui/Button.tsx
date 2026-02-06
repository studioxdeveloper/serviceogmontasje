'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Variants
          variant === 'primary' && [
            'bg-brand text-white',
            'hover:bg-brand-dark',
            'focus:ring-brand/30',
            'shadow-sm hover:shadow-md',
          ],
          variant === 'secondary' && [
            'bg-brand-light/30 text-brand-dark',
            'hover:bg-brand-light/50',
            'focus:ring-brand-light',
          ],
          variant === 'outline' && [
            'border-2 border-gray-200 text-gray-700 bg-white',
            'hover:border-brand-light hover:bg-brand-bg',
            'focus:ring-brand-light',
          ],
          variant === 'ghost' && [
            'text-gray-600 bg-transparent',
            'hover:bg-gray-100',
            'focus:ring-gray-200',
          ],
          variant === 'danger' && [
            'bg-danger-500 text-white',
            'hover:bg-danger-600',
            'focus:ring-danger-500/30',
          ],
          
          // Sizes
          size === 'sm' && 'text-sm px-3 py-1.5 gap-1.5',
          size === 'md' && 'text-sm px-4 py-2.5 gap-2',
          size === 'lg' && 'text-base px-6 py-3 gap-2',
          
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
