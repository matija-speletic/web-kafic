import { Kafic } from './Kafic.js';

let listaKafica = [];

fetch('http://localhost:8080/Kafic/PreuzmiKafice', {
	method: 'GET',
}).then((s) => {
	if (s.ok) {
		s.json().then((data) => {
			data.reverse().forEach((kafic) => {
				let noviKafic = new Kafic(
					kafic.id,
					kafic.naziv,
					kafic.adresa,
					kafic.dimenzijaX,
					kafic.dimenzijaY
				);
				listaKafica.push(noviKafic);
				noviKafic.crtajKafic(document.body);
			});
		});
	}
});
