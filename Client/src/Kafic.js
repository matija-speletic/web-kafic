import { Sto } from "./Sto.js";
import { ListaNarucenih } from "./ListaNarucenih.js";

export class Kafic {
    constructor(id, naziv = "", adresa = "", dimenzijaX = 0, dimenzijaY = 0) {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.dimenzijaX = dimenzijaX;
        this.dimenzijaY = dimenzijaY;
        this.container = null;
        this.listaNarucenih = null;
        this.stolovi = [];
        this.selektovanaNarudzbinaID = -1;
        this.selektovaniSto = null;
    }

    crtajKafic(host) {
        this.container = document.createElement("div");
        this.container.className = "card";
        this.container.classList.add("card2");
        host.style = "flex-direction:column;"
        host.appendChild(this.container);

        let divZaFormu = document.createElement("div");
        this.container.appendChild(divZaFormu);
        divZaFormu.className = "okvir_forme_kafica";

        let naslov = document.createElement("h2");
        naslov.className = "naslov_kafic";
        naslov.innerHTML = this.naziv;
        divZaFormu.appendChild(naslov);

        let labela = document.createElement("label");
        labela.className = "naslov_kafic";
        labela.innerHTML = "Naruceni proizvodi:";
        divZaFormu.appendChild(labela);

        let br = document.createElement("br");
        divZaFormu.appendChild(br);

        this.listaNarucenih = new ListaNarucenih();
        this.listaNarucenih.crtajListuNarucenih(divZaFormu);
        this.listaNarucenih.container.querySelector(".okvir_liste").classList.add("okvir_liste_novi");

        let divZaNapojnicu = document.createElement("div");
        divZaNapojnicu.className = "napojnica";
        divZaNapojnicu.innerHTML = "Napojnica: ";
        divZaFormu.appendChild(divZaNapojnicu);

        let napojnicaIznos = document.createElement("span");
        napojnicaIznos.innerHTML = "0.00";
        napojnicaIznos.className = "ukupan_iznos";
        divZaNapojnicu.appendChild(napojnicaIznos);

        let divZaUkupno = document.createElement("div");
        divZaUkupno.className = "ukupno";
        divZaFormu.appendChild(divZaUkupno);

        let ukupnoSpan = document.createElement("span");
        ukupnoSpan.innerHTML = "Ukupno:";
        divZaUkupno.appendChild(ukupnoSpan);

        let ukupanIznos = document.createElement("span");
        ukupanIznos.innerHTML = "0.00";
        ukupanIznos.className = "ukupan_iznos";
        divZaUkupno.appendChild(ukupanIznos);

        labela = document.createElement("div");
        labela.className = "uputstvo_labela";
        labela.innerHTML = "Uputstvo:";
        divZaFormu.appendChild(labela);

        let divZaKonobara = document.createElement("div");
        divZaKonobara.className = "ukupno";
        divZaFormu.appendChild(divZaKonobara);

        let konobarSpan = document.createElement("span");
        konobarSpan.innerHTML = "Konobar:";
        divZaKonobara.appendChild(konobarSpan);

        let konobarSelect = document.createElement("select");
        //konobarSelect.innerHTML = "";
        konobarSelect.className = "input_box";
        konobarSelect.classList.add("konobar_nadimak");
        divZaKonobara.appendChild(konobarSelect);
        this.ucitajKonobare(konobarSelect);

        this.crtajKontrole(divZaFormu);

        fetch("https://localhost:5001/Kafic/PreuzmiStolove/" + this.id, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                //console.log(s);
                s.json().then(listaStolova => {
                    //console.log(listaStolova);
                    this.crtajStolove(listaStolova);

                });
            }
        })


    }

    crtajStolove(listaStolova) {
        //console.log(listaStolova);

        let divZaTabelu = document.createElement("div");
        divZaTabelu.className = "okvir_tabele";
        this.container.appendChild(divZaTabelu);

        let tabelaStolova = document.createElement("table");
        tabelaStolova.className = "tabela_stolova";
        divZaTabelu.appendChild(tabelaStolova);

        let redStolova;
        for (let i = 0; i < this.dimenzijaY; i++) {
            redStolova = document.createElement("tr");
            tabelaStolova.appendChild(redStolova);
            for (let j = 0; j < this.dimenzijaX; j++) {

                let sto = new Sto(listaStolova.find(s => s.xPozicija == i && s.yPozicija == j));
                //console.log(sto);
                this.stolovi.push(sto);
                sto.crtajSto(redStolova, this.listaNarucenih, this);

            }
        }
    }

    crtajKontrole(divZaFormu) {
        let okvirDugmica = document.createElement("span");
        okvirDugmica.className = "okvir_dugmica";
        divZaFormu.appendChild(okvirDugmica);

        let dugmeIzvrsi = document.createElement("button");
        dugmeIzvrsi.className = "glavno_dugme";
        dugmeIzvrsi.innerHTML = "Naplati";
        dugmeIzvrsi.addEventListener("click", () => {
            this.izvrsiNarudzbinu();

        });
        okvirDugmica.appendChild(dugmeIzvrsi);

        let dugmeDodaj = document.createElement("button");
        dugmeDodaj.className = "glavno_dugme";
        dugmeDodaj.innerHTML = "Dodaj";
        dugmeDodaj.addEventListener("click", () => {
            this.dodajNarudzbinu();
        });
        okvirDugmica.appendChild(dugmeDodaj);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "glavno_dugme";
        dugmeObrisi.classList.add("dugme_brisanje");
        dugmeObrisi.innerHTML = "Obrisi";
        dugmeObrisi.addEventListener("click", event => {
            this.obrisiNarudzbinu();
        });
        okvirDugmica.appendChild(dugmeObrisi);

        let dugmeNazad = document.createElement("button");
        dugmeNazad.className = "dugme";
        dugmeNazad.innerHTML = "Nazad";
        dugmeNazad.onclick = () => {
            window.open("http://127.0.0.1:5500/Client/pocetniMeniPage.html", '_self');
        }
        okvirDugmica.appendChild(dugmeNazad);
    }

    izvrsiNarudzbinu() {
        if (this.selektovanaNarudzbinaID < 0) {
            alert("Morate selektovati zauzet sto!");
            return;
        }
        fetch("https://localhost:5001/Narudzbina/IzvrsiNarudzbinu/" + this.selektovanaNarudzbinaID + "/" + this.selektovaniSto.id, {
            method: "PUT"
        }).then(s => {
            if (s.ok) {
                alert("Narudzbina uspesno izvrsena!");
                //window.location.reload();
                this.selektovaniSto.promeniStanje();
                this.ocistiKontrole();
            }
            else
                alert("Doslo je do greske!");
        });
    }

    obrisiNarudzbinu() {
        if (this.selektovanaNarudzbinaID < 0) {
            alert("Morate selektovati zauzet sto!");
            return;
        }
        fetch("https://localhost:5001/Narudzbina/ObrisiNarudzbinu/" + this.selektovanaNarudzbinaID + "/" + this.selektovaniSto.id, {
            method: "DELETE"
        }).then(s => {
            if (s.ok) {
                alert("Narudzbina uspesno obrisana!");
                //window.location.reload();
                this.selektovaniSto.promeniStanje();
                this.ocistiKontrole();
            }
            else
                alert("Doslo je do greske!");
        });
    }

    dodajNarudzbinu() {
        if (this.selektovaniSto == null || this.selektovaniSto.slobodan == false) {
            alert("Morate izabrati slobodan sto");
            return;
        }
        let nadimakKonobara = this.container.querySelector(".konobar_nadimak").value;
        let stranicaZaDodavanje = "http://127.0.0.1:5500/Client/orderPage.html?nazivKafica=" + this.naziv + "&x="
            + this.selektovaniSto.x + "&y=" + this.selektovaniSto.y;
        if (nadimakKonobara !== "")
            stranicaZaDodavanje += "&nadimakKonobara=" + nadimakKonobara;
        stranicaZaDodavanje = encodeURI(stranicaZaDodavanje);
        window.open(stranicaZaDodavanje, '_blank').focus();
    }

    ocistiKontrole() {
        this.container.querySelector(".ukupno .ukupan_iznos").innerHTML = "0.00";
        this.container.querySelector(".napojnica .ukupan_iznos").innerHTML = "0.00";
        this.listaNarucenih.isprazniListu();
        this.container.querySelector(".lista_proizvoda").innerHTML = "Sto je slobodan...";
        this.container.querySelector(".uputstvo_labela").innerHTML = "Uputstvo: ";
        let konobarSelect = this.container.querySelector(".konobar_nadimak");
        konobarSelect.value = "";
        konobarSelect.disabled = false;
        this.selektovanaNarudzbinaID = -1;
    }

    ucitajKonobare(konobarSelect) {
        fetch("https://localhost:5001/Konobar/PreuzmiKonobare/" + this.id, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(konobari => {
                    konobari.forEach(konobar => {
                        let konobarOption = document.createElement("option");
                        konobarOption.innerHTML = konobar.ime + " " + konobar.prezime;
                        konobarOption.value = konobar.nadimak;
                        konobarSelect.appendChild(konobarOption);
                    });
                    konobarSelect.value = "";
                    konobarSelect.disabled = true;
                })
            }
            else {
                alert("Doslo je do greske!");
            }
        })
    }

}