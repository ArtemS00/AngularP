﻿using AngularP.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace AngularP.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private static List<Account> Accounts = new List<Account>()
        {
            new Account()
            {
                Id = Guid.Parse("a524616a-4113-672a-4cdd-1dc552ac0399"),
                Email = "user@gmail.com",
                Password = "user",
                Roles = new Role[] { Role.User }
            }
        };
        private IOptions<AuthOptions> _authOptions;

        public AuthController(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }

        [Route("login")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login([FromBody]LoginModel loginModel)
        {
            var user = AuthenticateUser(loginModel.Email, loginModel.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);
                return Ok(new
                {
                    access_token = token
                });
            }

            return Unauthorized();
        }

        [Route("register")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register([FromBody]RegisterModel registerModel)
        {
            var isSuccess = RegisterUser(registerModel.Email, registerModel.Password);
            if (!isSuccess)
                return Unauthorized();

            var user = AuthenticateUser(registerModel.Email, registerModel.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);
                return Ok(new
                {
                    access_token = token
                });
            }

            return Unauthorized();
        }

        [Route("get")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { somedata = "ok"});
        }

        [Route("superget")]
        [HttpGet]
        [Authorize]
        public IActionResult SuperGet()
        {
            return Ok(new { megadata = "ok!!" });
        }

        private bool RegisterUser(string email, string password)
        {
            if (Accounts.Any(a => a.Email == email))
                return false;

            var account = new Account()
            {
                Email = email,
                Password = password,
                Roles = new[] { Role.User }
            };
            Accounts.Add(account);

            return true;
        }

        private Account AuthenticateUser(string email, string password)
        {
            return Accounts
                .SingleOrDefault(u => u.Email == email && u.Password == password);
        }

        private string GenerateJWT(Account user)
        {
            var authParams = _authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            foreach (var role in user.Roles)
            {
                claims.Add(new Claim("role", role.ToString()));
            }

            var token = new JwtSecurityToken(authParams.Issuer, authParams.Audience, claims, 
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime), 
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}