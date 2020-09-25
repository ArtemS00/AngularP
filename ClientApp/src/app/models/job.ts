import { ExperienceLevel } from "./experience-level";
import { JobType } from "./job-type";
import { SalaryType } from "./salary-type";
import { DatePosted } from "./date-posted";

export class Job {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public salaryMin: number,
    public salaryMax: number,
    public salaryType: SalaryType,
    public datePosted: Date,
    public location: string,
    public isRemote: boolean,
    public experienceLevel: ExperienceLevel,
    public jobType: JobType) {
    if (salaryMax && salaryMin) {
      if (salaryMax < salaryMin)
        throw new Error("The maximal salary must be greater than or equal to the minimal salary!");
    }
  }
  
  getSalaryDescription(): string {
    if (!this.salaryType)
      return null;
    if (!this.salaryMax && !this.salaryMin)
      return null;

    let salaryDesc = Job.getSalaryTypeDescription(this.salaryType);

    if (this.salaryMax && this.salaryMin)
      return `From $${this.salaryMin} to $${this.salaryMax} ${salaryDesc}`;
    if (this.salaryMin)
      return `From $${this.salaryMin} ${salaryDesc}`;
    else
      return `To $${this.salaryMax} ${salaryDesc}`;
  }

  static getSalaryTypeDescription(salaryType: SalaryType): string {
    switch (salaryType) {
      case SalaryType.PerHour: return "per hour";
      case SalaryType.PerMonth: return "per month";
      case SalaryType.PerYear: return "per year";
    }
  }

  static getJobTypeDescription(jobType : JobType): string {
    switch (jobType) {
      case JobType.Fulltime: return "Full-time";
      case JobType.Parttime: return "Part-time";
    }
  }

  static getDatePostedDescription(datePosted : DatePosted): string {
    switch (datePosted) {
      case DatePosted.Last24Hours: return "Last 24 hours";
      case DatePosted.Last7Days: return "Last 7 days";
      case DatePosted.Last14Days: return "Last 14 days";
    }
  }

  static getExpLevelDescription(expLevel: ExperienceLevel): string {
    switch (expLevel) {
      case ExperienceLevel.Entry: return "Entry Level";
      case ExperienceLevel.Mid: return "Mid Level";
      case ExperienceLevel.Senior: return "Senior Level";
    }
  }

  getMaxSalaryPerHour(): number {
    if (this.salaryMin === undefined && this.salaryMax === undefined)
      return undefined;

    let salaryTo = Job.convertSalaryToPerHour(this.salaryMax, this.salaryType);
    if (salaryTo)
      return salaryTo;
    let salaryFrom = Job.convertSalaryToPerHour(this.salaryMin, this.salaryType);
    return salaryFrom;
  }

  isPostedIn(datePosted : DatePosted): boolean {
    let difference = new Date().valueOf() - this.datePosted.valueOf();
    let differenceInHours = difference / 3600000;

    switch (datePosted) {
      case DatePosted.Last24Hours: return differenceInHours < 24;
      case DatePosted.Last7Days: return differenceInHours < 168;
      case DatePosted.Last14Days: return differenceInHours < 336;
    }
  }

  getDatePosted(): string {
    let difference = new Date().valueOf() - this.datePosted.valueOf();
    let differenceInHours = difference / 3600000;
    if (differenceInHours < 1)
      return "Just posted";
    if (differenceInHours < 24)
      return "Today";
    let differenceInDays = differenceInHours / 24;
    if (differenceInDays < 2)
      return "1 day ago";
    return Math.floor(differenceInDays) + " days ago";
  }

  private static convertSalaryToPerHour(salary: number, salaryType : SalaryType): number {
    if (salary == undefined)
      return undefined;

    switch (salaryType) {
      case SalaryType.PerHour: return salary;
      case SalaryType.PerMonth: return salary / 160;
      case SalaryType.PerYear: return salary / 1920;
    }
  }
}
