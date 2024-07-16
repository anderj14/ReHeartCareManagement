
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IPhotoService
    {
        // Cloudinary
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}