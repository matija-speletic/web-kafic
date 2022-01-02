export class Proizvod {
    constructor(id, naziv = "", cena = 0, kategorija = -1, kolicina = 0, jedinica = "", brojIzabranih = 0, opis = "") {
        this.id = id;
        this.naziv = naziv;
        this.cena = cena;
        this.kategorija = kategorija;
        this.kolicina = kolicina;
        this.jedinica = jedinica;
        this.brojIzabranih = brojIzabranih;
        this.opis = opis;
    }

    uvecajBrojIzabranih(broj = 1) {
        this.brojIzabranih += broj;
    }

    umanjiBrojIzabranih(broj = 1) {
        if (this.brojIzabranih > 0)
            this.brojIzabranih -= broj;
    }

    prikaziDetalje() {
        let info = this.naziv + "\nKolicina: " + this.kolicina + this.jedinica;
        if (this.opis != null && this.opis != "")
            info += "\n\n" + this.opis;
        alert(info);
    }

    prikaziProizvod(saKontrolama = true, naKlik = undefined, lista) {
        let stavkaListe = document.createElement("li");
        stavkaListe.className = "stavka_menija";

        if (!saKontrolama)
            stavkaListe.addEventListener("click", () => {
                //this.prikaziProizvodUFormi(proizvod);
                naKlik(this);
                lista.selektovaniProizvod = this;
            });
        lista.listaContainer.appendChild(stavkaListe);


        if (saKontrolama) {
            let dugmeUkloni = document.createElement("button");
            dugmeUkloni.className = "ukloni_proizvod";
            dugmeUkloni.innerHTML = "-";
            dugmeUkloni.value = this.id;
            dugmeUkloni.addEventListener("click", event => {
                //console.log(this.narudzbinaForma.listaNarucenih);
                this.umanjiBrojIzabranih();
                if (this.brojIzabranih > 0) {
                    cenaStavke.innerHTML = this.cena + ".00 x " + (this.brojIzabranih);
                }
                else {
                    cenaStavke.innerHTML = this.cena + ".00";
                    stavkaListe.style = "transition: 0.3s;background-color: none;";
                }
                lista.narudzbinaForma.ukloniProizvodIzNarudzbine(this);

            });

            stavkaListe.appendChild(dugmeUkloni);

        }

        let nazivStavke = document.createElement("span");
        nazivStavke.innerHTML = this.naziv;
        if (saKontrolama) {
            nazivStavke.addEventListener("click", () => proizvod.prikaziDetalje());
            stavkaListe.title = "Kliknite na naziv proizvoda za detalje";
        }
        stavkaListe.appendChild(nazivStavke);


        if (saKontrolama) {
            let dugmeDodaj = document.createElement("button");
            dugmeDodaj.className = "dodaj_proizvod";
            dugmeDodaj.innerHTML = "+";
            dugmeDodaj.value = this.id;
            dugmeDodaj.addEventListener("click", event => {
                this.uvecajBrojIzabranih();
                cenaStavke.innerHTML = this.cena + ".00 x " + this.brojIzabranih;
                stavkaListe.style = "transition: 0.3s;background-color: rgba(0, 0, 0, 0.55);";
                lista.narudzbinaForma.dodajProizvodUNarudzbinu(this);
                //console.log(this.narudzbinaForma.listaNarucenih);
            });

            stavkaListe.appendChild(dugmeDodaj);
        }

        if (this.brojIzabranih > 0) {
            stavkaListe.style = "transition: 0.3s;background-color: rgba(0, 0, 0, 0.55);";
        }

        let cenaStavke = document.createElement("span");
        cenaStavke.className = "cena";
        cenaStavke.innerHTML = this.brojIzabranih == 0 ?
            this.cena + ".00" :
            this.cena + ".00 x " + this.brojIzabranih;
        stavkaListe.appendChild(cenaStavke);
    }

    prikaziProizvodShort(lista) {
        let stavkaListe = document.createElement("li");
            stavkaListe.className = "stavka_menija";
            lista.naruceniContainer.appendChild(stavkaListe);

            let nazivStavke = document.createElement("span");
            nazivStavke.innerHTML = this.naziv;
            stavkaListe.appendChild(nazivStavke);

            let cenaStavke = document.createElement("span");
            cenaStavke.className = "cena";
            cenaStavke.innerHTML = this.cena + ".00 x " + this.brojIzabranih;
            stavkaListe.appendChild(cenaStavke);
    }

}