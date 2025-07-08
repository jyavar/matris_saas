import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white shadow-md rounded-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}