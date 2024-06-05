// app.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import AppDetail from "../models/AppDetail";
import {ConfigService} from "./config.service";
import App from "../models/App";



@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private apiService: ApiService,private configService:ConfigService) {}

  getAppByOrganizationAndEnvironmentAndDeplymentId(organizationId: string, environmentId: string, deploymentId: string,): Observable<AppDetail> {
      return this.apiService.get<AppDetail>(`organizations/${organizationId}/environments/${environmentId}/deployments/${deploymentId}`);
  }
  getAppByOrganizationAndEnvironment(organizationId: string, environmentId: string, ): Observable<App> {
    return this.apiService.get<App>(`organizations/${organizationId}/environments/${environmentId}/deployments`);
  }
}
