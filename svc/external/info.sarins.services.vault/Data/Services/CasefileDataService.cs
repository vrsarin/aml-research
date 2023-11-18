using info.sarins.services.vault.Data.Models;
using info.sarins.services.vault.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace info.sarins.services.vault.Data.Services
{
    public interface ICasefileDataService
    {
        Task<CaseFile> AddNewCaseFile(CaseFile caseFile);
        Task<List<CaseFile>> GetCaseFilesAsync();

        Task<CaseFile> GetCaseFileAsync(long identifier);
        Task<CaseFile> UpdateCaseFile(long identifier, CaseFile caseFile);

        Task<CaseFile> ArchiveCaseFile(long identifier);
        Task DeleteCaseFileAsync(int identifier);
    }

    public class CasefileDataService : ICasefileDataService
    {
        private readonly VaultDBContext context;

        public CasefileDataService(VaultDBContext dBContext)
        {
            this.context = dBContext;
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

        public async Task<CaseFile> AddNewCaseFile(CaseFile caseFile)
        {
            CaseFiles dbFile = new()
            {
                DisplayName = caseFile.Name,
                CaseFile = JsonSerializer.Serialize(caseFile)
            };
            await context.CaseFiles.AddAsync(dbFile);
            await context.SaveChangesAsync();
            caseFile.Identifier = dbFile.Id;
            await UpdateCaseFile(dbFile.Id, caseFile);
            return caseFile;
        }

        public async Task<CaseFile> UpdateCaseFile(long identifier, CaseFile caseFile)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            dbFile.CaseFile = JsonSerializer.Serialize(caseFile);
            await context.SaveChangesAsync();
            return caseFile;
        }

        public async Task<CaseFile> ArchiveCaseFile(long identifier)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            CaseFile caseFile = JsonSerializer.Deserialize<CaseFile>(dbFile.CaseFile);
            caseFile.CaseStatus = Status.Archived;
            dbFile.CaseFile = JsonSerializer.Serialize(caseFile);
            await context.SaveChangesAsync();
            return caseFile;
        }

        public async Task<CaseFile> GetCaseFileAsync(long identifier)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            return JsonSerializer.Deserialize<CaseFile>(dbFile.CaseFile);
        }

        public async Task DeleteCaseFileAsync(int identifier)
        {
            var dbFile = await context.CaseFiles.Where(f => f.Id.Equals(identifier)).FirstAsync();
            context.CaseFiles.Remove(dbFile);
            await context.SaveChangesAsync();
        }
    }
}
