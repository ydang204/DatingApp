using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Api.Data;
using DatingApp.Api.Dtos;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/users/{userId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _datingRepository;
        private readonly IMapper _mapper;
        private readonly CloudinarySettings _cloudinarySettings;
        private readonly Cloudinary _cloudinary;

        public PhotosController(
            IDatingRepository datingRepository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinarySettings)
        {
            _datingRepository = datingRepository;
            _mapper = mapper;
            _cloudinarySettings = cloudinarySettings.Value;

            Account cloudinaryAccount = new Account(
                _cloudinarySettings.CloudName,
                _cloudinarySettings.ApiKey,
                _cloudinarySettings.ApiSecret
            );

            _cloudinary = new Cloudinary(cloudinaryAccount);
        }


        [HttpGet("{id}", Name = nameof(GetPhoto))]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _datingRepository.GetPhotoAsync(id);

            var photo = _mapper.Map<PhotoReturnDto>(photoFromRepo);

            return Ok(photo);
        }



        [HttpPost]
        [Route(nameof(UploadPhoto))]
        public async Task<IActionResult> UploadPhoto(int userId, [FromForm]PhotoCreationDto photoCreationDto)
        {
            var identityUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != identityUser)
            {
                return Unauthorized();
            }
            var userFromDb = await _datingRepository.GetUserAsync(identityUser);

            var file = photoCreationDto.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")

                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            photoCreationDto.Url = uploadResult.Uri.ToString();
            photoCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoCreationDto);
            if (!userFromDb.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }


            userFromDb.Photos.Add(photo);

            if (await _datingRepository.SaveChangesAsync())
            {
                var photoToReturn = _mapper.Map<PhotoReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setmainphoto")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            var identityUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (identityUser != userId)
            {
                return Unauthorized();
            }

            var user = await _datingRepository.GetUserAsync(userId);

            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _datingRepository.GetPhotoAsync(id);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }

            var currentMainPhoto = await _datingRepository.GetMainPhotoAsync(userId);

            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if (await _datingRepository.SaveChangesAsync())
            {
                return NoContent();
            }

            return BadRequest("Could not set photo main");

        }


        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            var identityUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (identityUser != userId)
            {
                return Unauthorized();
            }

            var user = await _datingRepository.GetUserAsync(userId);

            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _datingRepository.GetPhotoAsync(id);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }

            if (photoFromRepo.PublicId != null)
            {
                var result = _cloudinary.Destroy(new DeletionParams(photoFromRepo.PublicId));

                if (result.Result == "ok")
                {
                    _datingRepository.Delete(photoFromRepo);
                }
            }
            else
            {
                _datingRepository.Delete(photoFromRepo);
            }

            if (await _datingRepository.SaveChangesAsync())
            {
                return Ok();
            }
            return BadRequest("Failed to delete the photo");
        }
    }
}