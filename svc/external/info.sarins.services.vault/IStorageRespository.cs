namespace info.sarins.services.vault
{
    public interface IStorageRespository 
    {
        Task<string> GetFilePutUrl(string bucketId,string fileName);
        Task CreateBucketAsync(string bucketId);
        Task<string> GetFileUrl(string bucketId, string fileName);
    }
}