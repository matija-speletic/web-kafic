import { Kategorija } from "./Kategorija.js";
import { Proizvod } from "./Proizvod.js";

export class ListaProizvoda {
    constructor(narudzbinaForma = null) {
        this.proizvodi = [];
        this.container = null;
        this.listaContainer = null;
        this.listaKategorija = [];
        this.narudzbinaForma = narudzbinaForma;
        this.selektovaniProizvod = null;
    }

    crtajListu(host, saKontrolama = true, naKlik = undefined, naUcitavanje = undefined) {
        let divZaListu = document.createElement("div");
        host.appendChild(divZaListu);
        this.container = host;

        let okvirKategorije = document.createElement("div");
        okvirKategorije.className = "okvir_kategorije";
        okvirKategorije.innerHTML = "Kategorija:";
        divZaListu.appendChild(okvirKategorije);

        let kategorijaSelect = document.createElement("select");
        kategorijaSelect.name = "kategorija_proizvoda";
        kategorijaSelect.classList.add("input_box");
        kategorijaSelect.classList.add("kategorija");
        okvirKategorije.appendChild(kategorijaSelect);

        let br = document.createElement("br");
        divZaListu.appendChild(br);

        let okvirListe = document.createElement("div");
        okvirListe.className = "okvir_liste";
        divZaListu.appendChild(okvirListe);

        let listaProizvoda = document.createElement("ul");
        listaProizvoda.className = "lista_proizvoda";
        okvirListe.appendChild(listaProizvoda);
        this.listaContainer = listaProizvoda;

        this.ucitajKategorije(kategorijaSelect, saKontrolama, naKlik, naUcitavanje);

    }

    ucitajKategorije(selectBox, saKontrolama = true, naKlik = undefined, naUcitavanje = undefined) {

        fetch("https://localhost:5001/Proizvod/PreuzmiKategorije", {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(data => {
                    //console.log(data);
                    let kategorijaOption;
                    data.forEach(kategorija => {
                        kategorijaOption = document.createElement("option");
                        kategorijaOption.innerHTML = kategorija.naziv;
                        kategorijaOption.value = kategorija.id;
                        selectBox.appendChild(kategorijaOption);
                        this.listaKategorija.push(new Kategorija(kategorija.id, kategorija.naziv));
                    });
                    if (!saKontrolama) {
                        //this.ubaciKategorijeUFormu(this.listaKategorija);
                        naUcitavanje(this.listaKategorija);
                    }
                    this.ucitajProizvode(this.listaKategorija[0].id, saKontrolama, naKlik);
                    selectBox.onchange = ev => {
                        this.isprazniListu();
                        this.ucitajProizvode(selectBox.value, saKontrolama, naKlik);
                    }
                });
            }
        });
    }

    ucitajProizvode(kategorijaID, saKontrolama = true, naKlik = undefined) {
        fetch("https://localhost:5001/Proizvod/PreuzmiProizvode/" + kategorijaID, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(data => {
                    //console.log(data);
                    this.proizvodi = [];
                    let izabraniProizvod;
                    let brojIzabranih = 0;
                    data.forEach(proizvod => {
                        //izmeni u find eventualno
                        if (saKontrolama) {
                            izabraniProizvod = this.narudzbinaForma.listaNarucenih.naruceniProizvodi
                                .filter(p => p.id === proizvod.id);
                            if (izabraniProizvod.length === 0)
                                brojIzabranih = 0;
                            else
                                brojIzabranih = izabraniProizvod[0].brojIzabranih;
                        }
                        this.proizvodi.push(new Proizvod(
                            proizvod.id,
                            proizvod.naziv,
                            proizvod.cena,
                            kategorijaID,
                            proizvod.kolicina,
                            proizvod.jedinica,
                            brojIzabranih,
                            proizvod.opis
                        ));
                    });
                    //console.log(this.proizvodi);
                    this.prikaziProizvode(saKontrolama, naKlik);
                });
            }
        });
    }

    prikaziProizvode(saKontrolama = true, naKlik = undefined) {
        this.proizvodi.forEach(proizvod => {
            proizvod.prikaziProizvod(saKontrolama, naKlik, this);
            
        });
    }

    isprazniListu() {
        while (this.listaContainer.firstChild)
            this.listaContainer.removeChild(this.listaContainer.firstChild);
    }

}