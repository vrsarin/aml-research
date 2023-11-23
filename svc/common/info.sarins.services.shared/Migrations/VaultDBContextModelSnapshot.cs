﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using info.sarins.services.shared.data;

#nullable disable

namespace info.sarins.services.shared.Migrations
{
    [DbContext(typeof(VaultDBContext))]
    partial class VaultDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "source_type", new[] { "notes", "file", "url", "link" });
            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "stage_types", new[] { "pending", "uploaded", "queued", "processing", "processed", "error" });
            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "status_types", new[] { "open", "data_gathering", "analyzing", "report_generation", "closed", "archived" });
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("info.sarins.services.shared.data.models.VaultRecord", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Vaults");
                });
#pragma warning restore 612, 618
        }
    }
}