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
    public class ProizvodController : ControllerBase
    {
        public KaficContext Context { get; set; }

        public ProizvodController(KaficContext context)
        {
            Context = context;
        }

        [Route("PreuzmiKategorije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKategorije()
        {
            try
            {
                return Ok
                (
                    await Context.Kategorije.Select(p =>
                        new
                        {
                            ID = p.ID,
                            Naziv = p.Naziv
                        }
                    ).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }



        [Route("DodajProizvod")]
        [HttpPost]
        public async Task<ActionResult> DodajProizvod([FromQuery] string naziv, int cena, float kolicina, string jedinica, string opis, int idKategorije)
        {
            if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Naziv nije validan");
            }
            if (cena < 0 || cena > 30000)
            {
                return BadRequest("Cena nije validna");
            }
            if (kolicina < 0.0 || kolicina > 2000.0)
            {
                return BadRequest("Kolicina nije validna");
            }
            if (jedinica != null && !System.Text.RegularExpressions.Regex.IsMatch(jedinica, "ml|gr|kom|l"))//eventualno dodaj komad
            {
                return BadRequest("Jedinica nije validna");
            }
            if (opis != null && (opis.Length > 250))
            {
                return BadRequest("Opis nije validan");
            }
            if (idKategorije < 0)
            {
                return BadRequest("Kategorija nije validna");
            }
            try
            {
                var proizvod = new Proizvod
                {
                    Naziv = naziv,
                    Cena = cena,
                    Kolicina = kolicina,
                    Jedinica = jedinica,
                    Opis = opis,
                    Kategorija = await Context.Kategorije.FindAsync(idKategorije)
                };
                Context.Proizvodi.Add(proizvod);
                await Context.SaveChangesAsync();
                return Ok(proizvod.ID);
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PreuzmiProizvode/{idKategorije}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiProizvode(int idKategorije)
        {
            if (idKategorije < 0)
            {
                return BadRequest("ID kategorije nije validan");
            }
            try
            {
                return Ok
                (
                    await Context.Proizvodi
                    .Where(p => p.Kategorija.ID == idKategorije)
                    .Select(p =>
                        new
                        {
                            ID = p.ID,
                            Naziv = p.Naziv,
                            Cena = p.Cena,
                            IDKategorije = p.Kategorija.ID,
                            NazivKategorije = p.Kategorija.Naziv,
                            Kolicina = p.Kolicina,
                            Jedinica = p.Jedinica,
                            Opis = p.Opis
                        }
                    ).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("ObrisiProizvod/{idProizvoda}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiProizvod(int idProizvoda)
        {
            if (idProizvoda < 0)
            {
                return BadRequest("ID nije validan");
            }
            try
            {
                var proizvod = await Context.Proizvodi.FindAsync(idProizvoda);
                if (proizvod == null)
                    return BadRequest("Proizvod sa ovim ID ne postoji");
                string naziv = new string(proizvod.Naziv);
                Context.Proizvodi.Remove(proizvod);
                await Context.SaveChangesAsync();
                return Ok($"Proizvod {naziv} je uspesno obrisan!");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PromeniProizvod")]
        [HttpPut]
        public async Task<ActionResult> PromeniProizvod([FromBody] Proizvod proizvod)
        {
            if (string.IsNullOrWhiteSpace(proizvod.Naziv) || proizvod.Naziv.Length > 50)
            {
                return BadRequest("Naziv nije validan");
            }
            if (proizvod.Cena < 0 || proizvod.Cena > 30000)
            {
                return BadRequest("Cena nije validna");
            }
            if (proizvod.Kolicina < 0.0 || proizvod.Kolicina > 2000.0)
            {
                return BadRequest("Kolicina nije validna");
            }
            if (proizvod.Jedinica != null && !System.Text.RegularExpressions.Regex.IsMatch(proizvod.Jedinica, "ml|gr|kom|l"))//eventualno dodaj komad
            {
                return BadRequest("Jedinica nije validna");
            }
            if (proizvod.Opis != null && (proizvod.Opis.Length > 250))
            {
                return BadRequest("Opis nije validan");
            }
            try
            {
                Context.Proizvodi.Update(proizvod);
                await Context.SaveChangesAsync();
                return Ok($"Proizvod {proizvod.Naziv} je uspesno promenjen");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PreuzmiJedinice")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiJedinice()
        {
            try
            {
                return (Ok(
                    await Context.Proizvodi
                    .Select(p => p.Jedinica)
                    .Distinct()
                    .Where(p => p != null)
                    .ToListAsync()
                ));
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

    }
}
