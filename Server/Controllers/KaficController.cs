using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace KaficServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KaficController : ControllerBase
    {
        public KaficContext Context { get; set; }

        public KaficController(KaficContext context)
        {
            Context = context;
        }

        

        [Route("PreuzmiStolove/{idKafica}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiStolove(int idKafica)
        {
            try
            {
                if (!Context.Kafici.Any(k => k.ID == idKafica))
                {
                    return BadRequest("Kafic ne postoji");
                }

                return Ok(
                    await Context.Stolovi.
                    Where(s => s.Kafic.ID == idKafica).
                    Select(s =>
                        new
                        {
                            ID = s.ID,
                            BrojOsoba = s.BrojOsoba,
                            DozvoljenoPusenje = s.DozvoljenoPusenje,

                            XPozicija = s.PozicijaX,
                            YPozicija = s.PozicijaY,
                            Slobodan = s.Slobodan
                        }
                    ).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }

        }

        [Route("PreuzmiKafice")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKafice()
        {
            try
            {
                return Ok(await Context.Kafici.ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }
    }
}