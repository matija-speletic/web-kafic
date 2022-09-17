import { Grafik } from "./Grafik.js";
import { ProizvodModal } from "./ProizvodModal.js";

export class Statistika {
    constructor() {
        this.container = null;
        this.grafik = null;
        this.podaci = null;

    }

    crtajStatistiku(host) {
        this.container = host;

        let kartica = document.createElement("div");
        kartica.classList.add("card");
        kartica.classList.add("card_statistika");
        this.container.appendChild(kartica);

        let okvirKontrola = document.createElement("div");
        okvirKontrola.className = "okvir_statistike";
        kartica.appendChild(okvirKontrola);

        let okvirKaficaSelect = document.createElement("div");
        okvirKaficaSelect.classList.add("okvir_kategorije");
        okvirKaficaSelect.classList.add("okvir_kafica");
        okvirKaficaSelect.innerHTML = "Kafic:";
        okvirKontrola.appendChild(okvirKaficaSelect);

        let kaficSelect = document.createElement("select");
        kaficSelect.classList.add("input_box");
        kaficSelect.classList.add("kafic");
        kaficSelect.onchange = () => {
            //this.poljeGrafika.innerHTML = "";
            this.grafik.isprazniGrafik();
            this.container.querySelector("input[type=date]").value = null;
            this.podaci = null;
        }
        okvirKaficaSelect.appendChild(kaficSelect);

        let okvirDugmica = document.createElement("div");
        okvirDugmica.className = "statistika_header";
        okvirKontrola.appendChild(okvirDugmica);

        let okvirCheck = document.createElement("div");
        okvirCheck.className = "okvir_radio";
        okvirDugmica.appendChild(okvirCheck);

        let prikazi = ["Dnevnica", "Zarada", "Napojnice", "Usluzeni"];
        prikazi.forEach(prikaz => {
            let spanZaPrikaz = document.createElement("span");
            okvirCheck.appendChild(spanZaPrikaz);

            let prikazCheck = document.createElement("input");
            prikazCheck.type = "checkbox";
            prikazCheck.name = "statistika";
            prikazCheck.value = prikaz;
            prikazCheck.onclick = () => {
                if (this.grafik.podaci != null) {
                    this.grafik.isprazniGrafik();
                    this.grafik.crtajStubice();
                }

            }
            spanZaPrikaz.appendChild(prikazCheck);

            let labela = document.createElement("label");
            labela.innerHTML = prikaz;
            spanZaPrikaz.appendChild(labela);
        });

        let okvirDatuma = document.createElement("div");
        okvirDatuma.className = "okvir_datuma";
        okvirDatuma.innerHTML = "Datum:";
        okvirDugmica.appendChild(okvirDatuma);

        let datumInput = document.createElement("input");
        datumInput.type = "date";
        datumInput.className = "input_box";
        datumInput.addEventListener("change", () => {
            this.grafik.crtajGrafik();
        })
        okvirDatuma.appendChild(datumInput);

        let poljeGrafika = document.createElement("div");
        poljeGrafika.className = "grafik_statistika";
        kartica.appendChild(poljeGrafika);

        this.grafik = new Grafik(document.body, poljeGrafika);

        this.ucitajKafice(kaficSelect);
    }

    ucitajKafice(kaficSelect) {
        fetch("https://192.168.0.13:5001/Kafic/PreuzmiKafice", {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(data => {
                    data.forEach(kafic => {
                        //console.log(kafic);
                        let kaficOption = document.createElement("option");
                        kaficOption.innerHTML = kafic.naziv;
                        kaficOption.value = kafic.id;
                        kaficSelect.appendChild(kaficOption);
                    });
                });
            }
            else {
                (new ProizvodModal(document.body)).prikazi(null, "Greška", "Doslo je do greske prilikom ucitavanja kafica!");
            }
        });
    }


}