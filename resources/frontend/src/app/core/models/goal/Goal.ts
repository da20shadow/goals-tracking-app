export interface Goal {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  user_id: number;
  category: string;
  created_at: string;
  updated_at: string;
  totalTargets: number;
  progress: number;
}
