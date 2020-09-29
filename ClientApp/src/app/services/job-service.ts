import { Job } from "../models/job";
import { ExperienceLevel } from "../models/experience-level";
import { JobType } from "../models/job-type";
import { SalaryType } from "../models/salary-type";
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JOBS_API_URL } from "../app-injection-tokens";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private http: HttpClient,
    @Inject(JOBS_API_URL) private jobsUrl: string) {
  }

  getAll() {
    return this.http.get<Job[]>(this.jobsUrl)
      .pipe(map(j =>
        j.map(j => new Job(j))));
  }

  get(id: number) {
    return this.http.get<Job>(this.jobsUrl + id)
      .pipe(map(j => new Job(j)));
  }

  post(job: Job) {
    let _job = new Job(job);
    return this.http.post<Job>(this.jobsUrl, _job);
  }
}
