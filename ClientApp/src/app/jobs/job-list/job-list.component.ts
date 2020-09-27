import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobType } from '../../models/job-type';
import { ExperienceLevel } from '../../models/experience-level';
import { JobService } from '../../services/job-service';
import { DatePosted } from '../../models/date-posted';
import { DropdownOptions, DropdownItem } from '../../tools/dropdown-button/dropdown-button.component';
import { DropdownSliderOptions } from '../../tools/dropdown-slider/dropdown-slider.component';
import { PageEvent } from '@angular/material/paginator';
import { SearchOptions } from '../../tools/search/search.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent {
  jobsForShow: Job[];
  jobs: Job[];
  orignalJobs: Job[];

  searchDescriptionControl = new FormControl();
  searchLocationControl = new FormControl();
  searchOptions: SearchOptions = new SearchOptions("Search", [
    { control: this.searchDescriptionControl, text: "What...", hint: "Job Description", placeholder: ".NET developer" },
    { control: this.searchLocationControl, text: "Where...", hint: "Job Location", placeholder: "San Diego, CA" }]);

  datePostedOptions: DropdownOptions = new DropdownOptions("datePostedDropdown", "Date Posted", [
    { value: DatePosted.Last24Hours, description: Job.getDatePostedDescription(DatePosted.Last24Hours) },
    { value: DatePosted.Last7Days, description: Job.getDatePostedDescription(DatePosted.Last7Days) },
    { value: DatePosted.Last14Days, description: Job.getDatePostedDescription(DatePosted.Last14Days) }]);
  jobTypeOptions: DropdownOptions = new DropdownOptions("jobTypeDropdown", "Job Type", [
    { value: JobType.Fulltime, description: Job.getJobTypeDescription(JobType.Fulltime) },
    { value: JobType.Parttime, description: Job.getJobTypeDescription(JobType.Parttime) }]);
  expLevelOptions: DropdownOptions = new DropdownOptions("expLevelDropdown", "Experience Level", [
    { value: ExperienceLevel.Entry, description: Job.getExpLevelDescription(ExperienceLevel.Entry) },
    { value: ExperienceLevel.Mid, description: Job.getExpLevelDescription(ExperienceLevel.Mid) },
    { value: ExperienceLevel.Senior, description: Job.getExpLevelDescription(ExperienceLevel.Senior) }]);
  remoteOptions: DropdownOptions = new DropdownOptions("remoteDropdown", "Remote", [
    { value: true, description: "Remote" }]);
  salaryOptions: DropdownSliderOptions = new DropdownSliderOptions(
    "salaryDropdown", "Salary Estimate", "What’s your desired salary per hour?",
    1, 100, undefined, (v) => `$${v}+`, (v) => `$${v} per hour`);

  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private jobService: JobService) {
    this.jobs = this.jobService.getAll();
    this.orignalJobs = this.jobs.copyWithin(this.jobs.length, 0);
    this.loadJobs();
  }

  private pageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageSize, length: this.length }
  pageChanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.loadJobs();
  }

  dropdownChanged() {
    this.filterJobs();
  }

  search() {
    this.filterJobs();
  }

  private filterJobs() {
    this.jobs = this.orignalJobs.filter(j =>
      (!this.datePostedOptions.selectedItem || j.isPostedIn(this.datePostedOptions.selectedItem.value)) &&
      (!this.jobTypeOptions.selectedItem || j.jobType == this.jobTypeOptions.selectedItem.value) &&
      (!this.expLevelOptions.selectedItem || j.experienceLevel == this.expLevelOptions.selectedItem.value) &&
      (!this.searchDescriptionControl.value
        || j.description.toLowerCase().includes(this.searchDescriptionControl.value.toLowerCase())
        || j.title.toLowerCase().includes(this.searchDescriptionControl.value.toLowerCase())) &&
      (!this.searchLocationControl.value
        || j.location.toLowerCase().includes(this.searchLocationControl.value.toLowerCase())) &&
      (!this.remoteOptions.selectedItem || j.isRemote == this.remoteOptions.selectedItem.value) &&
      (!this.salaryOptions.value || j.getMaxSalaryPerHour() >= this.salaryOptions.value));
    this.loadJobs();
  }

  private loadJobs() {
    this.length = this.jobs.length;
    this.jobsForShow = this.jobs.slice(this.pageEvent.pageSize * this.pageEvent.pageIndex,
      this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }
}
