'use client'

import { ReactNode } from 'react'
import { useInView } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView()

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isInView 
          ? 'opacity-100 translate-y-0 translate-x-0' 
          : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}