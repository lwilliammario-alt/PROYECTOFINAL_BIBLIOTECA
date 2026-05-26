using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotecaSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AgregarAnioPublicacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnioPublicacion",
                table: "Libros",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnioPublicacion",
                table: "Libros");
        }
    }
}
