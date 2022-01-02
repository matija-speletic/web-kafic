import { Proizvod } from "./Proizvod.js";

export class ListaNarucenih {
    constructor() {
        this.naruceniProizvodi = [];
        this.container = null;
        this.naruceniContainer = null;
    }

    crtajListuNarucenih(host) {
        this.container = host;

        let okvirListe = document.createElement("div");
        okvirListe.className = "okvir_liste";
        this.container.appendChild(okvirListe);

        this.naruceniContainer = document.createElement("ul");
        this.naruceniContainer.className = "lista_proizvoda";
        okvirListe.appendChild(this.naruceniContainer);
    }

    dodajProizvodUListu(proizvod) {
        let proizvodUListi = this.naruceniProizvodi.filter(p => p.id == proizvod.id);
        if (proizvodUListi.length == 0)
            this.naruceniProizvodi.push(new Proizvod(proizvod.id, proizvod.naziv, proizvod.cena, proizvod.kategorija, proizvod.kolicina, proizvod.jedinica, proizvod.brojIzabranih));
        //izmeni u find eventualno
        else
            proizvodUListi[0].uvecajBrojIzabranih();
        //this.prikaziListuNarucenih();
    }

    ukloniProizvodIzListe(proizvod) {
        let trazeniProizvod = this.naruceniProizvodi.find(p => p.id === proizvod.id);
        if (trazeniProizvod === null || trazeniProizvod === undefined)
            return;
        if (trazeniProizvod.brojIzabranih === 1) {
            this.naruceniProizvodi = this.naruceniProizvodi
                .filter(p => p != trazeniProizvod);
        }
        else if (trazeniProizvod.brojIzabranih > 1) {
            trazeniProizvod.umanjiBrojIzabranih();
        }
        //this.prikaziListuNarucenih();
    }

    prikaziListuNarucenih() {
        //this.naruceniContainer.innerHTML = "";
        this.isprazniListu();
        this.naruceniProizvodi.forEach(proizvod => {
            proizvod.prikaziProizvodShort(this);
            /*let stavkaListe = document.createElement("li");
            stavkaListe.className = "stavka_menija";
            this.naruceniContainer.appendChild(stavkaListe);

            let nazivStavke = document.createElement("span");
            nazivStavke.innerHTML = proizvod.naziv;
            stavkaListe.appendChild(nazivStavke);

            let cenaStavke = document.createElement("span");
            cenaStavke.className = "cena";
            cenaStavke.innerHTML = proizvod.cena + ".00 x " + proizvod.brojIzabranih;
            stavkaListe.appendChild(cenaStavke);*/
        });

    }

    isprazniListu() {
        while (this.naruceniContainer.firstChild)
            this.naruceniContainer.removeChild(this.naruceniContainer.firstChild);
    }
}