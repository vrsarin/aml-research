using Neo4j.Driver;
using System;
using System.Collections;
using System.Linq;
using System.Reflection.Metadata.Ecma335;

namespace info.sarins.services.knowledge.Data
{
    public interface INeo4JDB : IDisposable
    {
        Task<List<string>> GetNodeLabels();
        
        Task<List<Entity>> GetNodesWithProperties(string label);
    }


    public class Neo4JDB : INeo4JDB
    {
        private readonly IDriver driver;

        public Neo4JDB()
        {
            this.driver = GraphDatabase.Driver("neo4j://host.docker.internal:7687", AuthTokens.Basic("neo4j", "Tiger!@1"));
        }

        public async Task<List<string>> GetNodeLabels()
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var result = await tx.RunAsync(@"use dev
CALL apoc.meta.data()
YIELD label, other, elementType, type
WHERE elementType = ""node""
RETURN COLLECT(distinct label) as labels");

                return await result.ToListAsync();
            });
            var result = labels[0].Values["labels"].As<List<string>>();
            result.Sort();
            return result;
        }

//        private async Task<List<string>> GetNodes(string label)
//        {
//            using var session = this.driver.AsyncSession();
//            var labels = await session.ExecuteReadAsync(async tx =>
//            {
//                var query = $@"use dev
//MATCH (n:{label}) RETURN n.name as entities";
//                var result = await tx.RunAsync(query);

//                return await result.ToListAsync();
//            });
//            List<string> returnValues = new();
//            labels.ForEach(l => returnValues.Add(l.Values["entities"].As<string>()));
//            returnValues.Sort();
//            return returnValues.Where(r => !string.IsNullOrEmpty(r)).ToList<string>();
//        }

        public async Task<List<Entity>> GetNodesWithProperties(string label)
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var query = $@"use dev
MATCH (n:{label}) RETURN n as entities";
                var result = await tx.RunAsync(query);

                return await result.ToListAsync();
            });
            List<Entity> returnValues = new();          
            labels.ForEach(r => returnValues.Add(ExtractEntity((INode)r.Values["entities"])));            ;
            return returnValues.OrderBy(x => x.Id).ToList();
        }

        private Entity ExtractEntity(INode record)
        {
            var entity = new Entity {
                Id = record.Properties["id"]?.ToString()??string.Empty,                
            };
            entity.Types.AddRange(record.Labels.ToList<string>());
            entity.Attributes?.AddRange( record.Properties.Where(p => !p.Key.Equals("id"))) ;
            return entity;
        }

       

        public void Dispose()
        {
            this.driver.Dispose();
        }
    }
}
