using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "009e157f-d0d9-406c-8e0e-65a7d7d41377");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6dd9c264-ccaa-44ad-ac01-6fd1cd9a4e8d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1643bf91-5bee-43f2-bf89-0f1a95f274d1", null, "User", "USER" },
                    { "cd9cca4a-6ee5-4277-9f9d-d5a7f4b3c9e6", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1643bf91-5bee-43f2-bf89-0f1a95f274d1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cd9cca4a-6ee5-4277-9f9d-d5a7f4b3c9e6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "009e157f-d0d9-406c-8e0e-65a7d7d41377", null, "Admin", "ADMIN" },
                    { "6dd9c264-ccaa-44ad-ac01-6fd1cd9a4e8d", null, "User", "USER" }
                });
        }
    }
}
