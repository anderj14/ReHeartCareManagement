
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Core.Interfaces;
using Infraestructure.settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infraestructure.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cludinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cludinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = await _cludinary.UploadAsync(uploadParams);

            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cludinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}