import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JobService } from '../services/job-service';
import { Job } from '../models/job';
import { SalaryType } from '../models/salary-type';
import { ExperienceLevel } from '../models/experience-level';
import { JobType } from '../models/job-type';

const jobsPerPage: number = 10;
const buttonsCount: number = 7;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements AfterViewInit {
  jobsForShow: Job[];
  jobs: Job[];
  orignalJobs: Job[];

  jobTypes: JobType[] = [JobType.Fulltime, JobType.Parttime];
  expLevels: ExperienceLevel[] = [ExperienceLevel.Entry, ExperienceLevel.Mid, ExperienceLevel.Senior];
  selectedJobType: string;
  selectedExpLevel: string;

  pageNumbers: number[];
  pageNumber: number = 1;

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

  onClick(seletorId: string, buttonId: string, textId: string, text: string) {
    this.changeVisibility(seletorId, buttonId);
    this.changeText(textId, text);
    this.filterJobs();
  }

  onDelete(seletorId: string, buttonId: string) {
    this.changeVisibility(seletorId, buttonId);
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

  private getLastPageNumber() {
    return Math.floor((this.jobs.length - 1) / jobsPerPage) + 1;
  }

  private filterJobs() {
    this.jobs = this.orignalJobs.filter(j =>
      (this.selectedJobType == null || j.jobType == this.selectedJobType) &&
      (this.selectedExpLevel == null || j.experienceLevel == this.selectedExpLevel) &&
      (this.searchDescription == null || j.description.toLowerCase().includes(this.searchDescription)
        || j.title.toLowerCase().includes(this.searchDescription)) &&
      (this.searchLocation == null || j.location.toLowerCase().includes(this.searchLocation)));

    this.onPageChange(this.pageNumber);
  }

  private changeVisibility(seletorId: string, buttonId: string) {
    let selector = document.getElementById(seletorId);
    selector.hidden = !selector.hidden;
    let button = document.getElementById(buttonId);
    button.hidden = !button.hidden;
  }

  private changeText(textId: string, text: string) {
    let textElement = document.getElementById(textId);
    textElement.innerText = text;
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
