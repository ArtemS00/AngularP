import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobType } from '../../models/job-type';
import { ExperienceLevel } from '../../models/experience-level';
import { JobService } from '../../services/job-service';
import { DatePosted } from '../../models/date-posted';

const jobsPerPage: number = 10;
const buttonsCount: number = 7;

@Component({
  selector: 'app-jobs',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements AfterViewInit {
  jobsForShow: Job[];
  jobs: Job[];
  orignalJobs: Job[];

  jobTypes: JobType[] = [JobType.Fulltime, JobType.Parttime];
  expLevels: ExperienceLevel[] = [ExperienceLevel.Entry, ExperienceLevel.Mid, ExperienceLevel.Senior];
  datesPosted: DatePosted[] = [DatePosted.Last24Hours, DatePosted.Last7Days, DatePosted.Last14Days];
  selectedJobType: string;
  selectedExpLevel: string;
  selectedDatePosted: string;
  isRemote: boolean;

  pageNumbers: number[];
  pageNumber: number = 1;
  salarySliderValue: number = 1;
  salaryValue: number;
  salaryString: string = "Salary Estimate";
  salaryFilterEnabled: boolean = false;

  private searchDescription: string;
  private searchLocation: string;

  constructor(private jobService: JobService) {
    this.jobs = this.jobService.getAll();
    this.orignalJobs = this.jobs.copyWithin(this.jobs.length, 0);
    this.loadJobs();
    this.setPages();
  }

  ngAfterViewInit() {
    this.onPageChange(1);
  }

  onClick(seletorId: string, buttonId: string) {
    this.changeVisibility(seletorId, buttonId, false);
    this.filterJobs();
  }

  onDelete(seletorId: string, buttonId: string) {
    this.changeVisibility(seletorId, buttonId, true);
    this.filterJobs();
  }

  onPageChange(pageNumber: number) {
    if (pageNumber > this.getLastPageNumber())
      pageNumber = this.getLastPageNumber();
    if (pageNumber < 1)
      pageNumber = 1;

    this.pageNumber = pageNumber;
    this.setPages();
    this.loadJobs();
  }

  nextPage() {
    this.onPageChange(this.pageNumber + 1);
  }

  previousPage() {
    this.onPageChange(this.pageNumber - 1);
  }

  search(description: string, location: string) {
    this.searchDescription = description.toLowerCase();
    this.searchLocation = location.toLowerCase();

    this.filterJobs();
  }

  formatSliderLabel(value: string) {
    return "$" + value + "+";
  }

  private lastSalaryValue: number;
  salaryChanged() {
    if (!this.salaryFilterEnabled) {
      this.salaryString = "Salary Estimate";
      this.salaryValue = undefined;
    }
    else {
      this.salaryString = "$" + this.salarySliderValue + " per hour";
      this.salaryValue = this.salarySliderValue;
    }

    if (this.lastSalaryValue !== this.salaryValue) {
      this.filterJobs();
    }
    this.lastSalaryValue = this.salaryValue;
  }

  closeDropdownElement(id:string) {
    let element = document.getElementById(id);
    if (element)
      element.className = element.className.replace("show", "");
  }

  private getLastPageNumber() {
    return Math.floor((this.jobs.length - 1) / jobsPerPage) + 1;
  }

  private filterJobs() {
    this.jobs = this.orignalJobs.filter(j =>
      (this.selectedDatePosted == null || j.isPostedIn(this.selectedDatePosted as DatePosted)) &&
      (this.selectedJobType == null || j.jobType == this.selectedJobType) &&
      (this.selectedExpLevel == null || j.experienceLevel == this.selectedExpLevel) &&
      (this.searchDescription == null || j.description.toLowerCase().includes(this.searchDescription)
        || j.title.toLowerCase().includes(this.searchDescription)) &&
      (this.searchLocation == null || j.location.toLowerCase().includes(this.searchLocation)) &&
      (this.isRemote == undefined || j.isRemote == this.isRemote) &&
      (this.salaryValue == undefined || j.getMaxSalaryPerHour() >= this.salaryValue));

    this.onPageChange(this.pageNumber);
  }

  private changeVisibility(seletorId: string, buttonId: string, isFromDelete: boolean) {
    let selector = document.getElementById(seletorId);
    selector.hidden = !isFromDelete;
    let button = document.getElementById(buttonId);
    button.hidden = isFromDelete;
  }

  private loadJobs() {
    this.jobsForShow = this.jobs.slice(jobsPerPage * (this.pageNumber - 1), jobsPerPage * this.pageNumber);
  }

  private setPages() {
    let lastPage = this.getLastPageNumber();
    if (lastPage <= buttonsCount) {
      this.setPageNumbers(1, lastPage);
      return;
    }
    let oneSidePages = Math.floor((buttonsCount - 1) / 2);
    if (this.pageNumber - 1 < oneSidePages) {
      this.setPageNumbers(1, buttonsCount);
      return;
    }
    if (this.pageNumber + oneSidePages > lastPage) {
      this.setPageNumbers(lastPage - buttonsCount + 1, lastPage);
      return;
    }
    this.setPageNumbers(this.pageNumber - oneSidePages, this.pageNumber + oneSidePages);
  }

  private setPageNumbers(start: number, end: number) {
    this.pageNumbers = new Array(end - start + 1).fill(0).map((_, i) => start + i);
  }
}
