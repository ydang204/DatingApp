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
            // get current user's id and gender
            var identityUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var userFromRepo = await _datingRepository.GetUserAsync(identityUser);
            userParams.UserId = identityUser;
            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

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
            var identityUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
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

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            var identityUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (id != identityUser)
            {
                return Unauthorized();
            }

            var like = await _datingRepository.GetLikeAsync(id, recipientId);

            if (like != null)
            {
                return BadRequest("You already like this user");
            }

            if (await _datingRepository.GetUserAsync(recipientId) == null)
            {
                return NotFound();
            }

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            _datingRepository.Add<Like>(like);

            if (await _datingRepository.SaveChangesAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to like user");
        }

    }
}