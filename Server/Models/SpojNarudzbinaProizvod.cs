using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class SpojNarudzbinaProizvod
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public virtual Proizvod Proizvod { get; set; }

        //[JsonIgnore]
        [Required]
        public virtual Narudzbina Narudzbina { get; set; }
    }
}