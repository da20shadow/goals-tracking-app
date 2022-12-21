import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/ApiUrls";
import {Target, TargetApiResponse} from "../../core/models";

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(private http: HttpClient) { }

  saveTarget(target: Target) {
    return this.http.post<TargetApiResponse>(ApiUrls.TARGET_ADD,target);
  }

  getTargetById(targetId: number) {
    return this.http.get<Target>(ApiUrls.TARGET+`/${targetId}`);
  }

  updateTargetId(targetId: number, changedTarget: Target) {
    return this.http.patch<TargetApiResponse>(ApiUrls.TARGET_UPDATE+`/${targetId}`,changedTarget);
  }

  deleteTargetId(targetId: number) {
    return this.http.delete<TargetApiResponse>(ApiUrls.TARGET_DELETE+`/${targetId}`);
  }
}
