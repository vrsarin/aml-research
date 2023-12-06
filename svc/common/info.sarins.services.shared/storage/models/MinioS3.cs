using Minio.DataModel;

namespace info.sarins.services.shared.storage.models
{
    public class MinioS3
    {
        public MinioBucket  Bucket { get; set; }
        public MinioContent Object { get; set; }
    }
}
