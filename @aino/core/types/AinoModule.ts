export type ModuleId = 'learning' | 'quality' | 'techno' | 'tasks' | 'chat';

export interface ModuleAlert {
  type: 'info' | 'warning' | 'error';
  message: string;
  contentId?: string;
}

export interface AinoModule {
  id: ModuleId;
  title: string;
  description: string;
  color: string;
  icon: string;
  progress: number;
  alerts: ModuleAlert[];
  isEnabled: boolean;
  requiredRoles: string[];
}

export interface ModuleState {
  progress: number;
  lastAccessed: Date;
  completedItems: string[];
  activeItems: string[];
}

export interface DashboardModule extends AinoModule {
  state: ModuleState;
  eiraSprite: string;
  indicators: Array<{
    type: 'progress' | 'alert' | 'notification';
    value: number;
  }>;
} 