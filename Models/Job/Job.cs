using System;

namespace AngularP.Models.Job
{
    public class Job : IEntity
    {
        public Job(int authorId, string title, string description, int? salaryMin, int? salaryMax, SalaryType? salaryType, 
            DateTime datePosted, string location, bool isRemote, ExperienceLevel? experienceLevel, JobType? jobType)
        {
            AuthorId = authorId;
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            SalaryMin = salaryMin;
            SalaryMax = salaryMax;
            SalaryType = salaryType;
            DatePosted = datePosted;
            Location = location ?? throw new ArgumentNullException(nameof(location));
            IsRemote = isRemote;
            ExperienceLevel = experienceLevel;
            JobType = jobType;

            if ((salaryMin.HasValue || salaryMax.HasValue) && !salaryType.HasValue)
                throw new ArgumentException("Salary type is required if salary is setted");
        }

        public int Id { get; set; }
        public int AuthorId { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public int? SalaryMin { get; private set; }
        public int? SalaryMax { get; private set; }
        public SalaryType? SalaryType { get; private set; }
        public DateTime DatePosted { get; private set; }
        public string Location { get; private set; }
        public bool IsRemote { get; private set; }
        public ExperienceLevel? ExperienceLevel { get; private set; }
        public JobType? JobType { get; private set; }
    }
}
