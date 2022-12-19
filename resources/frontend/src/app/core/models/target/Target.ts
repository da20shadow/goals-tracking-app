export interface Target {
  id: number;
  title: string;
  description: string;
  total_tasks: number;
  total_completed_tasks: number | string;
  progress: number;
}
