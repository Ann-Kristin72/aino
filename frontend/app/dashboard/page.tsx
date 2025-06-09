import { ContentCard } from './modules/ContentCard'
import { QualityCard } from './modules/QualityCard'
import { TeknoCard } from './modules/TeknoCard'
import { CommunicationCard } from './modules/CommunicationCard'
import { TaskCard } from './modules/TaskCard'
import { StatisticsCard } from './modules/StatisticsCard'
import { EiraCard } from './modules/EiraCard'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lederdashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ContentCard />
        <QualityCard />
        <TeknoCard />
        <CommunicationCard />
        <TaskCard />
        <StatisticsCard />
        <EiraCard />
      </div>
    </div>
  )
} 