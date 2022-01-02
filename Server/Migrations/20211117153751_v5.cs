using Microsoft.EntityFrameworkCore.Migrations;

namespace KaficServer.Migrations
{
    public partial class v5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Narudzbine_Kafici_KaficID",
                table: "Narudzbine");

            migrationBuilder.DropIndex(
                name: "IX_Narudzbine_KaficID",
                table: "Narudzbine");

            migrationBuilder.DropColumn(
                name: "KaficID",
                table: "Narudzbine");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KaficID",
                table: "Narudzbine",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_KaficID",
                table: "Narudzbine",
                column: "KaficID");

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzbine_Kafici_KaficID",
                table: "Narudzbine",
                column: "KaficID",
                principalTable: "Kafici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
