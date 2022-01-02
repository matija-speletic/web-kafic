using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Kafic
    {
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [MaxLength(100)]
        public string Adresa { get; set; }

        [Required]
        [Range(1,50)]
        public int DimenzijaX { get; set; }

        [Required]
        [Range(1,50)]
        public int DimenzijaY { get; set; }

        List<Sto> Stolovi{ get; set; }

        List<Konobar> Konobari{ get; set; }
        
    }
}