export class Grafik {
    constructor(container, poljeGrafika) {
        this.poljeGrafika = poljeGrafika;
        this.podaci = null;
        this.container = container;
        this.bojeStubica = ["#303fe3", "#c2b204", "#02b002", "#b0021c"];
    }

    crtajGrafik() {

        let datum = this.container.querySelector("input[type='date']").value;
        //https://localhost:5001/Konobar/PreuzmiStatistikuKonobara/1/12-29-21
        //console.log(datum);

        let idKafica = this.container.querySelector(".kafic").value;
        //console.log(idKafica);
        fetch("https://localhost:5001/Konobar/PreuzmiStatistikuKonobara/" + idKafica + "/" + datum, {
            method: "GET"
        }).then(s => {
            if (s.ok) {
                s.json().then(konobari => {
                    //console.log(konobari);
                    this.podaci = konobari;
                    this.isprazniGrafik();
                    this.crtajStubice();
                })
            }
            else {
                alert("Doslo je do greske prilikom ucitavanja statistike!");
            }
        })
    }

    crtajStubice() {
        let selektovani = this.container.querySelectorAll("input[type='checkbox']:checked");
        //console.log(selektovani);
        if (selektovani.length > 0) {
            selektovani = [...selektovani].map(s => s.value);
            //console.log(selektovani);
        }
        else {
            //alert("Morate izabrati bar jedan podatak!");
            return;
        }

        let maxDnevnice = 0, maxUkupno = 0, maxNapojnice = 0, maxUsluzeni = 0;
        this.podaci.forEach(stats => {
            if (stats.dnevnica > maxDnevnice)
                maxDnevnice = stats.dnevnica;
            if (stats.ukupno > maxUkupno)
                maxUkupno = stats.ukupno;
            if (stats.napojnice > maxNapojnice)
                maxNapojnice = stats.napojnice;
            if (stats.brojUsluzenih > maxUsluzeni)
                maxUsluzeni = stats.brojUsluzenih;
        })

        this.podaci.forEach(stats => {
            let okvirStubica = document.createElement("div");
            okvirStubica.className = "okvir_stubica";
            this.poljeGrafika.appendChild(okvirStubica);

            selektovani.forEach(prikaz => {
                switch (prikaz) {
                    case "Dnevnica":
                        this.crtajStubic(okvirStubica, stats.nadimak, prikaz, stats.dnevnica, maxDnevnice, this.bojeStubica[0]);
                        break;
                    case "Zarada":
                        this.crtajStubic(okvirStubica, stats.nadimak, prikaz, stats.ukupno, maxUkupno, this.bojeStubica[1]);
                        break;
                    case "Napojnice":
                        this.crtajStubic(okvirStubica, stats.nadimak, prikaz, stats.napojnice, maxNapojnice, this.bojeStubica[2]);
                        break;
                    case "Usluzeni":
                        this.crtajStubic(okvirStubica, stats.nadimak, prikaz, stats.brojUsluzenih, maxUsluzeni, this.bojeStubica[3]);
                        break;
                    default:
                        break;
                }
            })

        })

    }

    crtajStubic(okvir, nadimak, tekst, vrednost, maxVrednost, boja) {
        let grafik = document.createElement("div");
        grafik.className = "grafik_konobara";
        okvir.appendChild(grafik);

        let spanNadimak = document.createElement("span");
        spanNadimak.innerHTML = nadimak;
        grafik.appendChild(spanNadimak);

        let stubic = document.createElement("div");
        stubic.className = "stubic";
        stubic.innerHTML = tekst + " = " + vrednost;
        stubic.title = vrednost;
        grafik.appendChild(stubic);

        stubic.style.height = (100 * vrednost / maxVrednost) + "%";
        stubic.style.backgroundColor = boja;
    }

    isprazniGrafik() {
        while (this.poljeGrafika.firstChild)
            this.poljeGrafika.removeChild(this.poljeGrafika.firstChild);
    }

}