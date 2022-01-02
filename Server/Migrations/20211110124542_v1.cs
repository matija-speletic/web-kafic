using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KaficServer.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kategorije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategorije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Konobari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Plata = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Konobari", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Proizvodi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Kolicina = table.Column<float>(type: "real", nullable: false),
                    Jedinica = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    KategorijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvodi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Proizvodi_Kategorije_KategorijaID",
                        column: x => x.KategorijaID,
                        principalTable: "Kategorije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stolovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojOsoba = table.Column<int>(type: "int", nullable: false),
                    DozvoljenoPusenje = table.Column<bool>(type: "bit", nullable: false),
                    ZaduzeniKonobarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stolovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stolovi_Konobari_ZaduzeniKonobarID",
                        column: x => x.ZaduzeniKonobarID,
                        principalTable: "Konobari",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Narudzbine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Napojnica = table.Column<int>(type: "int", nullable: false),
                    DodatnoUputstvo = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KonobarID = table.Column<int>(type: "int", nullable: true),
                    StoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Narudzbine", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Narudzbine_Konobari_KonobarID",
                        column: x => x.KonobarID,
                        principalTable: "Konobari",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Narudzbine_Stolovi_StoID",
                        column: x => x.StoID,
                        principalTable: "Stolovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NarudzbineProizvodi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProizvodID = table.Column<int>(type: "int", nullable: true),
                    NarudzbinaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NarudzbineProizvodi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NarudzbineProizvodi_Narudzbine_NarudzbinaID",
                        column: x => x.NarudzbinaID,
                        principalTable: "Narudzbine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NarudzbineProizvodi_Proizvodi_ProizvodID",
                        column: x => x.ProizvodID,
                        principalTable: "Proizvodi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_KonobarID",
                table: "Narudzbine",
                column: "KonobarID");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_StoID",
                table: "Narudzbine",
                column: "StoID");

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbineProizvodi_NarudzbinaID",
                table: "NarudzbineProizvodi",
                column: "NarudzbinaID");

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbineProizvodi_ProizvodID",
                table: "NarudzbineProizvodi",
                column: "ProizvodID");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvodi_KategorijaID",
                table: "Proizvodi",
                column: "KategorijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Stolovi_ZaduzeniKonobarID",
                table: "Stolovi",
                column: "ZaduzeniKonobarID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NarudzbineProizvodi");

            migrationBuilder.DropTable(
                name: "Narudzbine");

            migrationBuilder.DropTable(
                name: "Proizvodi");

            migrationBuilder.DropTable(
                name: "Stolovi");

            migrationBuilder.DropTable(
                name: "Kategorije");

            migrationBuilder.DropTable(
                name: "Konobari");
        }
    }
}
