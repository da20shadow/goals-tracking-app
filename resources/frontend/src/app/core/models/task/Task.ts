import {TaskStatus} from "./TaskStatus";
import {TaskPriority} from "./TaskPriority";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus|string;
  priority: TaskPriority|string;
  target_id: number;
  user_id: number;
  start_date: string|null;
  end_date: string|null;
  created_at: string;
  updated_at: string;
}
