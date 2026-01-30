import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Stack Navigator Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  MainTabs: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Tasks: undefined;
  Email: undefined;
  Calendar: undefined;
  Analytics: undefined;
  Profile: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string };
  Routines: undefined;
};

export type EmailStackParamList = {
  Inbox: undefined;
  EmailDetail: { emailId: string };
  Compose: undefined;
  Settings: undefined;
};

export type CalendarStackParamList = {
  CalendarView: undefined;
  EventDetail: { eventId: string };
  AddEvent: undefined;
};

export type AnalyticsStackParamList = {
  Overview: undefined;
  Reports: undefined;
  Insights: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  About: undefined;
};

// Screen Props
export type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type MainTabsProps = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export type DashboardScreenProps = BottomTabScreenProps<MainTabParamList, 'Dashboard'>;
export type TasksScreenProps = BottomTabScreenProps<MainTabParamList, 'Tasks'>;
export type EmailScreenProps = BottomTabScreenProps<MainTabParamList, 'Email'>;
export type CalendarScreenProps = BottomTabScreenProps<MainTabParamList, 'Calendar'>;
export type AnalyticsScreenProps = BottomTabScreenProps<MainTabParamList, 'Analytics'>;
export type ProfileScreenProps = BottomTabScreenProps<MainTabParamList, 'Profile'>;

export type TaskListScreenProps = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;
export type AddTaskScreenProps = NativeStackScreenProps<TaskStackParamList, 'AddTask'>;
export type TaskDetailScreenProps = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;
export type RoutinesScreenProps = NativeStackScreenProps<TaskStackParamList, 'Routines'>;

export type InboxScreenProps = NativeStackScreenProps<EmailStackParamList, 'Inbox'>;
export type EmailDetailScreenProps = NativeStackScreenProps<EmailStackParamList, 'EmailDetail'>;
export type ComposeScreenProps = NativeStackScreenProps<EmailStackParamList, 'Compose'>;
export type EmailSettingsScreenProps = NativeStackScreenProps<EmailStackParamList, 'Settings'>;

export type CalendarViewScreenProps = NativeStackScreenProps<CalendarStackParamList, 'CalendarView'>;
export type EventDetailScreenProps = NativeStackScreenProps<CalendarStackParamList, 'EventDetail'>;
export type AddEventScreenProps = NativeStackScreenProps<CalendarStackParamList, 'AddEvent'>;

export type OverviewScreenProps = NativeStackScreenProps<AnalyticsStackParamList, 'Overview'>;
export type ReportsScreenProps = NativeStackScreenProps<AnalyticsStackParamList, 'Reports'>;
export type InsightsScreenProps = NativeStackScreenProps<AnalyticsStackParamList, 'Insights'>;

export type ProfileScreenDetailProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;
export type SettingsScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;
export type AboutScreenProps = NativeStackScreenProps<ProfileStackParamList, 'About'>;

// Task related types
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category?: string;
  estimatedTime?: string;
  createdAt?: string;
}

export interface Routine {
  id: string;
  title: string;
  description: string;
  time: string;
  frequency: string;
  isActive: boolean;
  icon: string;
}

// Email related types
export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  to: string;
  subject: string;
  body: string;
  summary?: string;
  date: string;
  isRead: boolean;
  isImportant: boolean;
  category?: 'primary' | 'social' | 'promotions' | 'updates';
}

export interface EmailAccount {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'yahoo' | 'imap';
  isConnected: boolean;
  lastSync?: string;
}

// Calendar related types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  isAllDay: boolean;
  category?: 'work' | 'personal' | 'health' | 'other';
  attendees?: string[];
}

// Analytics types
export interface AnalyticsData {
  tasksCompleted: number;
  tasksPending: number;
  emailsProcessed: number;
  productivityScore: number;
  weeklyProgress: number[];
  monthlyTrends: number[];
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  subscription: 'free' | 'premium';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  emailSync: boolean;
  calendarSync: boolean;
  language: string;
  timezone: string;
}

// Form related types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface EmailAccountFormData {
  email: string;
  password: string;
  provider: 'gmail' | 'outlook' | 'yahoo' | 'imap';
}

// Validation error types
export interface FormErrors {
  [key: string]: string | undefined;
}

// API response types (for future use)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// OpenAI types
export interface EmailSummaryRequest {
  emails: Email[];
  userId: string;
}

export interface EmailSummaryResponse {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  priorityEmails: Email[];
}

// Component prop types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
}

export interface InputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  shadow?: boolean;
  padding?: number;
}

export interface TaskCardProps {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
  onPress: () => void;
}

export interface EmailCardProps {
  email: Email;
  onPress: () => void;
  onSwipe?: () => void;
}

export interface EventCardProps {
  event: CalendarEvent;
  onPress: () => void;
}

// Navigation types
export type NavigationProp<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>['navigation'];

export type RouteProp<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>['route'];
