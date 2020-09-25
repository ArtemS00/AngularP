import { Component, Input, SimpleChanges } from '@angular/core';
import { Job } from '../../models/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent {
  @Input() job: Job;
  salaryDescription: string;
  salarySpecified: boolean = true;
  datePostedString: string;
  description: string;

  constructor(private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.salaryDescription = this.job.getSalaryDescription();
    if (this.salaryDescription == null) {
      this.salarySpecified = false;
      this.salaryDescription = "Not Specified";
    }
    this.datePostedString = this.job.getDatePosted();
  }

  open() {
    this.router.navigate([`job/${this.job.id}`]);
  }

  openOnNewTab() {
    window.open(this.router.url.replace("jobs", `job/${this.job.id}`));
  }
}
