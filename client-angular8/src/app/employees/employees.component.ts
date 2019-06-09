import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../shared/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private  employeesService: EmployeesService) {
    employeesService.getAllEmployees();

    setTimeout(function run() {
      employeesService.getAllEmployees();
      setTimeout(run, 60000);
    }, 5000);
  }

  ngOnInit() {
  }

}
