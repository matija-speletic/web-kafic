using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Sto
    {
        [Key]
        public int ID { get; set; }

        [Range(1, 15)]
        public int BrojOsoba { get; set; }

        public bool DozvoljenoPusenje { get; set; }

        [Range(1, 50)]
        public int PozicijaX { get; set; }

        [Range(1, 50)]
        public int PozicijaY { get; set; }

        public bool Slobodan { get; set; }

        public virtual Kafic Kafic { get; set; }

        //[JsonIgnore]
        public virtual List<Narudzbina> NarudzbineSto { get; set; }

        //public virtual Konobar ZaduzeniKonobar { get; set; }

    }
}