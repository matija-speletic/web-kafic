using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Konobar
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }

        [MaxLength(50)]
        public string Nadimak { get; set; }

        [Range(0, 100000)]
        public int Plata { get; set; }

        //[JsonIgnore]
        public virtual List<Narudzbina> NarudzbineKonobar { get; set; }

        public virtual Kafic Kafic { get; set; }

        //public virtual List<Sto> ZaduzeniStolovi { get; set; }
    }
}