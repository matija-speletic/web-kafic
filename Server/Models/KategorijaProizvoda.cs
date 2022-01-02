using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class KategorijaProizvoda
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        public virtual List<Proizvod> ProizvodiKategorija { get; set; }
    }
}