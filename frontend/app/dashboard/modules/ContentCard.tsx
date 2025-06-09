import { BaseCard } from './BaseCard'
import Link from 'next/link'

export function ContentCard() {
  return (
    <Link href="/dashboard/bibliotek">
      <BaseCard 
        title="Innhold og læring"
        bgColor="bg-blue-50"
      />
    </Link>
  )
} 