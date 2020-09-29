using AngularP.Models.Job;
using AngularP.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace AngularP.Controllers
{
    [Route("api/[controller]")]
    public class JobsController : Controller
    {
        private JobRepository repository { get; set; }
        public JobsController(JobRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Job> Get()
        {
            return repository.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Job Get(int id)
        {
            return repository.Get(id);
        }

        // POST api/<controller>
        [HttpPost]
        [Authorize]
        public void Post([FromBody]PostJobModel value)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Job is not valid");

            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var claim = claimsIdentity.FindFirst("id");
            if (claim == null)
                throw new NullReferenceException("Id claim is not found");

            int authorId = int.Parse(claim.Value);
            Job job = new Job(authorId, value.Title, value.Description, value.SalaryMin, value.SalaryMax, value.SalaryType, 
                DateTime.Now, value.Location, value.IsRemote, value.ExperienceLevel, value.JobType);

            repository.Add(job);
        }
    }
}
