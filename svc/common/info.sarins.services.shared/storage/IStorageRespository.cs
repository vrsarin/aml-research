namespace info.sarins.services.shared.storage
{
    public interface IStorageRespository
    {
        Task CreateBucketAsync(string bucketId);
        Task<string> GetFilePutUrl(string bucketId, string fileName);
        Task<string> GetFileUrl(string bucketId, string fileName);
    }
}