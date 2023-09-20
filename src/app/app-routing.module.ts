import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CustomizeDashboardComponent } from './customize-dashboard/customize-dashboard.component';

const routes: Routes = [
  {path:'side-bar',component:SideBarComponent},
  {path:'customize-dashboard',component:CustomizeDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
