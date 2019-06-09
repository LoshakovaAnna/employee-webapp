import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

export interface WorkingInfo {
  workingTimeList: any[];
  workingHours: string;
}

@Injectable({providedIn: 'root'})
export class WorkingtimeService {

  constructor(private  http: HttpClient) {
  }

  idEmployee: any;
  date: any ;
  workingTime: any  = null;
  currentDayListTime: any;
  emplInfo: any;

  getEmployeeInfo() {
    this.http.post('http://localhost:3010/api/employee/info', {idEmployee: this.idEmployee})
      .subscribe((responce) => {
          this.emplInfo = responce;
        }
      );

    this.date = moment(new Date()).format('YYYY-MM-DD');
  }

  clearWorkingData() {
    this.currentDayListTime = [];
    this.workingTime = null;
  }

  getTimeWork() {
    this.http.post('http://localhost:3010/api/date', {date: this.date, idEmployee: this.idEmployee})
      .subscribe((responce: WorkingInfo) => {
          this.currentDayListTime  = responce.workingTimeList;
          this.workingTime = responce.workingHours;
        }
      );
  }
}



