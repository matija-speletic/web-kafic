using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Proizvod
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        [Range(0, 30000)]
        public int Cena { get; set; }

        [Range(0.0, 2000.0)]
        public float Kolicina { get; set; }

        [RegularExpression("(ml|gr|kom|l)")]
        public string Jedinica { get; set; }

        [MaxLength(250)]
        public string Opis { get; set; }

        //[JsonIgnore]
        public virtual List<SpojNarudzbinaProizvod> NarudzbinaProizvod { get; set; }

        public virtual KategorijaProizvoda Kategorija { get; set; }
    }
}