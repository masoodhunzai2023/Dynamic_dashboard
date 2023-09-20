import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CardModule} from 'primeng-lts/card';   
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import {MenuModule} from 'primeng-lts/menu';
import { DropdownModule } from 'primeng-lts/dropdown';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NormalCardsComponent } from './normal-cards/normal-cards.component';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { CustomizeDashboardComponent } from './customize-dashboard/customize-dashboard.component';

import { DragDropModule } from 'primeng/dragdrop';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NormalCardsComponent,
    NavBarComponent,
    CustomizeDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToolbarModule,
    MenubarModule,
    ListboxModule,
    CommonModule,
    TableModule,
    CardModule,
    FlexLayoutModule,
    SidebarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenuModule,
    DropdownModule,
    CheckboxModule,
    TooltipModule,
    DragDropModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
