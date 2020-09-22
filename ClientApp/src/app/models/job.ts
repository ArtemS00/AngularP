import { ExperienceLevel } from "./experience-level";
import { JobType } from "./job-type";
import { SalaryType } from "./salary-type";
import { format } from "util";

export class Job {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public salaryFrom: number,
    public salaryTo: number,
    public salaryType: SalaryType,
    public datePosted: Date,
    public location: string,
    public isRemote: boolean,
    public experienceLevel: ExperienceLevel,
    public jobType: JobType) {
  }

  getSalaryDescription(): string {
    if (!this.salaryType)
      return null;
    if (!this.salaryTo && !this.salaryFrom)
      return null;
    if (this.salaryTo && this.salaryFrom)
      return `From $${this.salaryFrom} to $${this.salaryTo} ${this.salaryType}`;
    if (this.salaryFrom)
      return `From $${this.salaryFrom} ${this.salaryType}`;
    else
      return `To $${this.salaryTo} ${this.salaryType}`;
  }
}
