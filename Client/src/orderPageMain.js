import { ListaProizvoda } from "./ListaProizvoda.js";
import { NarudzbinaForma } from "./NarudzbinaForma.js";

let card = document.querySelector(".card");
let narudzbinaForma = new NarudzbinaForma();
narudzbinaForma.crtajFormuZaNarudzbinu(card);