import { ContentCard } from './modules/ContentCard'
import { QualityCard } from './modules/QualityCard'
import { TeknoCard } from './modules/TeknoCard'
import { CommunicationCard } from './modules/CommunicationCard'
import { TaskCard } from './modules/TaskCard'
import { StatisticsCard } from './modules/StatisticsCard'
import EiraCard from '../../components/library/EiraCard'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-4">
        <EiraCard variant="neutral" />
        <div>
          <div className="text-xl font-bold">Hei, Leder!</div>
          <div className="text-gray-500">Du er innlogget som leder</div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Lederdashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ContentCard />
          <QualityCard />
          <TeknoCard />
          <CommunicationCard />
          <TaskCard />
          <StatisticsCard />
        </div>
      </div>
    </div>
  )
} 