using System.Linq;
using AutoMapper;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;

namespace DatingApp.Api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserListDto>()
            .ForMember(d => d.Age, opt => opt.MapFrom(s => s.DateOfBirth.CalulateAge()))
            .ForMember(d => d.PhotoUrl, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<User, UserDetailsDto>()
            .ForMember(d => d.Age, opt => opt.MapFrom(s => s.DateOfBirth.CalulateAge()))
            .ForMember(d => d.PhotoUrl, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Photo, PhotoDetailsDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<Photo, PhotoReturnDto>();
            CreateMap<PhotoCreationDto, Photo>();
        }
    }
}