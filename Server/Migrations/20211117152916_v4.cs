using Microsoft.EntityFrameworkCore.Migrations;

namespace KaficServer.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbineProizvodi_Narudzbine_NarudzbinaID",
                table: "NarudzbineProizvodi");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbineProizvodi_Proizvodi_ProizvodID",
                table: "NarudzbineProizvodi");

            migrationBuilder.AddColumn<int>(
                name: "KaficID",
                table: "Stolovi",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PozicijaX",
                table: "Stolovi",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PozicijaY",
                table: "Stolovi",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ProizvodID",
                table: "NarudzbineProizvodi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NarudzbinaID",
                table: "NarudzbineProizvodi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KaficID",
                table: "Narudzbine",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KaficID",
                table: "Konobari",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Kafici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DimenzijaX = table.Column<int>(type: "int", nullable: false),
                    DimenzijaY = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kafici", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stolovi_KaficID",
                table: "Stolovi",
                column: "KaficID");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_KaficID",
                table: "Narudzbine",
                column: "KaficID");

            migrationBuilder.CreateIndex(
                name: "IX_Konobari_KaficID",
                table: "Konobari",
                column: "KaficID");

            migrationBuilder.AddForeignKey(
                name: "FK_Konobari_Kafici_KaficID",
                table: "Konobari",
                column: "KaficID",
                principalTable: "Kafici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzbine_Kafici_KaficID",
                table: "Narudzbine",
                column: "KaficID",
                principalTable: "Kafici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbineProizvodi_Narudzbine_NarudzbinaID",
                table: "NarudzbineProizvodi",
                column: "NarudzbinaID",
                principalTable: "Narudzbine",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbineProizvodi_Proizvodi_ProizvodID",
                table: "NarudzbineProizvodi",
                column: "ProizvodID",
                principalTable: "Proizvodi",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stolovi_Kafici_KaficID",
                table: "Stolovi",
                column: "KaficID",
                principalTable: "Kafici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Konobari_Kafici_KaficID",
                table: "Konobari");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzbine_Kafici_KaficID",
                table: "Narudzbine");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbineProizvodi_Narudzbine_NarudzbinaID",
                table: "NarudzbineProizvodi");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbineProizvodi_Proizvodi_ProizvodID",
                table: "NarudzbineProizvodi");

            migrationBuilder.DropForeignKey(
                name: "FK_Stolovi_Kafici_KaficID",
                table: "Stolovi");

            migrationBuilder.DropTable(
                name: "Kafici");

            migrationBuilder.DropIndex(
                name: "IX_Stolovi_KaficID",
                table: "Stolovi");

            migrationBuilder.DropIndex(
                name: "IX_Narudzbine_KaficID",
                table: "Narudzbine");

            migrationBuilder.DropIndex(
                name: "IX_Konobari_KaficID",
                table: "Konobari");

            migrationBuilder.DropColumn(
                name: "KaficID",
                table: "Stolovi");

            migrationBuilder.DropColumn(
                name: "PozicijaX",
                table: "Stolovi");

            migrationBuilder.DropColumn(
                name: "PozicijaY",
                table: "Stolovi");

            migrationBuilder.DropColumn(
                name: "KaficID",
                table: "Narudzbine");

            migrationBuilder.DropColumn(
                name: "KaficID",
                table: "Konobari");

            migrationBuilder.AlterColumn<int>(
                name: "ProizvodID",
                table: "NarudzbineProizvodi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "NarudzbinaID",
                table: "NarudzbineProizvodi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbineProizvodi_Narudzbine_NarudzbinaID",
                table: "NarudzbineProizvodi",
                column: "NarudzbinaID",
                principalTable: "Narudzbine",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbineProizvodi_Proizvodi_ProizvodID",
                table: "NarudzbineProizvodi",
                column: "ProizvodID",
                principalTable: "Proizvodi",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
