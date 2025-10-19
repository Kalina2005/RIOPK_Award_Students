import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StipendsComponent} from "./stipends/stipends.component";

const routes: Routes = [
  {path: 'stipends', component: StipendsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StipendsRoutingModule { }
