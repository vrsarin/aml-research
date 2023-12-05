using Neo4j.Driver;
using System.Data.Common;

namespace info.sarins.services.knowledge.Data
{
    public interface INeo4JDB
    {
        void Dispose();
        Task<List<string>> GetNodeLabels();
        Task<List<Entity>> GetNodesWithProperties();
        Task<List<Entity>> GetNodesWithProperties(string label);
        Task<List<Entity>> GetNodes(bool includeProperties);
        Task<List<Relation>> GetRelations(string label, string entityId, bool includeRelations, int depth);
    }

    internal class Neo4JDB : INeo4JDB
    {
        private readonly IDriver driver;
        private readonly IConfiguration configuration;

        public Neo4JDB(IConfiguration configuration)
        {
            this.configuration = configuration;

            this.driver = GraphDatabase.Driver(
                $"neo4j://{configuration.GetValue<string>("neo4j:host")}:{configuration.GetValue<string>("neo4j:port")}",
                AuthTokens.Basic(configuration.GetValue<string>("neo4j:userName"),
                    configuration.GetValue<string>("neo4j:password")));
        }

        public void Dispose()
        {
            this.driver.Dispose();
        }

        public async Task<List<string>> GetNodeLabels()
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var result = await tx.RunAsync(@"CALL apoc.meta.data()
YIELD label, other, elementType, type
WHERE elementType = ""node""
RETURN COLLECT(distinct label) as labels");

                return await result.ToListAsync();
            });
            var result = labels[0].Values["labels"].As<List<string>>();
            result.Sort();
            return result;
        }

        public async Task<List<Entity>> GetNodesWithProperties(string label)
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var query = $@"MATCH (n:{label}) RETURN n as entities";
                var result = await tx.RunAsync(query);

                return await result.ToListAsync();
            });
            List<Entity> returnValues = new();
            labels.ForEach(r => returnValues.Add(ExtractEntity((INode)r.Values["entities"]))); ;
            return returnValues.OrderBy(x => x.Id).ToList();
        }

        public async Task<List<Entity>> GetNodesWithProperties()
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var query = $@"MATCH (n) RETURN n as entities";
                var result = await tx.RunAsync(query);

                return await result.ToListAsync();
            });
            List<Entity> returnValues = new();
            labels.ForEach(r => returnValues.Add(ExtractEntity((INode)r.Values["entities"]))); ;
            return returnValues.OrderBy(x => x.Id).ToList();

        }

        public async Task<List<Entity>> GetNodes(bool includeProperties)
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var query = $@"MATCH (n) RETURN n as entities";
                var result = await tx.RunAsync(query);

                return await result.ToListAsync();
            });
            List<Entity> returnValues = new();
            labels.ForEach(r => returnValues.Add(ExtractEntity((INode)r.Values["entities"], includeProperties: includeProperties))); ;
            return returnValues.OrderBy(x => x.Id).ToList();
        }

        public async Task<List<Relation>> GetRelations(string label, string entityId, bool includeRelations, int depth)
        {
            using var session = this.driver.AsyncSession();
            var labels = await session.ExecuteReadAsync(async tx =>
            {
                var query = $"MATCH (n:{label} {{id: '{entityId}'}})-[r*1..{depth}]-() return r as relations";
                var result = await tx.RunAsync(query);

                return await result.ToListAsync();
            });
            List<Relation> returnValues = new();
            labels.ForEach(r => returnValues.AddRange(ExtractRelations(r)));

            return returnValues.Distinct(new RelationEqualityComparer()).OrderBy(x => x.Identifier).ToList();
        }

        private Entity ExtractEntity(INode record, bool includeLabels = true, bool includeProperties = true)
        {
            var entity = new Entity
            {
                ElementId = record.ElementId,
                Id = record.Properties["id"]?.ToString() ?? string.Empty,
            };

            entity.Labels.AddRange(record.Labels.ToList<string>());
            if (includeProperties)
                entity.Attributes?.AddRange(record.Properties.Where(p => !p.Key.Equals("id")));

            return entity;
        }

        private List<Relation> ExtractRelations(IRecord record)
        {
            var result = new List<Relation>();
            foreach (var item in record.Values)
            {
                foreach (IRelationship relationship in (List<object>)item.Value)
                {
                    result.Add(new Relation
                    {
                        DestinationElementId = relationship.EndNodeElementId,
                        SourceElementId = relationship.StartNodeElementId,
                        RelationType = relationship.Type,
                        Identifier = relationship.ElementId
                    });
                }
            }

            return result;
        }
    }
}
