import { Component, OnInit } from '@angular/core';
import { WorkingtimeService} from '../shared/workingtime.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workingtime',
  templateUrl: './workingtime.component.html',
  styleUrls: ['./workingtime.component.css']
})
export class WorkingtimeComponent implements OnInit {

  constructor(private workingtimeService: WorkingtimeService,  private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.workingtimeService.idEmployee = this.route.snapshot.params.id;
    this.workingtimeService.getEmployeeInfo();
  }

}
