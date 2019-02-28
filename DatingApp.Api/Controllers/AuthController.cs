using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Api.Data;
using DatingApp.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            this._authRepository = authRepository;
            this._configuration = configuration;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<IActionResult> Register(UserRegisterDto model)
        {
            if (await _authRepository.UserExists(model.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = Models.User.CreateNewUser(model.Username);
            var createdUser = await _authRepository.RegisterAsync(userToCreate, model.Password);

            return StatusCode(201);
        }


        [HttpPost]
        [Route(nameof(Login))]
        public async Task<IActionResult> Login(UserLoginDto model)
        {
            var user = await _authRepository.Login(model.Username, model.Password);

            if (user == null)
            {
                return Unauthorized();
            }


            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}