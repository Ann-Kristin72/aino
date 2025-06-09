import { ReactNode } from 'react'

interface BaseCardProps {
  title: string
  children?: ReactNode
  bgColor?: string
}

export function BaseCard({ title, children, bgColor = 'bg-white' }: BaseCardProps) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  )
} 