using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateEntities2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_PatientStatus_StatusId",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PatientStatus",
                table: "PatientStatus");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cfa24b27-e6b6-4926-b0ef-f5a3c47b0cac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cfcbc2ae-134b-4163-84f9-a3da8a1ad5f0");

            migrationBuilder.RenameTable(
                name: "PatientStatus",
                newName: "PatientStatuses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PatientStatuses",
                table: "PatientStatuses",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a2c3e044-7424-4426-ac7e-4ae20c34bcf4", null, "Admin", "ADMIN" },
                    { "cfc4f80e-85a6-431c-81b4-bb31c92187c8", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_PatientStatuses_StatusId",
                table: "Patients",
                column: "StatusId",
                principalTable: "PatientStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_PatientStatuses_StatusId",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PatientStatuses",
                table: "PatientStatuses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2c3e044-7424-4426-ac7e-4ae20c34bcf4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cfc4f80e-85a6-431c-81b4-bb31c92187c8");

            migrationBuilder.RenameTable(
                name: "PatientStatuses",
                newName: "PatientStatus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PatientStatus",
                table: "PatientStatus",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "cfa24b27-e6b6-4926-b0ef-f5a3c47b0cac", null, "Admin", "ADMIN" },
                    { "cfcbc2ae-134b-4163-84f9-a3da8a1ad5f0", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_PatientStatus_StatusId",
                table: "Patients",
                column: "StatusId",
                principalTable: "PatientStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
