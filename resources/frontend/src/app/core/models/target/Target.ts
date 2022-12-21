export interface Target {
  id: number;
  title: string;
  description: string;
  created_at: string;
  total_tasks: number;
  total_completed_tasks: number | string;
  progress: number;
  goal_id: number;
}
