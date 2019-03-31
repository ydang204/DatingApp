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
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public MessagesController(
            IDatingRepository repo,
            IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessage(id);
            if (messageFromRepo == null)
            {
                return NotFound();
            }
            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery] MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
            {
                return Unauthorized();
            }

            messageParams.CurrentUserId = userId;

            var messageFromRepo = await _repo.GetMessages(messageParams);
            var messages = _mapper.Map<IEnumerable<MessageReturnDto>>(messageFromRepo);

            Response.AddPagination(messageFromRepo.CurrentPage, messageFromRepo.PageSize, messageFromRepo.TotalCount, messageFromRepo.TotalPages);

            return Ok(messages);
        }


        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessageThread(userId, recipientId);
            var messageThread = _mapper.Map<IEnumerable<MessageReturnDto>>(messageFromRepo);

            return Ok(messageThread);
        }



        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageCreateDto messageToCreate)
        {
            if (userId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
            {
                return Unauthorized();
            }

            var recipient = await _repo.GetUserAsync(userId);
            if (recipient == null)
            {
                return BadRequest("Could not find user");
            }

            var message = _mapper.Map<Message>(messageToCreate);

            _repo.Add(message);

            if (await _repo.SaveChangesAsync())
            {
                return CreatedAtRoute(nameof(GetMessage), new { id = message.Id }, messageToCreate);
            }

            throw new Exception("Creating message failed on save");
        }
    }
}