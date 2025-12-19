// Common types for the Academy of Pedagogical Education website

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  requirements: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  category: string;
  author?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'urgent' | 'important' | 'normal';
  link?: string;
}

export interface Teacher {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo?: string;
  specializations: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  endTime?: string;
  category: 'teachers' | 'students' | 'general';
  type: string;
  description?: string;
  location?: string;
  organizer?: string;
  maxParticipants?: number;
  registeredParticipants?: number;
  registrationDeadline?: string;
  price?: number;
  isFree?: boolean;
}

export interface QuickLink {
  title: string;
  description: string;
  icon: string;
  url: string;
}

export interface Person {
  id: string;
  name: string;
  position: string;
  photo?: string;
  email?: string;
  phone?: string;
  bio?: string;
  degree?: string;
  awards?: string[];
}

export interface Document {
  id: string;
  title: string;
  category: string;
  date: string;
  fileUrl: string;
  fileSize: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'xlsx' | 'xls' | 'ppt' | 'pptx';
  description?: string;
  author?: string;
  downloads?: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  staff?: Person[];
  contact?: {
    phone?: string;
    email?: string;
    room?: string;
  };
}

export interface TeachersEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  type: 'course' | 'webinar' | 'seminar' | 'conference';
  theme: string;
  seats?: number;
  seatsAvailable?: number;
  price?: number;
  isFree?: boolean;
  credits?: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  moderator: string;
  image?: string;
}

export interface NUSHMaterial {
  id: string;
  title: string;
  description: string;
  category: 'normative' | 'methodical' | 'manual';
  fileType: 'PDF' | 'DOC' | 'DOCX' | 'ZIP';
  fileSize: string;
  date: string;
  downloads?: number;
}

export interface Olympiad {
  id: string;
  title: string;
  subject: string;
  stage: 'school' | 'district' | 'regional' | 'national';
  startDate: string;
  endDate: string;
  registrationDeadline?: string;
  status: 'upcoming' | 'registration' | 'ongoing' | 'completed';
  description?: string;
  location?: string;
  participants?: number;
  maxParticipants?: number;
  grades?: string;
}

export interface Competition {
  id: string;
  title: string;
  shortName: string;
  description: string;
  logo?: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  ageCategories: string[];
  categories: string[];
  status: 'upcoming' | 'registration' | 'ongoing' | 'completed';
  regulationUrl?: string;
  website?: string;
  organizer: string;
  prizes?: string[];
}

export interface OlympiadTask {
  id: string;
  olympiadSubject: string;
  year: number;
  stage: string;
  fileUrl: string;
  fileSize: string;
  hasAnswers: boolean;
  answersUrl?: string;
}

export interface CompetitionResult {
  id: string;
  rank: number;
  participantName: string;
  school: string;
  grade: string;
  score: number;
  award?: 'Диплом I ступеня' | 'Диплом II ступеня' | 'Диплом III ступеня' | 'Похвальна грамота';
  region?: string;
}

export interface Instructor {
  id: string;
  name: string;
  position: string;
  photo?: string;
  bio: string;
  specialization: string;
}

export interface ProgramModule {
  id: string;
  title: string;
  hours: number;
  topics: string[];
}

export interface EducationProgram {
  id: string;
  title: string;
  category: 'qualification' | 'masters' | 'phd';
  description: string;
  duration: string;
  durationHours?: number;
  format: 'online' | 'offline' | 'hybrid';
  startDate: string;
  endDate?: string;
  price: number;
  isFree?: boolean;
  credits?: number;
  certificate?: string;
  instructors: Instructor[];
  modules: ProgramModule[];
  requirements?: string[];
  targetAudience: string[];
  schedule?: string;
  seatsTotal?: number;
  seatsAvailable?: number;
  tags?: string[];
  image?: string;
}

export interface AcademicEvent {
  id: string;
  title: string;
  date: string;
  type: 'semester-start' | 'semester-end' | 'exam' | 'holiday' | 'deadline' | 'event';
  description?: string;
  color?: string;
}

export type SearchResultType = 'page' | 'news' | 'document' | 'course' | 'event';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  breadcrumb?: string;
  date?: string;
  category?: string;
}
