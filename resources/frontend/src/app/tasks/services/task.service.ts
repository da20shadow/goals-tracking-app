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

  updateTask(taskId: number, changedTask: any) {
  return this.http.patch<TaskApiResponse>(ApiUrls.TASK_UPDATE+`/${taskId}`,changedTask);
  }

  saveTask(task: any) {
    return this.http.post<TaskApiResponse>(ApiUrls.TASK_ADD,task);
  }

  deleteTask(taskId: number) {
    return this.http.delete<TaskApiResponse>(ApiUrls.TASK_DELETE+`/${taskId}`);
  }
}
