import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalesDataStoreService} from './sales-data.store';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SalesDataStoreService]
})
export class AppRoutingModule { }
