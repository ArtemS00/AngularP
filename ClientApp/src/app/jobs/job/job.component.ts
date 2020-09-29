import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job-service';
import { Job } from '../../models/job';
import { JobType } from '../../models/job-type';
import { AuthService } from '../../services/auth-service';
import { Role } from '../../models/role';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  job: Job;
  jobTypeDesc: string;
  constructor(route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    router: Router)
  {
    let id = route.snapshot.params['id'];
    jobService.get(id).subscribe(result => {
      this.job = result;
      if (!this.job)
        router.navigate(['']);
      this.jobTypeDesc = Job.getJobTypeDescription(this.job.jobType);
    },
      error => {
        router.navigate(['']);
      })
  }

  apply() {
    if (!this.authService.isAuthenticatedAs(Role.JobSeeker)) {
      this._snackBar.open("You must be authorized as Job Seeker to apply for a job", null, { duration: 5000, panelClass: ["snackBar"] });
      return;
    }

    this._snackBar.open("Coming soon...", null, { duration: 5000, panelClass: ["snackBar"] });
  }
}
