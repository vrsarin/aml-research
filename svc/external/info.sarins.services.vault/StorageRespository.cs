using Minio;
using Minio.DataModel.Args;

namespace info.sarins.services.vault
{
    public class StorageRespository : IStorageRespository
    {
        private readonly ILogger<StorageRespository> logger;
        private readonly IMinioClient minioClient;

        public StorageRespository(ILogger<StorageRespository> logger, IMinioClient minioClient)
        {
            this.logger = logger;
            this.minioClient = minioClient;
        }


        public async Task CreateBucketAsync(string bucketId)
        {
            if (!await minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketId)))
            {
                var bucket = new MakeBucketArgs().WithBucket(bucketId);
                await minioClient.MakeBucketAsync(bucket);
            }
            else
            {
                throw new ApplicationException("Storage already exists");
            }
        }

        public async Task<string> GetFilePutUrl(string bucketId, string fileName)
        {
            var args = new PresignedPutObjectArgs()
            .WithBucket(bucketId).WithObject(fileName)
            .WithExpiry(1000);
            return await minioClient.PresignedPutObjectAsync(args);
        }

        public async Task<string> GetFileUrl(string bucketId, string fileName)
        {

            return await minioClient
                .PresignedGetObjectAsync(new PresignedGetObjectArgs().WithBucket(bucketId).WithObject(fileName).WithExpiry(300));

        }

    }
}
