export interface BaseMeta {
  id: string;
  title: string;
  description: string;
  version: string;
  lastUpdated: Date;
  targetRoles: string[];
  validFrom: Date;
  validUntil: Date;
  tags: string[];
}

export interface Course extends BaseMeta {
  type: 'course';
  nanoModules: string[];
  estimatedDuration: number;
  requiredCertification: boolean;
}

export interface NanoModule extends BaseMeta {
  type: 'nano';
  courseId: string;
  units: string[];
  order: number;
}

export interface Unit extends BaseMeta {
  type: 'unit';
  nanoId: string;
  contentType: 'markdown' | 'video' | 'quiz' | 'interactive';
  content: string;
  contentUrl?: string;
  order: number;
}

export interface ContentMetadata {
  courses: Course[];
  nanoModules: NanoModule[];
  units: Unit[];
  relationships: {
    prerequisites: Record<string, string[]>;
    recommendations: Record<string, string[]>;
  };
}

export interface ContentMeta {
  id: string;
  title: string;
  type: 'course' | 'nano' | 'unit' | 'procedure' | 'guide';
  module: string;
  level: string[];
  context: string[];
  tags: string[];
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'review' | 'active' | 'archived';
} 