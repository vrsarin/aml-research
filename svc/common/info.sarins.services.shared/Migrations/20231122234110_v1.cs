using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace info.sarins.services.shared.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:source_type", "notes,file,url,link")
                .Annotation("Npgsql:Enum:stage_types", "pending,uploaded,queued,processing,processed,error")
                .Annotation("Npgsql:Enum:status_types", "open,data_gathering,analyzing,report_generation,closed,archived");

            migrationBuilder.CreateTable(
                name: "Vaults",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vaults", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vaults");
        }
    }
}
