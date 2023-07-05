using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ErpPopravni.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeopleCategoryProduct_PeopleCategories_CategoriesPeopleCategoryID",
                table: "PeopleCategoryProduct");

            migrationBuilder.RenameColumn(
                name: "CategoriesPeopleCategoryID",
                table: "PeopleCategoryProduct",
                newName: "PeopleCategoriesPeopleCategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_PeopleCategoryProduct_PeopleCategories_PeopleCategoriesPeopleCategoryID",
                table: "PeopleCategoryProduct",
                column: "PeopleCategoriesPeopleCategoryID",
                principalTable: "PeopleCategories",
                principalColumn: "PeopleCategoryID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeopleCategoryProduct_PeopleCategories_PeopleCategoriesPeopleCategoryID",
                table: "PeopleCategoryProduct");

            migrationBuilder.RenameColumn(
                name: "PeopleCategoriesPeopleCategoryID",
                table: "PeopleCategoryProduct",
                newName: "CategoriesPeopleCategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_PeopleCategoryProduct_PeopleCategories_CategoriesPeopleCategoryID",
                table: "PeopleCategoryProduct",
                column: "CategoriesPeopleCategoryID",
                principalTable: "PeopleCategories",
                principalColumn: "PeopleCategoryID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
