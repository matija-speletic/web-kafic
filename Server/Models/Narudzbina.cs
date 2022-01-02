using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Narudzbina
    {
        [Key]
        public int ID { get; set; }

        [Range(0, 1000)]
        public int Napojnica { get; set; }

        [MaxLength(250)]
        public string DodatnoUputstvo { get; set; }

        public DateTime Vreme { get; set; }

        public bool Izvrsena{ get; set; }

        public virtual Konobar Konobar { get; set; }

        public virtual Sto Sto { get; set; }

        public virtual List<SpojNarudzbinaProizvod> NarudzbinaProizvod { get; set; }
    }
}