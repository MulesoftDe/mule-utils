import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AppService} from "../services/app.service";
import AppDetail from "../models/AppDetail";
import {lastValueFrom, Subscription} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

interface EnvirennementOption {
  organizationId: string,
  environmentId: string,
  label: string,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CommonModule,
    RouterOutlet,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mule-Utils';
  detail: AppDetail[] = [];
  selectedEnvironment!: EnvirennementOption;
  envirennementOptions: EnvirennementOption[] = [{
    organizationId: 'e4899eda-22c9-4546-8ad2-ffde5a3d466d',
    environmentId: 'e4899eda-22c9-4546-8ad2-ffde5a3d466d',
    label: 'Env 1'
  }, {
    organizationId: '222222222222222222222222222222222',
    environmentId: '222222222222222233330000000000000',
    label: 'Env 2'
  }]
  subscription = new Subscription();

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.selectedEnvironment = this.envirennementOptions[0]; // Sélectionnez l'environnement par défaut
    this.loadData(this.selectedEnvironment.organizationId, this.selectedEnvironment.environmentId);
  }

  refreshData() {
    if (this.selectedEnvironment) {
      this.loadData(this.selectedEnvironment.organizationId, this.selectedEnvironment.environmentId);
    }
  }


  loadData(organizationId: string, environmentId: string) {
    this.subscription.add(
      this.appService.getAppByOrganizationAndEnvironment(organizationId, environmentId).subscribe((apps) => {
        this.detail = []; // Réinitialiser la liste des détails
        apps.items.forEach((app) => {
          lastValueFrom(this.appService.getAppByOrganizationAndEnvironmentAndDeplymentId(organizationId, environmentId, app.id)).then((appDetail) => {
            this.detail.push(appDetail);
          });
        });
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
