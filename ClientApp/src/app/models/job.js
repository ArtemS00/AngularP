"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job = /** @class */ (function () {
    function Job(id, title, description, salaryFrom, salaryTo, salaryType, datePosted, location, isRemote, experienceLevel, jobType) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.salaryFrom = salaryFrom;
        this.salaryTo = salaryTo;
        this.salaryType = salaryType;
        this.datePosted = datePosted;
        this.location = location;
        this.isRemote = isRemote;
        this.experienceLevel = experienceLevel;
        this.jobType = jobType;
    }
    Job.prototype.getSalaryDescription = function () {
        if (!this.salaryType)
            return null;
        if (!this.salaryTo && !this.salaryFrom)
            return null;
        if (this.salaryTo && this.salaryFrom)
            return "From $" + this.salaryFrom + " to $" + this.salaryTo + " " + this.salaryType;
        if (this.salaryFrom)
            return "From $" + this.salaryFrom + " " + this.salaryType;
        else
            return "To $" + this.salaryTo + " " + this.salaryType;
    };
    return Job;
}());
exports.Job = Job;
//# sourceMappingURL=job.js.map