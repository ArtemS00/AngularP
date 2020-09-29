using AngularP.Models;
using AngularP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AngularP.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private IOptions<AuthOptions> _authOptions;
        private AccountRepository repository;

        public AuthController(AccountRepository repository, IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
            this.repository = repository;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]LoginModel loginModel)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is invalid!");

            var user = AuthenticateUser(loginModel.Email, loginModel.Password);
            if (user != null)
            {
                var token = GenerateJWT(user);
                return Ok(new
                {
                    access_token = token,
                    role = user.Role
                });
            }

            return Unauthorized();
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterModel registerModel)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is invalid!");

            var isSuccess = RegisterUser(registerModel.Email, registerModel.Password, registerModel.Role);
            if (!isSuccess)
                return Unauthorized();

            var user = AuthenticateUser(registerModel.Email, registerModel.Password);
            if (user != null)
            {
                var token = GenerateJWT(user);
                return Ok(new
                {
                    access_token = token,
                    role = user.Role
                });
            }

            return Unauthorized();
        }

        private bool RegisterUser(string email, string password, Role role)
        {
            if (role == Role.Admin)
                return false;
            if (repository.Contains(email))
                return false;

            var account = new Account()
            {
                Email = email,
                Password = password,
                Role = role
            };
            repository.Add(account);

            return true;
        }

        private Account AuthenticateUser(string email, string password)
        {
            return repository.Get(email, password);
        }

        private string GenerateJWT(Account user)
        {
            var authParams = _authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("id", user.Id.ToString()),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(authParams.Issuer, authParams.Audience, claims, 
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime), 
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
