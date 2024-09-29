using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class cardiacCathStudyTypeData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "12b117a9-8dbb-483b-aee7-c3fe55eb0a5f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d28ce0c9-eb6b-4af2-a39d-b45b10aad8eb");

            migrationBuilder.DropColumn(
                name: "BloodPressureAorta",
                table: "CardiacCatheterizationStudies");

            migrationBuilder.DropColumn(
                name: "BloodPressurePulmonaryArteries",
                table: "CardiacCatheterizationStudies");

            migrationBuilder.AlterColumn<double>(
                name: "VelocityBloodFlow",
                table: "CardiacCatheterizationStudies",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "PressureGradientValves",
                table: "CardiacCatheterizationStudies",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "LeftVentricularEjectionFraction",
                table: "CardiacCatheterizationStudies",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "BloodFlowCoronaryArteries",
                table: "CardiacCatheterizationStudies",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "BlockageEachCoronaryArtery",
                table: "CardiacCatheterizationStudies",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DiastolicPressureAorta",
                table: "CardiacCatheterizationStudies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DiastolicPressurePulmonaryArteries",
                table: "CardiacCatheterizationStudies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SystolicPressureAorta",
                table: "CardiacCatheterizationStudies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SystolicPressurePulmonaryArteries",
                table: "CardiacCatheterizationStudies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "637bdd2d-51aa-4141-b69a-9181bb725a6b", null, "User", "USER" },
                    { "bb5e8f1b-e6ef-476e-b27d-36dfb2baf9ff", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "637bdd2d-51aa-4141-b69a-9181bb725a6b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bb5e8f1b-e6ef-476e-b27d-36dfb2baf9ff");

            migrationBuilder.DropColumn(
                name: "DiastolicPressureAorta",
                table: "CardiacCatheterizationStudies");

            migrationBuilder.DropColumn(
                name: "DiastolicPressurePulmonaryArteries",
                table: "CardiacCatheterizationStudies");

            migrationBuilder.DropColumn(
                name: "SystolicPressureAorta",
                table: "CardiacCatheterizationStudies");

            migrationBuilder.DropColumn(
                name: "SystolicPressurePulmonaryArteries",
                table: "CardiacCatheterizationStudies");

            migrationBuilder.AlterColumn<string>(
                name: "VelocityBloodFlow",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<string>(
                name: "PressureGradientValves",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<string>(
                name: "LeftVentricularEjectionFraction",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<string>(
                name: "BloodFlowCoronaryArteries",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<string>(
                name: "BlockageEachCoronaryArtery",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AddColumn<string>(
                name: "BloodPressureAorta",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BloodPressurePulmonaryArteries",
                table: "CardiacCatheterizationStudies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "12b117a9-8dbb-483b-aee7-c3fe55eb0a5f", null, "User", "USER" },
                    { "d28ce0c9-eb6b-4af2-a39d-b45b10aad8eb", null, "Admin", "ADMIN" }
                });
        }
    }
}
