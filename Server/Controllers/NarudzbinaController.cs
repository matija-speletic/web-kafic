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
    public class NarudzbinaController : ControllerBase
    {
        public KaficContext Context { get; set; }

        public NarudzbinaController(KaficContext context)
        {
            Context = context;
        }



        [Route("DodajNapojnicu/{idNarudzbine}/{napojnica}")]
        [HttpPut]
        public async Task<ActionResult> DodajNapojnicu(int idNarudzbine, int napojnica)
        {
            if (idNarudzbine < 0 || !Context.Narudzbine.Any(n => n.ID == idNarudzbine))
            {
                return BadRequest("ID nije validan");
            }
            if (napojnica < 0 || napojnica > 1000)
            {
                napojnica = 0;
            }
            try
            {
                var narudzbina = await Context.Narudzbine.FindAsync(idNarudzbine);
                narudzbina.Napojnica = napojnica;
                Context.Narudzbine.Update(narudzbina);
                await Context.SaveChangesAsync();
                return Ok("Napojnica je dodata");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }





        [Route("DodajNarudzbinu/{nazivKafica}/{xStola}/{yStola}")]
        [HttpPost]
        public async Task<ActionResult> DodajNarudzbinu(string nazivKafica, int xStola, int yStola, [FromQuery] int[] proizvodi, string nadimakKonobara, int napojnica, string uputstvo)
        {
            if (xStola < 0 || yStola < 0)
            {
                return BadRequest("Pozicija stola nije validna");
            }
            try
            {
                var kafic = await Context.Kafici
                    .Where(k => k.Naziv == nazivKafica)
                    .FirstOrDefaultAsync();
                var sto = await Context.Stolovi
                    .Where(s => s.PozicijaX == xStola && s.PozicijaY == yStola && s.Kafic.Naziv == nazivKafica)
                    .FirstOrDefaultAsync();
                if (sto == null || kafic == null)
                {
                    return BadRequest("Sto na ovoj poziciji ne postoji!");
                }
                if (!sto.Slobodan)
                {
                    return BadRequest("Sto koji zahtevate je trenutno zauzet");
                }
                Konobar konobar = await Context.Konobari
                    .Where(k => k.Nadimak == nadimakKonobara && k.Kafic.Naziv == nazivKafica)
                    .FirstOrDefaultAsync();
                if (konobar == null)
                {

                    konobar = await Context.Konobari.
                        Where(k => k.Kafic.ID == kafic.ID).
                        OrderBy(x => Guid.NewGuid()).
                        Take(1).
                        FirstOrDefaultAsync();
                }
                sto.Slobodan = false;
                var narudzbina = new Narudzbina
                {
                    Vreme = DateTime.Now,
                    Konobar = konobar,
                    Sto = sto,
                    Napojnica = napojnica,
                    DodatnoUputstvo = uputstvo,
                    Izvrsena = false
                };
                Context.Narudzbine.Add(narudzbina);
                foreach (int proizvod in proizvodi)
                {
                    SpojNarudzbinaProizvod stavka = new SpojNarudzbinaProizvod
                    {
                        Narudzbina = narudzbina,
                        Proizvod = await Context.Proizvodi.FindAsync(proizvod)
                    };
                    Context.NarudzbineProizvodi.Add(stavka);
                }
                await Context.SaveChangesAsync();
                return Ok(narudzbina.ID);

            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }

        }

        [Route("IzvrsiNarudzbinu/{idNarudzbine}/{idStola}")]
        [HttpPut]
        public async Task<ActionResult> IzvrsiNarudzbinu(int idNarudzbine, int idStola)
        {
            if (idNarudzbine <= 0 || !Context.Narudzbine.Any(n => n.ID == idNarudzbine))
            {
                return BadRequest("ID narudzbine nije validan");
            }
            if (idStola <= 0 || !Context.Stolovi.Any(s => s.ID == idStola))
            {
                return BadRequest("ID stola nije validan");
            }
            try
            {
                var narudzbina = await Context.Narudzbine.FindAsync(idNarudzbine);
                if (narudzbina == null)
                {
                    return BadRequest("Narudzbina nije pronadjena");
                }
                //var sto = await Context.Stolovi.Where(s => s.ID == narudzbina.Sto.ID).FirstOrDefaultAsync();
                //sto.Slobodan = true;
                var sto = await Context.Stolovi.FindAsync(idStola);
                if (sto == null)
                {
                    return BadRequest("Sto nije pronadjena");
                }
                narudzbina.Izvrsena = true;
                sto.Slobodan = true;
                await Context.SaveChangesAsync();
                return Ok("Narudzbina je uspesno izvrsena");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("ObrisiNarudzbinu/{idNarudzbine}/{idStola}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiNarudzbinu(int idNarudzbine, int idStola)
        {
            if (idNarudzbine <= 0 || !Context.Narudzbine.Any(n => n.ID == idNarudzbine))
            {
                return BadRequest("ID narudzbine nije validan");
            }
            if (idStola <= 0 || !Context.Stolovi.Any(s => s.ID == idStola))
            {
                return BadRequest("ID stola nije validan");
            }
            try
            {
                foreach (var red in Context.NarudzbineProizvodi.Where(p => p.Narudzbina.ID == idNarudzbine))
                {
                    Context.NarudzbineProizvodi.Remove(red);
                }
                var narudzbina = await Context.Narudzbine.FindAsync(idNarudzbine);
                if (narudzbina == null)
                {
                    return BadRequest("Narudzbina nije pronadjena");
                }
                var sto = await Context.Stolovi.FindAsync(idStola);
                if (sto == null)
                {
                    return BadRequest("Sto nije pronadjena");
                }
                sto.Slobodan = true;
                Context.Narudzbine.Remove(narudzbina);
                await Context.SaveChangesAsync();
                return Ok("Narudzbina je uspesno obrisana");
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }

        [Route("PreuzmiNarudzbinuSaStola/{idStola}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiNarudzbinuSaStola(int idStola)
        {
            try
            {
                if (idStola <= 0 || !Context.Stolovi.Any(s => s.ID == idStola))
                {
                    return BadRequest("ID stola nije validan");
                }
                var narudzbine = Context.Narudzbine
                .Where(p => p.Izvrsena == false)
                .Include(p => p.Konobar)
                .Include(p => p.NarudzbinaProizvod.Where(q => q.Narudzbina.ID == p.ID))
                .ThenInclude(p => p.Proizvod)
                .Include(p => p.Sto)
                .ThenInclude(p => p.Kafic)
                .Where(p => p.Sto.ID == idStola);

                return Ok
                (
                    await narudzbine//Context.Narudzbine
                                    //.Where(n => n.Vreme.Date == datum.Date)
                    .Select(p =>
                        new
                        {
                            ID = p.ID,
                            Kafic = p.Sto.Kafic.Naziv,
                            Vreme = p.Vreme,
                            DodatnoUputstvo = p.DodatnoUputstvo,
                            Napojnica = p.Napojnica,
                            Konobar = new
                            {
                                ID = p.Konobar.ID,
                                Nadimak = p.Konobar.Nadimak
                            },
                            StoID = p.Sto.ID,
                            Proizvodi = p.NarudzbinaProizvod
                            //.Where(q => q.Narudzbina.ID == p.ID)
                            .Select(q =>
                                new
                                {
                                    ID = q.Proizvod.ID,
                                    Naziv = q.Proizvod.Naziv,
                                    Cena = q.Proizvod.Cena
                                }
                            )
                        }

                    ).FirstOrDefaultAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }




    }
}