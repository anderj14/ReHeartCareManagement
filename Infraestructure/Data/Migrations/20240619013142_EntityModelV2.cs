using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EntityModelV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ae483a66-1cac-4417-805c-9c91dc92f01d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d906bdf3-8ca3-43aa-9135-fdbf2c1ba03c");

            migrationBuilder.DropColumn(
                name: "ImageEco",
                table: "PhysicalExaminations");

            migrationBuilder.DropColumn(
                name: "ImageStress",
                table: "PhysicalExaminations");

            migrationBuilder.DropColumn(
                name: "ArrhythmiaEpisodes",
                table: "HolterStudies");

            migrationBuilder.DropColumn(
                name: "PatientSymptoms",
                table: "HolterStudies");

            migrationBuilder.RenameColumn(
                name: "FollowUpComplete",
                table: "SurgeryFollowUps",
                newName: "Recommendations");

            migrationBuilder.RenameColumn(
                name: "ImageStress",
                table: "StressTests",
                newName: "Indications");

            migrationBuilder.RenameColumn(
                name: "ImageEco",
                table: "StressTests",
                newName: "ExerciseProtocol");

            migrationBuilder.RenameColumn(
                name: "CardiacProceduresSurgeries",
                table: "MedicalHistories",
                newName: "OtherDetails");

            migrationBuilder.RenameColumn(
                name: "NumLocationMainCoronary",
                table: "CardiacCatheterizationStudies",
                newName: "LocationMainCoronaryArteries");

            migrationBuilder.RenameColumn(
                name: "FunctionsCardiacChambers",
                table: "CardiacCatheterizationStudies",
                newName: "DescriptionComplications");

            migrationBuilder.RenameColumn(
                name: "DescriptionComplication",
                table: "CardiacCatheterizationStudies",
                newName: "DescriptionAbnormalities");

            migrationBuilder.RenameColumn(
                name: "DescriptionAbnormality",
                table: "CardiacCatheterizationStudies",
                newName: "CardiacChamberFunctions");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Appointments",
                newName: "StartDate");

            migrationBuilder.AddColumn<string>(
                name: "TreatmentDuration",
                table: "Treatments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TreatmentOutcome",
                table: "Treatments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FunctionalAssessment",
                table: "SurgeryFollowUps",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsFollowUpComplete",
                table: "SurgeryFollowUps",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "MaxBloodPressureDiastolic",
                table: "StressTests",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MaxBloodPressureSystolic",
                table: "StressTests",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "RestingHeartRate",
                table: "StressTests",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "MaxHeartRate",
                table: "PhysicalExaminations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedDoctor",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactName",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactNumber",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactRelation",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FamilyDoctor",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fax",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaritalStatus",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Occupation",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PatientStatusId",
                table: "Patients",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PolicyNumber",
                table: "Patients",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReferringDoctor",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "Patients",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoteStatusId",
                table: "Notes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<bool>(
                name: "Smoking",
                table: "MedicalHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "PreviousHeartDisease",
                table: "MedicalHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Obesity",
                table: "MedicalHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Hyperlipidemia",
                table: "MedicalHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "HighBloodPressure",
                table: "MedicalHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Diabetes",
                table: "MedicalHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardiacProcedures",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaximumHeartRate",
                table: "HolterStudies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AverageHeartRate",
                table: "HolterStudies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "BloodPressureDiastolic",
                table: "Electrocardiograms",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "BloodPressureSystolic",
                table: "Electrocardiograms",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ClinicalNotes",
                table: "Electrocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailedFindings",
                table: "Electrocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Interpretation",
                table: "Electrocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Temperature",
                table: "Electrocardiograms",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ClinicalImpression",
                table: "Echocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Findings",
                table: "Echocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Indications",
                table: "Echocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TechnicalDetails",
                table: "Echocardiograms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Diagnosis",
                table: "DiseaseHistories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoctorName",
                table: "DiseaseHistories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsChronic",
                table: "DiseaseHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "DiseaseHistories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Severity",
                table: "DiseaseHistories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FollowUpPlan",
                table: "Diagnostics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Recommendations",
                table: "Diagnostics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsSuccessful",
                table: "CardiologySurgeries",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsMinimallyInvasive",
                table: "CardiologySurgeries",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsEmergency",
                table: "CardiologySurgeries",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsElective",
                table: "CardiologySurgeries",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Duration",
                table: "CardiologySurgeries",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "AnesthesiaType",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Complications",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IntraoperativeFindings",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostOperativeInstructions",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostOperativeStatus",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SurgicalTeam",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Basophils",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Bicarbonate",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BloodUreaNitrogen",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Calcium",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chloride",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Creatinine",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Eosinophils",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lymphocytes",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Magnesium",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MeanCorpuscularHemoglobin",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MeanCorpuscularHemoglobinConcentration",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MeanCorpuscularVolume",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Monocytes",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Neutrophils",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Potassium",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RedBloodCell",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RedCellDistributionWidth",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sodium",
                table: "BloodTests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AppointmentTypeId",
                table: "Appointments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Appointments",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Appointments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdditionalTestResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TestName = table.Column<string>(type: "TEXT", nullable: true),
                    TestDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Results = table.Column<string>(type: "TEXT", nullable: true),
                    HolterStudyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalTestResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalTestResults_HolterStudies_HolterStudyId",
                        column: x => x.HolterStudyId,
                        principalTable: "HolterStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArrhythmiaEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    Duration = table.Column<string>(type: "TEXT", nullable: true),
                    HeartRateDuringEvent = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    HolterStudyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrhythmiaEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArrhythmiaEvents_HolterStudies_HolterStudyId",
                        column: x => x.HolterStudyId,
                        principalTable: "HolterStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FilePath = table.Column<string>(type: "TEXT", nullable: true),
                    FileName = table.Column<string>(type: "TEXT", nullable: true),
                    DiseaseHistoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attachments_DiseaseHistories_DiseaseHistoryId",
                        column: x => x.DiseaseHistoryId,
                        principalTable: "DiseaseHistories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClinicalEvaluations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EvaluationDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Findings = table.Column<string>(type: "TEXT", nullable: true),
                    Recommendations = table.Column<string>(type: "TEXT", nullable: true),
                    HolterStudyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicalEvaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClinicalEvaluations_HolterStudies_HolterStudyId",
                        column: x => x.HolterStudyId,
                        principalTable: "HolterStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MedicationAdministrations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MedicationName = table.Column<string>(type: "TEXT", nullable: true),
                    AdministrationDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Dosage = table.Column<string>(type: "TEXT", nullable: true),
                    HolterStudyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicationAdministrations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicationAdministrations_HolterStudies_HolterStudyId",
                        column: x => x.HolterStudyId,
                        principalTable: "HolterStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Dosage = table.Column<string>(type: "TEXT", nullable: true),
                    Frequency = table.Column<string>(type: "TEXT", nullable: true),
                    Route = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    SurgeryFollowUpId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medications_SurgeryFollowUps_SurgeryFollowUpId",
                        column: x => x.SurgeryFollowUpId,
                        principalTable: "SurgeryFollowUps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NoteStatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NoteStatusName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatientStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PatientStatusName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatientSymptoms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SymptomName = table.Column<string>(type: "TEXT", nullable: true),
                    SymptomDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    HolterStudyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientSymptoms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientSymptoms_HolterStudies_HolterStudyId",
                        column: x => x.HolterStudyId,
                        principalTable: "HolterStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    AppUserId1 = table.Column<string>(type: "TEXT", nullable: true),
                    PhysicalExaminationStressId = table.Column<int>(type: "INTEGER", nullable: false),
                    ElectrocardiogramId = table.Column<int>(type: "INTEGER", nullable: true),
                    StressTestId = table.Column<int>(type: "INTEGER", nullable: false),
                    EcocardiogramId = table.Column<int>(type: "INTEGER", nullable: false),
                    EchocardiogramId = table.Column<int>(type: "INTEGER", nullable: true),
                    CardiacCatheterizationStudyId = table.Column<int>(type: "INTEGER", nullable: false),
                    BloodTestId = table.Column<int>(type: "INTEGER", nullable: false),
                    CardiologySurgeryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photo_AspNetUsers_AppUserId1",
                        column: x => x.AppUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Photo_BloodTests_BloodTestId",
                        column: x => x.BloodTestId,
                        principalTable: "BloodTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photo_CardiacCatheterizationStudies_CardiacCatheterizationStudyId",
                        column: x => x.CardiacCatheterizationStudyId,
                        principalTable: "CardiacCatheterizationStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photo_CardiologySurgeries_CardiologySurgeryId",
                        column: x => x.CardiologySurgeryId,
                        principalTable: "CardiologySurgeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photo_Echocardiograms_EchocardiogramId",
                        column: x => x.EchocardiogramId,
                        principalTable: "Echocardiograms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Photo_Electrocardiograms_ElectrocardiogramId",
                        column: x => x.ElectrocardiogramId,
                        principalTable: "Electrocardiograms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Photo_PhysicalExaminations_PhysicalExaminationStressId",
                        column: x => x.PhysicalExaminationStressId,
                        principalTable: "PhysicalExaminations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photo_StressTests_StressTestId",
                        column: x => x.StressTestId,
                        principalTable: "StressTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    MedicationName = table.Column<string>(type: "TEXT", nullable: true),
                    Dosage = table.Column<string>(type: "TEXT", nullable: true),
                    Frequency = table.Column<string>(type: "TEXT", nullable: true),
                    Route = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prescriptions_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5e70b249-d653-4da9-8de4-e77ca4eec3d5", null, "Admin", "ADMIN" },
                    { "b89ee7a3-0605-4693-a586-a47fd0c616ff", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_PatientStatusId",
                table: "Patients",
                column: "PatientStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_NoteStatusId",
                table: "Notes",
                column: "NoteStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AppointmentTypeId",
                table: "Appointments",
                column: "AppointmentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalTestResults_HolterStudyId",
                table: "AdditionalTestResults",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_ArrhythmiaEvents_HolterStudyId",
                table: "ArrhythmiaEvents",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_DiseaseHistoryId",
                table: "Attachments",
                column: "DiseaseHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicalEvaluations_HolterStudyId",
                table: "ClinicalEvaluations",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicationAdministrations_HolterStudyId",
                table: "MedicationAdministrations",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Medications_SurgeryFollowUpId",
                table: "Medications",
                column: "SurgeryFollowUpId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientSymptoms_HolterStudyId",
                table: "PatientSymptoms",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_AppUserId1",
                table: "Photo",
                column: "AppUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_BloodTestId",
                table: "Photo",
                column: "BloodTestId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_CardiacCatheterizationStudyId",
                table: "Photo",
                column: "CardiacCatheterizationStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_CardiologySurgeryId",
                table: "Photo",
                column: "CardiologySurgeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_EchocardiogramId",
                table: "Photo",
                column: "EchocardiogramId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ElectrocardiogramId",
                table: "Photo",
                column: "ElectrocardiogramId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_PhysicalExaminationStressId",
                table: "Photo",
                column: "PhysicalExaminationStressId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_StressTestId",
                table: "Photo",
                column: "StressTestId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_PatientId",
                table: "Prescriptions",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_AppointmentTypes_AppointmentTypeId",
                table: "Appointments",
                column: "AppointmentTypeId",
                principalTable: "AppointmentTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_NoteStatus_NoteStatusId",
                table: "Notes",
                column: "NoteStatusId",
                principalTable: "NoteStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_PatientStatuses_PatientStatusId",
                table: "Patients",
                column: "PatientStatusId",
                principalTable: "PatientStatuses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_AppointmentTypes_AppointmentTypeId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_NoteStatus_NoteStatusId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_PatientStatuses_PatientStatusId",
                table: "Patients");

            migrationBuilder.DropTable(
                name: "AdditionalTestResults");

            migrationBuilder.DropTable(
                name: "AppointmentTypes");

            migrationBuilder.DropTable(
                name: "ArrhythmiaEvents");

            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "ClinicalEvaluations");

            migrationBuilder.DropTable(
                name: "MedicationAdministrations");

            migrationBuilder.DropTable(
                name: "Medications");

            migrationBuilder.DropTable(
                name: "NoteStatus");

            migrationBuilder.DropTable(
                name: "PatientStatuses");

            migrationBuilder.DropTable(
                name: "PatientSymptoms");

            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Patients_PatientStatusId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Notes_NoteStatusId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_AppointmentTypeId",
                table: "Appointments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e70b249-d653-4da9-8de4-e77ca4eec3d5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b89ee7a3-0605-4693-a586-a47fd0c616ff");

            migrationBuilder.DropColumn(
                name: "TreatmentDuration",
                table: "Treatments");

            migrationBuilder.DropColumn(
                name: "TreatmentOutcome",
                table: "Treatments");

            migrationBuilder.DropColumn(
                name: "FunctionalAssessment",
                table: "SurgeryFollowUps");

            migrationBuilder.DropColumn(
                name: "IsFollowUpComplete",
                table: "SurgeryFollowUps");

            migrationBuilder.DropColumn(
                name: "MaxBloodPressureDiastolic",
                table: "StressTests");

            migrationBuilder.DropColumn(
                name: "MaxBloodPressureSystolic",
                table: "StressTests");

            migrationBuilder.DropColumn(
                name: "RestingHeartRate",
                table: "StressTests");

            migrationBuilder.DropColumn(
                name: "AssignedDoctor",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "EmergencyContactName",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "EmergencyContactNumber",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "EmergencyContactRelation",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "FamilyDoctor",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Fax",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "MaritalStatus",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Occupation",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "PatientStatusId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "PolicyNumber",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "ReferringDoctor",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "NoteStatusId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "CardiacProcedures",
                table: "MedicalHistories");

            migrationBuilder.DropColumn(
                name: "BloodPressureDiastolic",
                table: "Electrocardiograms");

            migrationBuilder.DropColumn(
                name: "BloodPressureSystolic",
                table: "Electrocardiograms");

            migrationBuilder.DropColumn(
                name: "ClinicalNotes",
                table: "Electrocardiograms");

            migrationBuilder.DropColumn(
                name: "DetailedFindings",
                table: "Electrocardiograms");

            migrationBuilder.DropColumn(
                name: "Interpretation",
                table: "Electrocardiograms");

            migrationBuilder.DropColumn(
                name: "Temperature",
                table: "Electrocardiograms");

            migrationBuilder.DropColumn(
                name: "ClinicalImpression",
                table: "Echocardiograms");

            migrationBuilder.DropColumn(
                name: "Findings",
                table: "Echocardiograms");

            migrationBuilder.DropColumn(
                name: "Indications",
                table: "Echocardiograms");

            migrationBuilder.DropColumn(
                name: "TechnicalDetails",
                table: "Echocardiograms");

            migrationBuilder.DropColumn(
                name: "Diagnosis",
                table: "DiseaseHistories");

            migrationBuilder.DropColumn(
                name: "DoctorName",
                table: "DiseaseHistories");

            migrationBuilder.DropColumn(
                name: "IsChronic",
                table: "DiseaseHistories");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "DiseaseHistories");

            migrationBuilder.DropColumn(
                name: "Severity",
                table: "DiseaseHistories");

            migrationBuilder.DropColumn(
                name: "FollowUpPlan",
                table: "Diagnostics");

            migrationBuilder.DropColumn(
                name: "Recommendations",
                table: "Diagnostics");

            migrationBuilder.DropColumn(
                name: "AnesthesiaType",
                table: "CardiologySurgeries");

            migrationBuilder.DropColumn(
                name: "Complications",
                table: "CardiologySurgeries");

            migrationBuilder.DropColumn(
                name: "IntraoperativeFindings",
                table: "CardiologySurgeries");

            migrationBuilder.DropColumn(
                name: "PostOperativeInstructions",
                table: "CardiologySurgeries");

            migrationBuilder.DropColumn(
                name: "PostOperativeStatus",
                table: "CardiologySurgeries");

            migrationBuilder.DropColumn(
                name: "SurgicalTeam",
                table: "CardiologySurgeries");

            migrationBuilder.DropColumn(
                name: "Basophils",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Bicarbonate",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "BloodUreaNitrogen",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Calcium",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Chloride",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Creatinine",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Eosinophils",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Lymphocytes",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Magnesium",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "MeanCorpuscularHemoglobin",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "MeanCorpuscularHemoglobinConcentration",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "MeanCorpuscularVolume",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Monocytes",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Neutrophils",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Potassium",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "RedBloodCell",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "RedCellDistributionWidth",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "Sodium",
                table: "BloodTests");

            migrationBuilder.DropColumn(
                name: "AppointmentTypeId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "Recommendations",
                table: "SurgeryFollowUps",
                newName: "FollowUpComplete");

            migrationBuilder.RenameColumn(
                name: "Indications",
                table: "StressTests",
                newName: "ImageStress");

            migrationBuilder.RenameColumn(
                name: "ExerciseProtocol",
                table: "StressTests",
                newName: "ImageEco");

            migrationBuilder.RenameColumn(
                name: "OtherDetails",
                table: "MedicalHistories",
                newName: "CardiacProceduresSurgeries");

            migrationBuilder.RenameColumn(
                name: "LocationMainCoronaryArteries",
                table: "CardiacCatheterizationStudies",
                newName: "NumLocationMainCoronary");

            migrationBuilder.RenameColumn(
                name: "DescriptionComplications",
                table: "CardiacCatheterizationStudies",
                newName: "FunctionsCardiacChambers");

            migrationBuilder.RenameColumn(
                name: "DescriptionAbnormalities",
                table: "CardiacCatheterizationStudies",
                newName: "DescriptionComplication");

            migrationBuilder.RenameColumn(
                name: "CardiacChamberFunctions",
                table: "CardiacCatheterizationStudies",
                newName: "DescriptionAbnormality");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Appointments",
                newName: "Date");

            migrationBuilder.AlterColumn<string>(
                name: "MaxHeartRate",
                table: "PhysicalExaminations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "ImageEco",
                table: "PhysicalExaminations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageStress",
                table: "PhysicalExaminations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Smoking",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "PreviousHeartDisease",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "Obesity",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "Hyperlipidemia",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "HighBloodPressure",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "Diabetes",
                table: "MedicalHistories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "MaximumHeartRate",
                table: "HolterStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "AverageHeartRate",
                table: "HolterStudies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "ArrhythmiaEpisodes",
                table: "HolterStudies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PatientSymptoms",
                table: "HolterStudies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IsSuccessful",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "IsMinimallyInvasive",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "IsEmergency",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "IsElective",
                table: "CardiologySurgeries",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Duration",
                table: "CardiologySurgeries",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ae483a66-1cac-4417-805c-9c91dc92f01d", null, "Admin", "ADMIN" },
                    { "d906bdf3-8ca3-43aa-9135-fdbf2c1ba03c", null, "User", "USER" }
                });
        }
    }
}
