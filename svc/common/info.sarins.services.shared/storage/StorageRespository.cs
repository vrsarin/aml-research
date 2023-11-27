using Microsoft.Extensions.Logging;
using Minio.DataModel.Args;
using Minio.DataModel.Notification;
using Minio;

namespace info.sarins.services.shared.storage
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

        public async Task<bool> CreateBucketAsync(string bucketId)
        {
            if (!await minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketId)))
            {
                var bucket = new MakeBucketArgs().WithBucket(bucketId);
                await minioClient.MakeBucketAsync(bucket);
                await SetBucketNotification(bucketId);
                return true;
            }
            else
            {
                return false;
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
            return await minioClient.PresignedGetObjectAsync(new PresignedGetObjectArgs().WithBucket(bucketId).WithObject(fileName).WithExpiry(300));
        }

        private async Task SetBucketNotification(string bucketId)
        {

            var notification = new BucketNotification();
            var args = new SetBucketNotificationsArgs()
                .WithBucket(bucketId)
                .WithBucketNotificationConfiguration(notification);

            // Uncomment the code below and change Arn and event types to configure.

            QueueConfig queueConfiguration = new QueueConfig("arn:minio:sqs::docker:kafka");
            // TODO: Currently ignore Delete Events. we will handle it later. 
            //queueConfiguration.AddEvents(new List<EventType>() { EventType.ObjectCreatedAll, EventType.ObjectRemovedAll });
            queueConfiguration.AddEvents(new List<EventType>() { EventType.ObjectCreatedAll, EventType.ObjectRemovedAll });
            notification.AddQueue(queueConfiguration);

            await minioClient.SetBucketNotificationsAsync(args).ConfigureAwait(false);
        }
    }
}
