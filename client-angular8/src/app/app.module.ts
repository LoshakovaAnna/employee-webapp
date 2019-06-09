import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { WorkingtimeComponent } from './workingtime/workingtime.component';

const appRoutes: Routes = [
  {path: '', component: EmployeesComponent},
  {path: 'employee/:id', component: WorkingtimeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    WorkingtimeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
