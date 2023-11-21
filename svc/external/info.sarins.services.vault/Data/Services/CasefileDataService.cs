using info.sarins.services.vault.Data.Models;
using info.sarins.services.vault.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace info.sarins.services.vault.Data.Services
{
    public interface ICasefileDataService
    {
        Task AddNewCaseFile(CaseFile caseFile);
        Task<List<CaseFile>> GetCaseFilesAsync();

        Task<CaseFile> GetCaseFileAsync(string identifier);
        Task<CaseFile> UpdateCaseFile(string identifier, CaseFile caseFile);

        Task<CaseFile> ArchiveCaseFile(string identifier);
        Task DeleteCaseFileAsync(string identifier);
    }

    public class CasefileDataService : ICasefileDataService
    {
        private readonly ILogger<CasefileDataService> logger;
        private readonly VaultDBContext context;
        private readonly IStorageRespository storageRespository;

        public CasefileDataService(ILogger<CasefileDataService> logger, VaultDBContext dBContext, IStorageRespository storageRespository)
        {
            this.logger = logger;
            this.context = dBContext;
            this.storageRespository = storageRespository;
        }
        public async Task<List<CaseFile>> GetCaseFilesAsync()
        {
            List<CaseFile> caseFiles = new();
            foreach (var item in await context.CaseFiles.ToArrayAsync())
            {
                var file = JsonSerializer.Deserialize<CaseFile>(item.CaseFile);
                if (file != null)
                    caseFiles.Add(file);
            }
            return caseFiles;
        }

        public async Task AddNewCaseFile(CaseFile caseFile)
        {
            CaseFiles dbFile = new()
            {
                Id=caseFile.Identifier,
                DisplayName = caseFile.Name,
                CaseFile = JsonSerializer.Serialize(caseFile)
            };
            
            await storageRespository.CreateBucketAsync(dbFile.Id);
            await context.CaseFiles.AddAsync(dbFile);
            await context.SaveChangesAsync();
          
        }

        public async Task<CaseFile> UpdateCaseFile(string identifier, CaseFile caseFile)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            dbFile.CaseFile = JsonSerializer.Serialize(caseFile);
            await context.SaveChangesAsync();
            return caseFile;
        }

        public async Task<CaseFile> ArchiveCaseFile(string identifier)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            CaseFile caseFile = JsonSerializer.Deserialize<CaseFile>(dbFile.CaseFile);
            caseFile.CaseStatus = Status.Archived;
            dbFile.CaseFile = JsonSerializer.Serialize(caseFile);
            await context.SaveChangesAsync();
            return caseFile;
        }

        public async Task<CaseFile> GetCaseFileAsync(string identifier)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            return JsonSerializer.Deserialize<CaseFile>(dbFile.CaseFile);
        }

        public async Task DeleteCaseFileAsync(string identifier)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            context.CaseFiles.Remove(dbFile);
            await context.SaveChangesAsync();
        }
    }
}
