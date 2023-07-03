using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ErpPopravni.Context;
using ErpPopravni.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ButikContext _context;

        public CategoryController(ButikContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var cats = _context.Categories.ToList();
            return StatusCode(StatusCodes.Status200OK, cats);
        }

        [HttpPost("/category")]
        [Authorize(Roles = "Employee")]
        public Category AddCategory(Category cat)
        {
            _context.Categories.Add(cat);
            _context.SaveChanges();

            return cat;
        }

        [HttpPut("/category")]
        [Authorize(Roles = "Employee")]
        public Category UpdateCategory(Category cat)
        {
            _context.Categories.Update(cat);
            _context.SaveChanges();

            return cat;
        }

        [HttpDelete("/category/{id}")]
        [Authorize(Roles = "Employee")]
        public Category DeleteCategory(int id)
        {
            Category catForDelete = _context.Categories.Find(id);
            _context.Categories.Remove(catForDelete);
            _context.SaveChanges();

            return catForDelete;
        }
    }
}
