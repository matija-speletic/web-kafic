import { ListaNarucenih } from './ListaNarucenih.js';
import { ListaProizvoda } from './ListaProizvoda.js';
import { ProizvodModal } from './ProizvodModal.js';

export class NarudzbinaForma {
	constructor() {
		this.listaProizvoda = null;
		this.container = null;
		this.ukupanIznos = null;
		this.naruceniContainer = null;
		this.listaNarucenih = null;
	}

	crtajFormuZaNarudzbinu(host) {
		this.container = host;
		this.listaProizvoda = new ListaProizvoda(this);
		this.listaProizvoda.crtajListu(host);

		let narudzbinaForma = document.createElement('div');
		narudzbinaForma.className = 'narudzbina_forma';
		this.container.appendChild(narudzbinaForma);

		let naslov = document.createElement('h2');
		naslov.innerHTML = 'Narudzbina:';
		narudzbinaForma.appendChild(naslov);

		let br = document.createElement('br');
		narudzbinaForma.appendChild(br);

		this.listaNarucenih = new ListaNarucenih();
		this.listaNarucenih.crtajListuNarucenih(narudzbinaForma);

		let divZaUkupno = document.createElement('div');
		divZaUkupno.className = 'ukupno';
		narudzbinaForma.appendChild(divZaUkupno);

		let ukupnoSpan = document.createElement('span');
		ukupnoSpan.innerHTML = 'Ukupno:';
		divZaUkupno.appendChild(ukupnoSpan);

		this.ukupanIznos = document.createElement('span');
		this.ukupanIznos.innerHTML = '0.00';
		this.ukupanIznos.className = 'ukupan_iznos';
		divZaUkupno.appendChild(this.ukupanIznos);

		let uputstvoText = document.createElement('textarea');
		uputstvoText.classList.add('input_box');
		uputstvoText.classList.add('dodatno_uputstvo');
		uputstvoText.placeholder = 'Unesite dodatno uputstvo (po potrebi)...';
		narudzbinaForma.appendChild(uputstvoText);

		let okvirDugmica = document.createElement('span');
		okvirDugmica.className = 'okvir_dugmica';
		narudzbinaForma.appendChild(okvirDugmica);

		let dugmeNaruci = document.createElement('button');
		dugmeNaruci.className = 'glavno_dugme';
		dugmeNaruci.innerHTML = 'Naruci';
		dugmeNaruci.addEventListener('click', (event) =>
			this.proslediNarudzbinu()
		);
		okvirDugmica.appendChild(dugmeNaruci);

		//this.otvoriFormuZaNapojnicu();
	}

	dodajProizvodUNarudzbinu(proizvod) {
		this.listaNarucenih.dodajProizvodUListu(proizvod);
		this.prikaziNarucene();
	}

	ukloniProizvodIzNarudzbine(proizvod) {
		this.listaNarucenih.ukloniProizvodIzListe(proizvod);
		this.prikaziNarucene();
	}

	prikaziNarucene() {
		this.listaNarucenih.prikaziListuNarucenih();
		this.ukupanIznos.innerHTML =
			this.listaNarucenih.naruceniProizvodi.reduce(
				(acc, naruceniProizvod) =>
					(acc +=
						naruceniProizvod.brojIzabranih * naruceniProizvod.cena),
				0
			) + ',00';
	}

	proslediNarudzbinu() {
		if (this.listaNarucenih.naruceniProizvodi.length === 0) {
			new ProizvodModal(document.body).prikazi(
				null,
				'Upozorenje',
				'Morate izabrati bar jedan proizvod!'
			);
			return;
		}
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
		const stoX = parseInt(params.x ?? -1);
		const stoY = parseInt(params.y ?? -1);
		const nazivKafica = params.nazivKafica ?? '';
		const nadimakKonobara = params.nadimakKonobara ?? null;
		let postRequest = encodeURI(
			'http://localhost:8080/Narudzbina/DodajNarudzbinu/' +
				nazivKafica +
				'/' +
				stoX +
				'/' +
				stoY +
				'?'
		);

		this.listaNarucenih.naruceniProizvodi.forEach((proizvod) => {
			for (let i = 0; i < proizvod.brojIzabranih; i++) {
				postRequest += 'proizvodi=' + proizvod.id;
				postRequest += '&';
			}
		});
		if (nadimakKonobara !== null) {
			postRequest =
				postRequest + 'nadimakKonobara=' + nadimakKonobara + '&';
		}
		let dodatnoUputstvo = document.querySelector('.dodatno_uputstvo').value;
		postRequest += 'uputstvo=' + encodeURI(dodatnoUputstvo);
		//(new ProizvodModal(document.body)).prikazi(null,"Greška",postRequest);
		this.listaNarucenih.naruceniProizvodi = [];
		fetch(postRequest, { method: 'POST' }).then((s) => {
			console.log(s);
			if (s.ok) {
				new ProizvodModal(document.body).prikazi(
					null,
					'Obaveštenje',
					'Narudzbina je prosledjena!'
				);
				this.otvoriFormuZaNapojnicu(s);
			} else
				new ProizvodModal(document.body).prikazi(
					null,
					'Greška',
					'Narudzbina nije uspesno prosledjena!'
				);
		});
	}

	otvoriFormuZaNapojnicu(response) {
		this.container.innerHTML = '';
		this.container.style =
			'align-items: center;justify-content: center;flex-direction:column;height:90vh';

		let labelaNapojnica = document.createElement('label');
		labelaNapojnica.innerHTML = 'Unesite napojnicu :)';
		labelaNapojnica.style = 'font-size:40px;margin-bottom:30px';
		this.container.appendChild(labelaNapojnica);

		let iznosNapojnice = document.createElement('input');
		iznosNapojnice.type = 'number';
		iznosNapojnice.value = '0';
		iznosNapojnice.className = 'input_box';
		iznosNapojnice.style = 'font-size:40px;margin-bottom:30px';
		this.container.appendChild(iznosNapojnice);

		let dugmeProsledi = document.createElement('button');
		dugmeProsledi.className = 'glavno_dugme';
		dugmeProsledi.style = 'height:70px;width:200px;font-size:40px';
		dugmeProsledi.innerHTML = 'Prosledi';
		dugmeProsledi.addEventListener('click', (event) => {
			response.json().then((idNarudzbine) => {
				fetch(
					'http://localhost:8080/Narudzbina/DodajNapojnicu/' +
						idNarudzbine +
						'/' +
						iznosNapojnice.value,
					{
						method: 'PUT',
					}
				).then((s) => {
					if (s.ok) {
						new ProizvodModal(document.body).prikazi(
							null,
							'Obaveštenje',
							'Napojnica dodata! Hvala!'
						);
						this.container.innerHTML = '';
						labelaNapojnica.innerHTML = 'Hvala na poverenju!';
						this.container.appendChild(labelaNapojnica);
					} else {
						new ProizvodModal(document.body).prikazi(
							null,
							'Greška',
							'Doslo je do greske!'
						);
					}
				});
			});
		});
		this.container.appendChild(dugmeProsledi);
	}
}
