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
    public class KonobarController : ControllerBase
    {
        public KaficContext Context { get; set; }

        public KonobarController(KaficContext context)
        {
            Context = context;
        }

        [Route("PreuzmiStatistikuKonobara/{idKafica}/{datum}")]
        [HttpGet]//eventualno izdvoji vo u zaseban controller
        public async Task<ActionResult> PreuzmiStatistiku(int idKafica, DateTime datum)
        {
            try
            {
                var narudzbineCena = Context.Narudzbine //narudzbina zajedno sa ukupnom cenom
                .Where(n => n.Vreme.Date == datum.Date)
                .Join(
                    Context.NarudzbineProizvodi,
                    narudzbina => narudzbina.ID,
                    spoj => spoj.Narudzbina.ID,
                    (narudzbina, spoj) => new
                    {
                        IDNarudzbine = narudzbina.ID,
                        Cena = spoj.Proizvod.Cena
                    }
                )
                .GroupBy(p => p.IDNarudzbine)
                .Select(p =>
                    new
                    {
                        IDNarudzbine = p.Key,
                        Ukupno = p.Sum(q => q.Cena)
                    }
                );

                var statistika = narudzbineCena
                .Join(
                    Context.Narudzbine,
                    narCene => narCene.IDNarudzbine,
                    nar => nar.ID,
                    (narCene, nar) => new
                    {
                        nar.ID,
                        nar.Konobar,
                        nar.Napojnica,
                        narCene.Ukupno
                    }

                )
                .Where(p=>p.Konobar.Kafic.ID==idKafica)
                .GroupBy(p =>
                    new
                    {
                        Nadimak = p.Konobar.Nadimak,
                        Plata = p.Konobar.Plata,
                        Kafic = p.Konobar.Kafic.Naziv
                    }
                )
                .Select(p =>
                    new
                    {
                        Nadimak = p.Key.Nadimak,
                        Dnevnica = Math.Round(p.Key.Plata * 12 / 365.25, 2),
                        Kafic = p.Key.Kafic,                        //nadimak konobara
                        Napojnice = p.Sum(q => q.Napojnica),    //ukupna kolicina napojnicas koju je dobio
                        Ukupno = p.Sum(q => q.Ukupno),          //ukupnu zaradu kloju je ostvario
                        BrojUsluzenih = p.Count()                //broj stolova koji je usluzio
                    }
                );

                return Ok(await statistika.ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest("Doslo je do greske: " + e.Message);
            }
        }
    }
}