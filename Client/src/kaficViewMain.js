import { Kafic } from "./Kafic.js";

let listaKafica = [];

fetch("https://localhost:5001/Kafic/PreuzmiKafice", {
    method: "GET"
}).then(s => {
    if (s.ok) {
        s.json().then(data => {
            data.forEach(kafic => {
                let noviKafic = new Kafic(kafic.id, kafic.naziv, kafic.adresa, kafic.dimenzijaX, kafic.dimenzijaY);
                listaKafica.push(noviKafic);
                noviKafic.crtajKafic(document.body);
            });
        })
    }
})