import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Job } from '../models/job';
import { ExperienceLevel } from '../models/experience-level';
import { JobType } from '../models/job-type';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  @Input() job: Job;
  jobSalary: string;

  ngOnChanges(changes: SimpleChanges) {
    this.jobSalary = this.job.getSalaryDescription();
  }
}
