import { ListaProizvoda } from "./ListaProizvoda.js";
import { Proizvod } from "./Proizvod.js";

export class ProizvodForma {
    constructor() {
        this.listaProizvoda = null;
        this.container = null;
    }

    crtajFormu(host) {
        this.container = host;
        this.listaProizvoda = new ListaProizvoda(this.container);
        this.listaProizvoda.crtajListu(host, false, this.prikaziProizvod, this.ucitajKategorije);

        let formaZaProizvod = document.createElement("div");
        formaZaProizvod.className = "proizvod_forma";
        this.container.appendChild(formaZaProizvod);

        let divZaNaziv = document.createElement("div");
        formaZaProizvod.appendChild(divZaNaziv);

        let nazivLabela = document.createElement("label");
        nazivLabela.innerHTML = "Naziv:";
        nazivLabela.className = "text_box_label"
        divZaNaziv.appendChild(nazivLabela);

        let poljeNaziv = document.createElement("input");
        poljeNaziv.type = "text";
        poljeNaziv.className = "input_box";
        divZaNaziv.appendChild(poljeNaziv);

        let divZaCenu = document.createElement("div");
        formaZaProizvod.appendChild(divZaCenu);

        let cenaLabela = document.createElement("label");
        cenaLabela.innerHTML = "Cena:";
        cenaLabela.className = "text_box_label"
        divZaCenu.appendChild(cenaLabela);

        let poljeCena = document.createElement("input");
        poljeCena.type = "number";
        poljeCena.className = "input_box";
        poljeCena.classList.add("cena_input");
        divZaCenu.appendChild(poljeCena);

        let divZaKolicinu = document.createElement("div");
        formaZaProizvod.appendChild(divZaKolicinu);

        let kolicinaLabela = document.createElement("label");
        kolicinaLabela.innerHTML = "Kolicina:";
        kolicinaLabela.className = "text_box_label"
        divZaKolicinu.appendChild(kolicinaLabela);

        let spanZaKolicinu = document.createElement("span");
        spanZaKolicinu.className = "kolicina";
        divZaKolicinu.appendChild(spanZaKolicinu);

        let poljeKolicina = document.createElement("input");
        poljeKolicina.type = "number";
        poljeKolicina.classList.add("input_box");
        poljeKolicina.classList.add("kolicina_input");
        spanZaKolicinu.appendChild(poljeKolicina);

        this.crtajSelectZaJedinicu(spanZaKolicinu);

        let divZaKategoriju = document.createElement("div");
        formaZaProizvod.appendChild(divZaKategoriju);

        let kategorijaLabela = document.createElement("label");
        kategorijaLabela.innerHTML = "Kategorija proizvoda:";
        kategorijaLabela.className = "text_box_label"
        divZaKategoriju.appendChild(kategorijaLabela);

        let poljeZaKategoriju = document.createElement("select");
        poljeZaKategoriju.classList.add("input_box");
        poljeZaKategoriju.classList.add("kategorija_select");
        divZaKategoriju.appendChild(poljeZaKategoriju);

        let uputstvoText = document.createElement("textarea");
        uputstvoText.classList.add("input_box");
        uputstvoText.classList.add("dodatno_uputstvo");
        uputstvoText.placeholder = "Opis proizvoda...";
        formaZaProizvod.appendChild(uputstvoText);

        let okvirDugmica = document.createElement("span");
        okvirDugmica.className = "okvir_dugmica";
        formaZaProizvod.appendChild(okvirDugmica);

        let dugmeDodaj = document.createElement("button");
        dugmeDodaj.className = "glavno_dugme";
        dugmeDodaj.innerHTML = "Dodaj stavku";
        dugmeDodaj.addEventListener("click", () => {
            this.dodajProizvod();
        });
        okvirDugmica.appendChild(dugmeDodaj);

        let dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.className = "glavno_dugme";
        dugmeIzmeni.innerHTML = "Izmeni stavku";
        dugmeIzmeni.addEventListener("click", () => {
            this.izmeniProizvod(this.listaProizvoda.selektovaniProizvod, this.listaProizvoda.listaKategorija);
        });
        okvirDugmica.appendChild(dugmeIzmeni);

        let dugmeUkloni = document.createElement("button");
        dugmeUkloni.className = "glavno_dugme";
        dugmeUkloni.classList.add("dugme_brisanje");
        dugmeUkloni.innerHTML = "Ukloni stavku";
        dugmeUkloni.addEventListener("click", event => {
            if (this.listaProizvoda.selektovaniProizvod == null || this.listaProizvoda.selektovaniProizvod == undefined)
                alert("Morate selektovati proizvod!");
            else {
                this.obrisiProizvod(this.listaProizvoda.selektovaniProizvod.id);
            }
        });
        okvirDugmica.appendChild(dugmeUkloni);

        let dugmeNazad = document.createElement("button");
        dugmeNazad.className = "dugme";
        dugmeNazad.innerHTML = "Nazad";
        dugmeNazad.onclick = () => {
            window.open("http://192.168.0.13:5500/Client/pocetniMeniPage.html", '_self');
        }
        okvirDugmica.appendChild(dugmeNazad);
    }

