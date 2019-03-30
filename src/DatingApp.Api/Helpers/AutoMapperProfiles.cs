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
            // User Mappings
            CreateMap<User, UserListDto>()
            .ForMember(d => d.Age, opt => opt.MapFrom(s => s.DateOfBirth.CalulateAge()))
            .ForMember(d => d.LastActive, opt => opt.MapFrom(s => s.LastActive.ToLocalTime()))
            .ForMember(d => d.PhotoUrl, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<User, UserDetailsDto>()
            .ForMember(d => d.Age, opt => opt.MapFrom(s => s.DateOfBirth.CalulateAge()))
            .ForMember(d => d.LastActive, opt => opt.MapFrom(s => s.LastActive.ToLocalTime()))
            .ForMember(d => d.PhotoUrl, opt => opt.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserRegisterDto, User>();

            // Photo Mappings
            CreateMap<Photo, PhotoDetailsDto>();
            CreateMap<Photo, PhotoReturnDto>();
            CreateMap<PhotoCreationDto, Photo>();

            // Message Mappings
            CreateMap<MessageCreateDto, Message>();
            CreateMap<Message, MessageReturnDto>()
            .ForMember(d => d.SenderPhotoUrl, options =>
                    options.MapFrom(s => s.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(d => d.RecipientPhotoUrl, options => 
                    options.MapFrom(s => s.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}