using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;

namespace DatingApp.Api.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<PagedList<User>> GetUsersAsync(UserParams userParams);
        Task<User> GetUserAsync(int id);
        Task<bool> SaveChangesAsync();
        Task<Photo> GetPhotoAsync(int id);

        // Get the main photo of user
        Task<Photo> GetMainPhotoAsync(int userId);

        Task<Like> GetLikeAsync(int userId, int recipientId);

        Task<Message> GetMessage(int id);

        Task<PagedList<Message>> GetMessages(MessageParams messageParams);

        Task<IEnumerable<Message>> GetMessagesThread(int userId, int recipientId);
    }
}