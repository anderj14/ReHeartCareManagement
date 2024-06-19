using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EntityUserPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_AspNetUsers_AppUserId1",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_AppUserId1",
                table: "Photo");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e70b249-d653-4da9-8de4-e77ca4eec3d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b89ee7a3-0605-4693-a586-a47fd0c616ff");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "Photo");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Photo",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8114830a-7612-4ea0-a32a-9b6dfd3683c8", null, "User", "USER" },
                    { "fc48b746-e5f3-4aa3-b178-62cbe44e9629", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_AppUserId",
                table: "Photo",
                column: "AppUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_AspNetUsers_AppUserId",
                table: "Photo",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_AspNetUsers_AppUserId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_AppUserId",
                table: "Photo");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8114830a-7612-4ea0-a32a-9b6dfd3683c8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fc48b746-e5f3-4aa3-b178-62cbe44e9629");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Photo",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "Photo",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5e70b249-d653-4da9-8de4-e77ca4eec3d5", null, "Admin", "ADMIN" },
                    { "b89ee7a3-0605-4693-a586-a47fd0c616ff", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_AppUserId1",
                table: "Photo",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_AspNetUsers_AppUserId1",
                table: "Photo",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
