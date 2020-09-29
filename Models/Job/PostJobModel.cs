using System.ComponentModel.DataAnnotations;

namespace AngularP.Models.Job
{
    public class PostJobModel
    {
        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        [MinLength(200)]
        [MaxLength(10000)]
        public string Description { get; set; }

        [Range(0, 1000000)]
        public int? SalaryMin { get;set; }
        [Range(0, 1000000)]
        public int? SalaryMax { get; set; }

        public SalaryType? SalaryType { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string Location { get; set; }

        [Required]
        public bool IsRemote { get; set; }

        public ExperienceLevel? ExperienceLevel { get; set; }
        public JobType? JobType { get; set; }
    }
}
