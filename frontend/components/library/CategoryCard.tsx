import { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick: () => void
}

export default function CategoryCard({ title, description, icon: Icon, color, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`${color} rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
} 