using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EntityV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppointmentStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppointmentStatusName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentStatuses", x => x.Id);
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
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NoteStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NoteStatusName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteStatuses", x => x.Id);
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
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    NoteStatusId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notes_NoteStatuses_NoteStatusId",
                        column: x => x.NoteStatusId,
                        principalTable: "NoteStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true),
                    PatientName = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    CarnetIdentification = table.Column<string>(type: "TEXT", nullable: false),
                    DOB = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Phone = table.Column<long>(type: "INTEGER", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    SocialSecurity = table.Column<string>(type: "TEXT", nullable: false),
                    PolicyNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Fax = table.Column<string>(type: "TEXT", nullable: false),
                    ReferringDoctor = table.Column<string>(type: "TEXT", nullable: false),
                    AssignedDoctor = table.Column<string>(type: "TEXT", nullable: false),
                    FamilyDoctor = table.Column<string>(type: "TEXT", nullable: false),
                    EmergencyContactName = table.Column<string>(type: "TEXT", nullable: false),
                    EmergencyContactNumber = table.Column<string>(type: "TEXT", nullable: false),
                    EmergencyContactRelation = table.Column<string>(type: "TEXT", nullable: false),
                    MaritalStatus = table.Column<string>(type: "TEXT", nullable: false),
                    Occupation = table.Column<string>(type: "TEXT", nullable: false),
                    StatusId = table.Column<int>(type: "INTEGER", nullable: false),
                    PatientStatusId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Patients_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Patients_PatientStatuses_PatientStatusId",
                        column: x => x.PatientStatusId,
                        principalTable: "PatientStatuses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Location = table.Column<string>(type: "TEXT", nullable: true),
                    AppointmentStatusId = table.Column<int>(type: "INTEGER", nullable: false),
                    AppointmentTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_AppointmentStatuses_AppointmentStatusId",
                        column: x => x.AppointmentStatusId,
                        principalTable: "AppointmentStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_AppointmentTypes_AppointmentTypeId",
                        column: x => x.AppointmentTypeId,
                        principalTable: "AppointmentTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BloodTests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Hemoglobin = table.Column<string>(type: "TEXT", nullable: true),
                    Hematocrit = table.Column<string>(type: "TEXT", nullable: true),
                    WhiteBloodCell = table.Column<string>(type: "TEXT", nullable: true),
                    Platelets = table.Column<string>(type: "TEXT", nullable: true),
                    Glucose = table.Column<string>(type: "TEXT", nullable: true),
                    CholesterolHDL = table.Column<string>(type: "TEXT", nullable: true),
                    CholesterolLDL = table.Column<string>(type: "TEXT", nullable: true),
                    Triglycerides = table.Column<string>(type: "TEXT", nullable: true),
                    RedBloodCell = table.Column<string>(type: "TEXT", nullable: true),
                    MeanCorpuscularVolume = table.Column<string>(type: "TEXT", nullable: true),
                    MeanCorpuscularHemoglobin = table.Column<string>(type: "TEXT", nullable: true),
                    MeanCorpuscularHemoglobinConcentration = table.Column<string>(type: "TEXT", nullable: true),
                    RedCellDistributionWidth = table.Column<string>(type: "TEXT", nullable: true),
                    BloodUreaNitrogen = table.Column<string>(type: "TEXT", nullable: true),
                    Creatinine = table.Column<string>(type: "TEXT", nullable: true),
                    Sodium = table.Column<string>(type: "TEXT", nullable: true),
                    Potassium = table.Column<string>(type: "TEXT", nullable: true),
                    Chloride = table.Column<string>(type: "TEXT", nullable: true),
                    Bicarbonate = table.Column<string>(type: "TEXT", nullable: true),
                    Calcium = table.Column<string>(type: "TEXT", nullable: true),
                    Magnesium = table.Column<string>(type: "TEXT", nullable: true),
                    Neutrophils = table.Column<string>(type: "TEXT", nullable: true),
                    Lymphocytes = table.Column<string>(type: "TEXT", nullable: true),
                    Monocytes = table.Column<string>(type: "TEXT", nullable: true),
                    Eosinophils = table.Column<string>(type: "TEXT", nullable: true),
                    Basophils = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BloodTests_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CardiacCatheterizationStudies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    LocationMainCoronaryArteries = table.Column<string>(type: "TEXT", nullable: true),
                    BlockageEachCoronaryArtery = table.Column<string>(type: "TEXT", nullable: true),
                    DescriptionAbnormalities = table.Column<string>(type: "TEXT", nullable: true),
                    BloodPressureAorta = table.Column<string>(type: "TEXT", nullable: true),
                    ChambersLeftAtrium = table.Column<string>(type: "TEXT", nullable: true),
                    ChambersLeftVentricle = table.Column<string>(type: "TEXT", nullable: true),
                    ChambersRightAtrium = table.Column<string>(type: "TEXT", nullable: true),
                    ChambersRightVentricle = table.Column<string>(type: "TEXT", nullable: true),
                    BloodFlowCoronaryArteries = table.Column<string>(type: "TEXT", nullable: true),
                    VelocityBloodFlow = table.Column<string>(type: "TEXT", nullable: true),
                    LeftVentricularEjectionFraction = table.Column<string>(type: "TEXT", nullable: true),
                    BloodPressurePulmonaryArteries = table.Column<string>(type: "TEXT", nullable: true),
                    ValvularInsufficiencyAortic = table.Column<string>(type: "TEXT", nullable: true),
                    ValvularInsufficiencyMitral = table.Column<string>(type: "TEXT", nullable: true),
                    ValvularInsufficiencyPulmonary = table.Column<string>(type: "TEXT", nullable: true),
                    ValvularInsufficiencyTricuspid = table.Column<string>(type: "TEXT", nullable: true),
                    PressureGradientValves = table.Column<string>(type: "TEXT", nullable: true),
                    StructuralAbnormalities = table.Column<string>(type: "TEXT", nullable: true),
                    CardiacChamberFunctions = table.Column<string>(type: "TEXT", nullable: true),
                    DescriptionComplications = table.Column<string>(type: "TEXT", nullable: true),
                    Conclusion = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardiacCatheterizationStudies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardiacCatheterizationStudies_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CardiologySurgeries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true),
                    SurgeryName = table.Column<string>(type: "TEXT", nullable: true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    ProcedureDescription = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    IsEmergency = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsElective = table.Column<bool>(type: "INTEGER", nullable: false),
                    OperationRoom = table.Column<string>(type: "TEXT", nullable: true),
                    PreOpDiagnosis = table.Column<string>(type: "TEXT", nullable: true),
                    PostOpDiagnosis = table.Column<string>(type: "TEXT", nullable: true),
                    IsSuccessful = table.Column<bool>(type: "INTEGER", nullable: false),
                    Duration = table.Column<double>(type: "REAL", nullable: false),
                    CardiacCondition = table.Column<string>(type: "TEXT", nullable: true),
                    IsMinimallyInvasive = table.Column<bool>(type: "INTEGER", nullable: false),
                    Complications = table.Column<string>(type: "TEXT", nullable: true),
                    PostOperativeStatus = table.Column<string>(type: "TEXT", nullable: true),
                    AnesthesiaType = table.Column<string>(type: "TEXT", nullable: true),
                    SurgicalTeam = table.Column<string>(type: "TEXT", nullable: true),
                    IntraoperativeFindings = table.Column<string>(type: "TEXT", nullable: true),
                    PostOperativeInstructions = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardiologySurgeries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardiologySurgeries_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardiologySurgeries_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Diagnostics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ConditionName = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ClassificationCondition = table.Column<string>(type: "TEXT", nullable: true),
                    Severity = table.Column<string>(type: "TEXT", nullable: true),
                    RiskAssessment = table.Column<string>(type: "TEXT", nullable: true),
                    Conclusions = table.Column<string>(type: "TEXT", nullable: true),
                    Recommendations = table.Column<string>(type: "TEXT", nullable: true),
                    FollowUpPlan = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnostics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Diagnostics_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiseaseHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Treatment = table.Column<string>(type: "TEXT", nullable: true),
                    Diagnosis = table.Column<string>(type: "TEXT", nullable: true),
                    Severity = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    IsChronic = table.Column<bool>(type: "INTEGER", nullable: false),
                    DoctorName = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiseaseHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiseaseHistories_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Echocardiograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CardiacDimensions = table.Column<string>(type: "TEXT", nullable: true),
                    EjectionFraction = table.Column<string>(type: "TEXT", nullable: true),
                    ValveFunction = table.Column<string>(type: "TEXT", nullable: true),
                    VelocitiesBloodFlows = table.Column<string>(type: "TEXT", nullable: true),
                    MovementCardiacWalls = table.Column<string>(type: "TEXT", nullable: true),
                    PulmonaryArterialPressure = table.Column<string>(type: "TEXT", nullable: true),
                    BloodFlow = table.Column<string>(type: "TEXT", nullable: true),
                    Indications = table.Column<string>(type: "TEXT", nullable: true),
                    Findings = table.Column<string>(type: "TEXT", nullable: true),
                    ClinicalImpression = table.Column<string>(type: "TEXT", nullable: true),
                    TechnicalDetails = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Echocardiograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Echocardiograms_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Electrocardiograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    HeartRhythm = table.Column<string>(type: "TEXT", nullable: true),
                    IntervalsSegments = table.Column<string>(type: "TEXT", nullable: true),
                    CharacteristicWaves = table.Column<string>(type: "TEXT", nullable: true),
                    HeartRate = table.Column<string>(type: "TEXT", nullable: true),
                    Abnormalities = table.Column<string>(type: "TEXT", nullable: true),
                    Artifacts = table.Column<string>(type: "TEXT", nullable: true),
                    Interpretation = table.Column<string>(type: "TEXT", nullable: true),
                    DetailedFindings = table.Column<string>(type: "TEXT", nullable: true),
                    BloodPressureSystolic = table.Column<double>(type: "REAL", nullable: false),
                    BloodPressureDiastolic = table.Column<double>(type: "REAL", nullable: false),
                    Temperature = table.Column<double>(type: "REAL", nullable: false),
                    ClinicalNotes = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Electrocardiograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Electrocardiograms_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HolterStudies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    StudyDuration = table.Column<string>(type: "TEXT", nullable: true),
                    AverageHeartRate = table.Column<int>(type: "INTEGER", nullable: false),
                    MaximumHeartRate = table.Column<int>(type: "INTEGER", nullable: false),
                    TypeHeartRhythm = table.Column<string>(type: "TEXT", nullable: true),
                    PhysicalActivity = table.Column<string>(type: "TEXT", nullable: true),
                    Conclusion = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HolterStudies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HolterStudies_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MedicalHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PreviousHeartDisease = table.Column<bool>(type: "INTEGER", nullable: false),
                    HighBloodPressure = table.Column<bool>(type: "INTEGER", nullable: false),
                    Diabetes = table.Column<bool>(type: "INTEGER", nullable: false),
                    Hyperlipidemia = table.Column<bool>(type: "INTEGER", nullable: false),
                    Obesity = table.Column<bool>(type: "INTEGER", nullable: false),
                    Smoking = table.Column<bool>(type: "INTEGER", nullable: false),
                    CardiacProcedures = table.Column<string>(type: "TEXT", nullable: true),
                    SystemicDiseases = table.Column<string>(type: "TEXT", nullable: true),
                    Medications = table.Column<string>(type: "TEXT", nullable: true),
                    FamilyDiseases = table.Column<string>(type: "TEXT", nullable: true),
                    OtherDetails = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicalHistories_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhysicalExaminations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    Duration = table.Column<string>(type: "TEXT", nullable: true),
                    MaxHeartRate = table.Column<int>(type: "INTEGER", nullable: false),
                    PeakPressure = table.Column<string>(type: "TEXT", nullable: true),
                    ExerciseInducedSymptoms = table.Column<string>(type: "TEXT", nullable: true),
                    AbnormalEcgFindings = table.Column<string>(type: "TEXT", nullable: true),
                    Conclusion = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysicalExaminations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhysicalExaminations_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
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

            migrationBuilder.CreateTable(
                name: "StressTests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    Duration = table.Column<string>(type: "TEXT", nullable: true),
                    MaxHeartRate = table.Column<string>(type: "TEXT", nullable: true),
                    PeakPressure = table.Column<string>(type: "TEXT", nullable: true),
                    ExerciseInducedSymptoms = table.Column<string>(type: "TEXT", nullable: true),
                    RestingHeartRate = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxBloodPressureSystolic = table.Column<double>(type: "REAL", nullable: false),
                    MaxBloodPressureDiastolic = table.Column<double>(type: "REAL", nullable: false),
                    ExerciseProtocol = table.Column<string>(type: "TEXT", nullable: true),
                    Indications = table.Column<string>(type: "TEXT", nullable: true),
                    AbnormalEcgFindings = table.Column<string>(type: "TEXT", nullable: true),
                    Conclusion = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StressTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StressTests_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Treatments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Medication = table.Column<string>(type: "TEXT", nullable: true),
                    Dosage = table.Column<string>(type: "TEXT", nullable: true),
                    Instructions = table.Column<string>(type: "TEXT", nullable: true),
                    OtherTreatments = table.Column<string>(type: "TEXT", nullable: true),
                    SideEffects = table.Column<string>(type: "TEXT", nullable: true),
                    TreatmentMonitoring = table.Column<string>(type: "TEXT", nullable: true),
                    TreatmentDuration = table.Column<string>(type: "TEXT", nullable: true),
                    TreatmentOutcome = table.Column<string>(type: "TEXT", nullable: true),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treatments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Treatments_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurgeryFollowUps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FollowUpDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    FollowUpNotes = table.Column<string>(type: "TEXT", nullable: true),
                    Complications = table.Column<string>(type: "TEXT", nullable: true),
                    Recommendations = table.Column<string>(type: "TEXT", nullable: true),
                    FunctionalAssessment = table.Column<string>(type: "TEXT", nullable: true),
                    IsFollowUpComplete = table.Column<bool>(type: "INTEGER", nullable: false),
                    CardiologySurgeryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurgeryFollowUps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurgeryFollowUps_CardiologySurgeries_CardiologySurgeryId",
                        column: x => x.CardiologySurgeryId,
                        principalTable: "CardiologySurgeries",
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
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true),
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
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photos_BloodTests_BloodTestId",
                        column: x => x.BloodTestId,
                        principalTable: "BloodTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photos_CardiacCatheterizationStudies_CardiacCatheterizationStudyId",
                        column: x => x.CardiacCatheterizationStudyId,
                        principalTable: "CardiacCatheterizationStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photos_CardiologySurgeries_CardiologySurgeryId",
                        column: x => x.CardiologySurgeryId,
                        principalTable: "CardiologySurgeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photos_Echocardiograms_EchocardiogramId",
                        column: x => x.EchocardiogramId,
                        principalTable: "Echocardiograms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Photos_Electrocardiograms_ElectrocardiogramId",
                        column: x => x.ElectrocardiogramId,
                        principalTable: "Electrocardiograms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Photos_PhysicalExaminations_PhysicalExaminationStressId",
                        column: x => x.PhysicalExaminationStressId,
                        principalTable: "PhysicalExaminations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photos_StressTests_StressTestId",
                        column: x => x.StressTestId,
                        principalTable: "StressTests",
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3fc73c31-4d43-4602-9606-64b0793e0ea8", null, "Admin", "ADMIN" },
                    { "6fd9bf97-d8f3-4635-813c-0ac1150f1cbf", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalTestResults_HolterStudyId",
                table: "AdditionalTestResults",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AppointmentStatusId",
                table: "Appointments",
                column: "AppointmentStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AppointmentTypeId",
                table: "Appointments",
                column: "AppointmentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AppUserId",
                table: "Appointments",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_PatientId",
                table: "Appointments",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_ArrhythmiaEvents_HolterStudyId",
                table: "ArrhythmiaEvents",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_DiseaseHistoryId",
                table: "Attachments",
                column: "DiseaseHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_BloodTests_PatientId",
                table: "BloodTests",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_CardiacCatheterizationStudies_PatientId",
                table: "CardiacCatheterizationStudies",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_CardiologySurgeries_AppUserId",
                table: "CardiologySurgeries",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CardiologySurgeries_PatientId",
                table: "CardiologySurgeries",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicalEvaluations_HolterStudyId",
                table: "ClinicalEvaluations",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Diagnostics_PatientId",
                table: "Diagnostics",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DiseaseHistories_PatientId",
                table: "DiseaseHistories",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Echocardiograms_PatientId",
                table: "Echocardiograms",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Electrocardiograms_PatientId",
                table: "Electrocardiograms",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_HolterStudies_PatientId",
                table: "HolterStudies",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalHistories_PatientId",
                table: "MedicalHistories",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicationAdministrations_HolterStudyId",
                table: "MedicationAdministrations",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Medications_SurgeryFollowUpId",
                table: "Medications",
                column: "SurgeryFollowUpId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_AppUserId",
                table: "Notes",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_NoteStatusId",
                table: "Notes",
                column: "NoteStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_AppUserId",
                table: "Patients",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_PatientStatusId",
                table: "Patients",
                column: "PatientStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientSymptoms_HolterStudyId",
                table: "PatientSymptoms",
                column: "HolterStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppUserId",
                table: "Photos",
                column: "AppUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_BloodTestId",
                table: "Photos",
                column: "BloodTestId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CardiacCatheterizationStudyId",
                table: "Photos",
                column: "CardiacCatheterizationStudyId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CardiologySurgeryId",
                table: "Photos",
                column: "CardiologySurgeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_EchocardiogramId",
                table: "Photos",
                column: "EchocardiogramId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ElectrocardiogramId",
                table: "Photos",
                column: "ElectrocardiogramId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_PhysicalExaminationStressId",
                table: "Photos",
                column: "PhysicalExaminationStressId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_StressTestId",
                table: "Photos",
                column: "StressTestId");

            migrationBuilder.CreateIndex(
                name: "IX_PhysicalExaminations_PatientId",
                table: "PhysicalExaminations",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_PatientId",
                table: "Prescriptions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_StressTests_PatientId",
                table: "StressTests",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_SurgeryFollowUps_CardiologySurgeryId",
                table: "SurgeryFollowUps",
                column: "CardiologySurgeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Treatments_PatientId",
                table: "Treatments",
                column: "PatientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdditionalTestResults");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "ArrhythmiaEvents");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "ClinicalEvaluations");

            migrationBuilder.DropTable(
                name: "Diagnostics");

            migrationBuilder.DropTable(
                name: "MedicalHistories");

            migrationBuilder.DropTable(
                name: "MedicationAdministrations");

            migrationBuilder.DropTable(
                name: "Medications");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "PatientSymptoms");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "Treatments");

            migrationBuilder.DropTable(
                name: "AppointmentStatuses");

            migrationBuilder.DropTable(
                name: "AppointmentTypes");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "DiseaseHistories");

            migrationBuilder.DropTable(
                name: "SurgeryFollowUps");

            migrationBuilder.DropTable(
                name: "NoteStatuses");

            migrationBuilder.DropTable(
                name: "HolterStudies");

            migrationBuilder.DropTable(
                name: "BloodTests");

            migrationBuilder.DropTable(
                name: "CardiacCatheterizationStudies");

            migrationBuilder.DropTable(
                name: "Echocardiograms");

            migrationBuilder.DropTable(
                name: "Electrocardiograms");

            migrationBuilder.DropTable(
                name: "PhysicalExaminations");

            migrationBuilder.DropTable(
                name: "StressTests");

            migrationBuilder.DropTable(
                name: "CardiologySurgeries");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "PatientStatuses");
        }
    }
}
