export interface ProgressEntry {
  userId: string;
  contentId: string;
  type: 'course' | 'nano' | 'unit';
  status: 'not_started' | 'in_progress' | 'completed' | 'expired';
  progress: number;
  startedAt: Date;
  lastAccessed: Date;
  completedAt?: Date;
  attempts: number;
  score?: number;
}

export interface UserProgress {
  userId: string;
  overallProgress: number;
  moduleProgress: Record<string, number>;
  entries: ProgressEntry[];
  achievements: {
    id: string;
    earnedAt: Date;
    type: string;
  }[];
  statistics: {
    totalTimeSpent: number;
    averageScore: number;
    completionRate: number;
    streakDays: number;
  };
}

export interface ProgressUpdate {
  userId: string;
  contentId: string;
  progress: number;
  status: ProgressEntry['status'];
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ProgressSnapshot {
  timestamp: Date;
  userId: string;
  moduleId: string;
  metrics: {
    progress: number;
    completedItems: number;
    totalItems: number;
    timeSpent: number;
  };
} 