    crtajSelectZaJedinicu(spanZaKolicinu) {
        //const jedinice = ["gr", "kom", "l", "ml"];

        let poljeZaJedinicu = document.createElement("select");
        poljeZaJedinicu.classList.add("input_box");
        poljeZaJedinicu.classList.add("jedinica_input");
        spanZaKolicinu.appendChild(poljeZaJedinicu);

        fetch("https://192.168.0.13:5001/Proizvod/PreuzmiJedinice", {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(jedinice => {
                    let jedinicaOption;
                    //console.log(jedinice);
                    jedinice.forEach(jed => {
                        jedinicaOption = document.createElement("option");
                        jedinicaOption.innerHTML = jed;
                        poljeZaJedinicu.appendChild(jedinicaOption);
                    });
                })
            }
        })


    }

    prikaziProizvod(proizvod) {

        let opcijaJedinica = document.querySelector("option[value=\"" + proizvod.kategorija + "\"]");
        document.querySelector(".kategorija_select").value = opcijaJedinica.value;

        let nazivPolje = document.querySelector('input[type="text"]');
        nazivPolje.value = proizvod.naziv;

        let cenaPolje = document.querySelector('.cena_input');
        cenaPolje.value = parseFloat(proizvod.cena).toFixed(2);

        let kolicinaPolje = document.querySelector('.kolicina_input');
        kolicinaPolje.value = proizvod.kolicina;

        let jedinicaPolje = document.querySelector('.jedinica_input');
        jedinicaPolje.value = proizvod.jedinica;

        let poljeOpis = document.querySelector('textarea');
        poljeOpis.value = proizvod.opis;

    }

    ucitajKategorije(lista) {
        let kategorijaOption;
        let selectBoxKategorija = document.querySelector(".kategorija_select")
        lista.forEach(kategorija => {
            kategorijaOption = document.createElement("option");
            kategorijaOption.innerHTML = kategorija.naziv;
            kategorijaOption.value = kategorija.id;
            selectBoxKategorija.appendChild(kategorijaOption);
        });
    }

    dodajProizvod() {
        let naziv = this.container.querySelector('input[type="text"]').value;
        let cena = this.container.querySelector('.cena_input').value;
        let kolicina = this.container.querySelector('.kolicina_input').value;
        let jedinica = this.container.querySelector('.jedinica_input').value;
        let kategorijaID = this.container.querySelector('.kategorija_select').value;
        let opis = this.container.querySelector('textarea').value;
        let postRequest = `https://192.168.0.13:5001/Proizvod/DodajProizvod?naziv=${naziv}&cena=${parseInt(cena)}&kolicina=${kolicina}&jedinica=${jedinica}&opis=${opis}&idKategorije=${kategorijaID}`;
        postRequest = encodeURI(postRequest);
        fetch(postRequest, { method: "POST" })
            .then(s => {
                if (s.ok) {
                    alert("Proizvod je uspesno dodat!");
                    s.json().then(idDodatog => {
                        if (this.container.querySelector('.kategorija').value == kategorijaID) {
                            let noviProizvod = new Proizvod(idDodatog, naziv, parseInt(cena), kategorijaID, kolicina, jedinica, 0, opis);
                            //console.log(this.listaProizvoda)
                            noviProizvod.prikaziProizvod(false, this.prikaziProizvod, this.listaProizvoda);
                        }
                    })
                }
                else
                    alert("Doslo je do greske!");
            });
    }

    izmeniProizvod(selektovaniProizvod, listaKategorija) {
        if (selektovaniProizvod == null || selektovaniProizvod == undefined) {
            alert("Morate prethodno selektovati neki proizvod!");
        }
        else {
            let naziv = this.container.querySelector('input[type="text"]').value;
            let cena = this.container.querySelector('.cena_input').value;
            let kolicina = this.container.querySelector('.kolicina_input').value;
            let jedinica = this.container.querySelector('.jedinica_input').value;
            let kategorijaID = this.container.querySelector('.kategorija_select').value;
            let kategorijaNaziv = listaKategorija.find(k => k.id == kategorijaID).naziv;
            let opis = this.container.querySelector('textarea').value;
            var zaSlanje = {
                id: selektovaniProizvod.id,
                naziv: naziv,
                cena: parseInt(cena),
                kolicina: kolicina,
                jedinica: jedinica,
                opis: opis,
                kategorija: {
                    id: kategorijaID,
                    naziv: kategorijaNaziv
                }
            };
            fetch("https://192.168.0.13:5001/Proizvod/PromeniProizvod", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(zaSlanje)
            }).then(s => {
                if (s.ok) {
                    alert("Proizvod uspesno izmenjen!");
                    //window.location.reload();
                    //isprazniListu i prikaziProizvode
                    this.listaProizvoda.isprazniListu();
                    this.listaProizvoda.ucitajProizvode(kategorijaID, false, this.prikaziProizvod);
                    this.container.querySelector('.kategorija').value = kategorijaID;
                }
                else
                    alert("Doslo je do greske!");
            });

        }

    }

    obrisiProizvod(idProizvoda) {
        fetch("https://192.168.0.13:5001/Proizvod/ObrisiProizvod/" + idProizvoda, {
            method: "DELETE"
        }).then(s => {
            if (s.ok) {
                alert("Proizvod je uspesno obrisan!");
                //window.location.reload();
                let proizvod = this.listaProizvoda.proizvodi
                    .find(p => p.id == idProizvoda);
                this.listaProizvoda.listaContainer.removeChild(proizvod.container);
            }
            else
                alert("Doslo je do greske prilikom brisanja!");
        })
    }
}