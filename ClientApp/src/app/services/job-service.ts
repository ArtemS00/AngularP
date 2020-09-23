import { Job } from "../models/job";
import { ExperienceLevel } from "../models/experience-level";
import { JobType } from "../models/job-type";
import { SalaryType } from "../models/salary-type";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs: Job[];

  constructor() {
    this.jobs = [
      new Job(1, ".NET software developer 1", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        5500, 6500, SalaryType.PerMonth, new Date(2020, 8, 5), "Michigan, CA", true, ExperienceLevel.Senior, JobType.Fulltime),
      new Job(2, ".NET software developer 2", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        45000, 60000, SalaryType.PerYear, new Date(2020, 8, 14), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Fulltime),
      new Job(3, ".NET software developer 3", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        20, 30, SalaryType.PerHour, new Date(2020, 8, 23), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Fulltime),
      new Job(4, ".NET software developer 4 and something else, and something else.", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        45000, 50000, SalaryType.PerYear, new Date(2020, 8, 22), "Michigan, CA and something else, and something else, and something else, and something else.", true, ExperienceLevel.Mid, JobType.Parttime),
      new Job(5, ".NET software developer 5", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        10, 15, SalaryType.PerHour, new Date(2020, 8, 18), "Michigan, CA", true, ExperienceLevel.Entry, JobType.Parttime),
      new Job(6, ".NET software developer 6", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        12, 18, SalaryType.PerHour, new Date(2020, 8, 22), "Michigan, CA", false, ExperienceLevel.Entry, JobType.Fulltime),

      new Job(7, ".NET software developer 7", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        5500, undefined, SalaryType.PerMonth, new Date(2020, 8, 5), "Michigan, CA", true, ExperienceLevel.Senior, JobType.Fulltime),
      new Job(8, ".NET software developer 8", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, undefined, SalaryType.PerYear, new Date(2020, 8, 14), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Fulltime),
      new Job(9, ".NET software developer 9", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, 30, SalaryType.PerHour, new Date(2020, 8, 23), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Fulltime),
      new Job(10, ".NET software developer 10", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, undefined, SalaryType.PerYear, new Date(2020, 8, 22), "Michigan, CA", true, ExperienceLevel.Mid, JobType.Parttime),
      new Job(11, ".NET software developer 11", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, undefined, SalaryType.PerHour, new Date(2020, 8, 18), "Michigan, CA", true, ExperienceLevel.Entry, JobType.Parttime),
      new Job(12, ".NET software developer 12", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        12, undefined, SalaryType.PerHour, new Date(2020, 8, 22), "Michigan, CA", false, ExperienceLevel.Entry, JobType.Fulltime),

      new Job(13, ".NET software developer 13", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        5500, undefined, SalaryType.PerMonth, new Date(2020, 8, 5), "Michigan, CA", true, ExperienceLevel.Senior, JobType.Parttime),
      new Job(14, ".NET software developer 14", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, undefined, SalaryType.PerYear, new Date(2020, 8, 14), "Michigan, CA", false, ExperienceLevel.Entry, JobType.Fulltime),
      new Job(15, ".NET software developer 15", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, 30, SalaryType.PerHour, new Date(2020, 8, 17), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Fulltime),
      new Job(16, ".NET software developer 16", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, 80000, SalaryType.PerYear, new Date(2020, 8, 22), "Michigan, CA", true, ExperienceLevel.Mid, JobType.Parttime),
      new Job(17, ".NET software developer 17", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        undefined, undefined, SalaryType.PerHour, new Date(2020, 8, 19), "Michigan, CA", true, ExperienceLevel.Mid, JobType.Parttime),
      new Job(18, ".NET software developer 18", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        12, undefined, SalaryType.PerHour, new Date(2020, 8, 23), "Michigan, CA", false, ExperienceLevel.Entry, JobType.Fulltime),

      new Job(19, ".NET software developer 19", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        7500, 8500, SalaryType.PerMonth, new Date(2020, 8, 23), "Michigan, CA", true, ExperienceLevel.Senior, JobType.Fulltime),
      new Job(20, ".NET software developer 20", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        60000, 65000, SalaryType.PerYear, new Date(2020, 8, 23), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Fulltime),
      new Job(21, ".NET software developer 21", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        20, 30, SalaryType.PerHour, new Date(2020, 8, 23), "Michigan, CA", true, ExperienceLevel.Mid, JobType.Parttime),
      new Job(22, ".NET software developer 22", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        55000, 60000, SalaryType.PerYear, new Date(2020, 8, 22), "Michigan, CA", false, ExperienceLevel.Mid, JobType.Parttime),
      new Job(23, ".NET software developer 23", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        25000, 30000, SalaryType.PerYear, new Date(2020, 8, 19), "Michigan, CA", true, ExperienceLevel.Entry, JobType.Parttime),
      new Job(24, ".NET software developer 24", "We searching for .NET software developer with 1-3 years of experieance. " +
        "Assists in the development, testing, and implementation of software solutions. Assists with designing software solutions." +
        " Writes code, tests and deploys software.Prepares technical and procedural documentation required for software.Maintains and debugs software.",
        12, 18, SalaryType.PerHour, new Date(2020, 8, 11), "Michigan, CA", false, ExperienceLevel.Entry, JobType.Fulltime),
    ];
  }

  getAll(): Job[] {
    return this.jobs;
  }
}
