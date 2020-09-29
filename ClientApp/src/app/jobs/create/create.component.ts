import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ExperienceLevel } from '../../models/experience-level';
import { Job } from '../../models/job';
import { JobType } from '../../models/job-type';
import { SalaryType } from '../../models/salary-type';
import { JobService } from '../../services/job-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class JobCreateComponent {
  form: FormGroup;
  titleForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  descriptionForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(200), Validators.maxLength(10000)]);
  locationForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  remoteForm: FormControl = new FormControl('', [Validators.required]);
  salaryMinForm: FormControl = new FormControl('');
  salaryMaxForm: FormControl = new FormControl('');
  salaryTypeForm: FormControl = new FormControl('');
  experienceLevelForm: FormControl = new FormControl('', [Validators.required]);
  jobTypeForm: FormControl = new FormControl('');

  salaryTypes: { enum: SalaryType, desc: string }[] = [
    { enum: SalaryType.PerHour, desc: "Per hour" },
    { enum: SalaryType.PerMonth, desc: "Per month" },
    { enum: SalaryType.PerYear, desc: "Per year" }];
  jobTypes: { enum: JobType, desc: string }[] = [
    { enum: JobType.Fulltime, desc: Job.getJobTypeDescription(JobType.Fulltime) },
    { enum: JobType.Parttime, desc: Job.getJobTypeDescription(JobType.Parttime) }];
  expLevels: { enum: ExperienceLevel, desc: string }[] = [
    { enum: ExperienceLevel.Entry, desc: Job.getExpLevelDescription(ExperienceLevel.Entry) },
    { enum: ExperienceLevel.Mid, desc: Job.getExpLevelDescription(ExperienceLevel.Mid) },
    { enum: ExperienceLevel.Senior, desc: Job.getExpLevelDescription(ExperienceLevel.Senior) }];

  private disabled = false;

  constructor(
    private jobService: JobService,
    private router: Router) {
    this.salaryMinForm.setValidators([this.validateMaxMinControls(this.salaryMinForm, this.salaryMaxForm), this.positive(this.salaryMinForm)]);
    this.salaryMaxForm.setValidators([this.validateMaxMinControls(this.salaryMinForm, this.salaryMaxForm), this.positive(this.salaryMaxForm)]);
    this.salaryTypeForm.setValidators(this.requiredIfControlSetted(this.salaryTypeForm, [this.salaryMinForm, this.salaryMaxForm]));

    this.form = new FormGroup({
      ["title"]: this.titleForm,
      ["description"]: this.descriptionForm,
      ["location"]: this.locationForm,
      ["remote"]: this.remoteForm,
      ["salaryMin"]: this.salaryMinForm,
      ["salaryMax"]: this.salaryMaxForm,
      ["salaryType"]: this.salaryTypeForm,
      ["experienceType"]: this.experienceLevelForm,
      ["jobTypeForm"]: this.jobTypeForm
    });
  }

  getErrorTitle() {
    if (this.titleForm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.titleForm.hasError('minlength')) {
      return 'Not a valid title. Use 5 or more characters.';
    }
    if (this.titleForm.hasError('maxlength')) {
      return 'Not a valid title. Use 50 or less characters.';
    }

    return '';
  }

  getErrorDescription() {
    if (this.descriptionForm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.descriptionForm.hasError('minlength')) {
      return 'Not a valid description. Use 200 or more characters.';
    }
    if (this.descriptionForm.hasError('maxlength')) {
      return 'Not a valid description. Use 10000 or less characters.';
    }

    return '';
  }

  getErrorLocation() {
    return this.locationForm.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorRemote() {
    return this.remoteForm.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorSalaryMin() {
    if (this.salaryMinForm.hasError('positive'))
      return 'Must be positive';
    return this.salaryMinForm.hasError('edgeValues') ? 'The maximal salary must be greater than or equal to the minimal salary' : '';
  }

  getErrorSalaryMax() {
    if (this.salaryMaxForm.hasError('positive'))
      return 'Must be positive';
    return this.salaryMaxForm.hasError('edgeValues') ? 'The maximal salary must be greater than or equal to the minimal salary' : '';
  }

  getErrorSalaryType() {
    return this.salaryTypeForm.hasError('requiredIfSetted') ? 'You must enter a value' : '';
  }

  getErrorExpLevel() {
    return this.salaryTypeForm.hasError('required') ? 'You must enter a value' : '';
  }


  submit() {
    for (let key in this.form.controls) {
      this.form.controls[key].markAsTouched();
      this.form.controls[key].updateValueAndValidity();
    }
    if (!this.form.valid) {
      return;
    }

    if (this.disabled)
      return;

    //this.disabled = true;

    this.jobService.post({
      title: this.titleForm.value, description: this.descriptionForm.value,
      salaryMin: this.salaryMinForm.value, salaryMax: this.salaryMaxForm.value,
      salaryType: this.salaryTypeForm.value.enum, experienceLevel: this.experienceLevelForm.value.enum,
      jobType: this.jobTypeForm.value.enum, isRemote: this.remoteForm.value, location: this.locationForm.value
    } as Job).subscribe(
      result => {
        this.router.navigate(['']);
        ;
      },
      error => {
        console.log(error);
        this.disabled = false;
      });
  }

  validateMaxMinControls(min: FormControl, max: FormControl):
    (AbstractControl) => ValidationErrors | null {
    return (): ValidationErrors | null => {
      return !min.value || !max.value || min.value <= max.value
        ? null
        : {
          edgeValues: {}
        };
    };
  }

  requiredIfControlSetted(control: FormControl, controlsToCheck: FormControl[]):
    (AbstractControl) => ValidationErrors | null {
    return (): ValidationErrors | null => {
      return !(controlsToCheck.some(c => c.value) && !control.value)
        ? null
        : {
          requiredIfSetted: {}
        };
    };
  }
  positive(control: FormControl):
    (AbstractControl) => ValidationErrors | null {
    return (): ValidationErrors | null => {
      let number = Number.parseInt(control.value);
      return !(number) || number > 0
        ? null
        : {
          positive: {}
        };
    };
  }
}
