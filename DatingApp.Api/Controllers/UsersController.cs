using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Data;
using DatingApp.Api.Dtos;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _datingRepository;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository datingRepository, IMapper mapper)
        {
            _datingRepository = datingRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route(nameof(GetUsers))]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var users = await _datingRepository.GetUsersAsync(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _datingRepository.GetUserAsync(id);
            var userToReturn = _mapper.Map<UserDetailsDto>(user);
            return Ok(userToReturn);
        }


        [HttpPut]
        [Route(nameof(UpdateUser))]
        public async Task<IActionResult> UpdateUser(UserUpdateDto updateUser)
        {
            var identityUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (updateUser.Id != identityUser)
            {
                return Unauthorized();
            }

            var userFromDb = await _datingRepository.GetUserAsync(identityUser);

            _mapper.Map(updateUser, userFromDb);

            if (await _datingRepository.SaveChangesAsync())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {identityUser} failed on save");
        }

    }
}