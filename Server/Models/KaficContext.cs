using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class KaficContext : DbContext
    {

        public DbSet<Kafic> Kafici { get; set; }

        public DbSet<Konobar> Konobari { get; set; }

        public DbSet<Proizvod> Proizvodi { get; set; }

        public DbSet<Sto> Stolovi { get; set; }

        public DbSet<Narudzbina> Narudzbine { get; set; }

        public DbSet<SpojNarudzbinaProizvod> NarudzbineProizvodi { get; set; }

        public DbSet<KategorijaProizvoda> Kategorije { get; set; }

        public KaficContext(DbContextOptions options) : base(options)
        {

        }
    }
}