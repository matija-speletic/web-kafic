using Microsoft.EntityFrameworkCore.Migrations;

namespace KaficServer.Migrations
{
    public partial class v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stolovi_Konobari_ZaduzeniKonobarID",
                table: "Stolovi");

            migrationBuilder.DropIndex(
                name: "IX_Stolovi_ZaduzeniKonobarID",
                table: "Stolovi");

            migrationBuilder.DropColumn(
                name: "ZaduzeniKonobarID",
                table: "Stolovi");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ZaduzeniKonobarID",
                table: "Stolovi",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stolovi_ZaduzeniKonobarID",
                table: "Stolovi",
                column: "ZaduzeniKonobarID");

            migrationBuilder.AddForeignKey(
                name: "FK_Stolovi_Konobari_ZaduzeniKonobarID",
                table: "Stolovi",
                column: "ZaduzeniKonobarID",
                principalTable: "Konobari",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
