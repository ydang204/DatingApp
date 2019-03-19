using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Data;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;
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
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthController(
            IAuthRepository authRepository,
            IMapper mapper,
             IConfiguration configuration)
        {
            _authRepository = authRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<IActionResult> Register(UserRegisterDto model)
        {
            if (await _authRepository.UserExists(model.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = _mapper.Map<User>(model);
            var createdUser = await _authRepository.RegisterAsync(userToCreate, model.Password);

            var userToReturn = _mapper.Map<UserDetailsDto>(createdUser);

            return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id }, userToReturn);
        }


        [HttpPost]
        [Route(nameof(Login))]
        public async Task<IActionResult> Login(UserLoginDto model)
        {
            var userFromRepo = await _authRepository.Login(model.Username, model.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }


            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
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
            var user = _mapper.Map<UserListDto>(userFromRepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}