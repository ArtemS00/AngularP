import { Component, Input, SimpleChanges } from '@angular/core';
import { Job } from '../../models/job';

const maxLength: number = 150;

@Component({
  selector: 'app-job',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent {
  @Input() job: Job;
  salaryDescription: string;
  salarySpecified: boolean = true;
  datePostedString: string;
  description: string;

  ngOnChanges(changes: SimpleChanges) {
    this.salaryDescription = this.job.getSalaryDescription();
    if (this.salaryDescription == null) {
      this.salarySpecified = false;
      this.salaryDescription = "Not Specified";
    }
    this.datePostedString = this.job.getDatePosted();
    this.description = this.job.getShortDescription(200);
  }
}
