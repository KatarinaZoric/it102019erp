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
    public class PeopleCategoryController : ControllerBase
    {
        private readonly ButikContext _context;

        public PeopleCategoryController(ButikContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var cats = _context.PeopleCategories.ToList();
            return StatusCode(StatusCodes.Status200OK, cats);
        }

        [HttpPost("/category")]
        [Authorize(Roles = "Employee")]
        public PeopleCategory AddCategory(PeopleCategory cat)
        {
            _context.PeopleCategories.Add(cat);
            _context.SaveChanges();

            return cat;
        }

        [HttpPut("/category")]
        [Authorize(Roles = "Employee")]
        public PeopleCategory UpdateCategory(PeopleCategory cat)
        {
            _context.PeopleCategories.Update(cat);
            _context.SaveChanges();

            return cat;
        }

        [HttpDelete("/category/{id}")]
        [Authorize(Roles = "Employee")]
        public PeopleCategory DeleteCategory(int id)
        {
            PeopleCategory catForDelete = _context.PeopleCategories.Find(id);
            _context.PeopleCategories.Remove(catForDelete);
            _context.SaveChanges();

            return catForDelete;
        }
    }
}
