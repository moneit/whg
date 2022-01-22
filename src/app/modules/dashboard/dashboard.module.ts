import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {GameService} from "@app/services/game.service";
import { GameCardComponent } from './components/game-card/game-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    GameCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    GameService
  ]
})
export class DashboardModule { }
