import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface EventRecord {
  EmployeeID: number;
  EventDescriptionID: number;
  EventDate: any;
  EventDescription: string;
  FIO: string;
}

@Injectable({providedIn: 'root'})

export class EmployeesService {

  constructor(private  http: HttpClient) {
  }

  public ListEmployees: EventRecord[] = [];

  public getAllEmployees() {
    this.http.get('http://localhost:3010/api/employees')
      .subscribe((responce: EventRecord[]) =>  {
      this.ListEmployees = responce;
      });
  }
}
