import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/ApiUrls";
import {Task, TaskApiResponse} from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTargetTasksById(targetId: number) {
    return this.http.get<Task[]>(ApiUrls.TARGET_TASKS+`/${targetId}`);
  }

  updateTask(taskId: number, changedTaskFields: any) {
  return this.http.patch<TaskApiResponse>(ApiUrls.TASK_UPDATE+`/${taskId}`,changedTaskFields);
  }

  saveTask(task: any) {
    return this.http.post<TaskApiResponse>(ApiUrls.TASK_ADD,task);
  }

  deleteTask(taskId: number) {
    return this.http.delete<TaskApiResponse>(ApiUrls.TASK_DELETE+`/${taskId}`);
  }

  getTaskById(taskId: number) {
    return this.http.get<Task>(ApiUrls.TASKS+`/${taskId}`);
  }

  getTodayTasks() {
    return this.http.get<Task[]>(ApiUrls.TASKS);
  }

  getOverdueTasks() {
    return this.http.get<Task[]>(ApiUrls.TASKS_OVERDUE);
  }

  getNextTasks() {
    return this.http.get<Task[]>(ApiUrls.TASKS_NEXT);
  }

  getUnscheduledTasks() {
    return this.http.get<Task[]>(ApiUrls.TASKS_UNSCHEDULED);
  }

  getUrgentTasks() {
    return this.http.get<Task[]>(ApiUrls.TASKS_URGENT);
  }

  getImportantTasks() {
    return this.http.get<Task[]>(ApiUrls.TASKS_IMPORTANT);
  }

  getAll() {
    return this.http.get<Task[]>(ApiUrls.TASKS_ALL);
  }

  getTasksByMonth(year: number,month: number) {
    return this.http.get<Task[]>(`${ApiUrls.TASKS_BY_MONTH}?year=${year}&month=${month}`)
  }
}
