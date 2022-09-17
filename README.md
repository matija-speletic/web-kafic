# Aplikacija za kafić
## Početna stranica
Početna stranica aplikacije je veoma jednostavna i služi samo za lakšu navigaciju kroz aplikaciju:

![](https://imgur.com/AO2Xnqb.jpeg)
## Pregled kafića
Stranica za pregled kafića sadrži grafički prikaz kafića (raspored stolova). Simbol cigarete označava
stolove na kojima je dozvoljeno pušenje, a simbol precrtane cigarete stolove na kojima nije. Broj pored
ovog simbola označava broj mesta za ovim stolom. Boja stola označava da li je zauzet ili slobodan
(crven – zauzet, zelen – slobodan).

![](https://imgur.com/xjLwRhR.jpeg)

Aplikacija je napravljena tako da prikazuje sve postojeće kafiće odjednom (dva entiteta) – na sledećoj
slici se vidi prikaz drugog kafića u okviru iste stranice:

![](https://imgur.com/Dqvm0nt.jpeg)

Sve na ovoj stranici se kreira potpuno dinamički u JavaScript kodu, a raspored stolova i oznake na njima
se učitavaju iz baze, što omogućava kreiranje proizvoljnog rasporeda za svaki kafić.
Klikom na bilo koji sto, sa leve strane se prikazuje lista naručenih proizvoda na tom stolu, zajedno sa
napojnicom koju je gost uneo, ukupnim iznosom, dodatnim uputstvom koje je gost uneo i imenom i
prezimenom konobara koji je zadužen za tu narudžbinu (select box u kome je prikazano ime konobara
je disable-ovan kada se klikne na zauzet sto). Dugme naplati oslobađa zauzeti sto i označava
narudžbinu da je izvršena (update). Dugme obriši potpuno briše narudžbinu iz baze podataka (delete).

![](https://imgur.com/i21b6Xk.jpeg)

Ukoliko se klikne na slobodan sto – prikaz sa leve strane postaje prazan (uz poruku „Sto je slobodan…“),
pri čemu select box za ime konobara postaje enable-ovan. Ovaj select box služi da se izabere konobar
koji će biti zadužen za novu narudžbinu – dugme Dodaj (biće objašnjeno).
Klikom na dugme Nazad se vraća na početnu stranu. Ukoliko se klikne na bilo koje dugme u
neispravnom kontekstu – prikazuje se odgovarajuća poruka (na Dodaj ukoliko je selektovan zauzet sto
ili na Obrisi/Naplati ukoliko je selektovan slobodno sto ili na bilo koje dugme ukoliko se ne selektuje
nijedan sto:

![](https://imgur.com/XReGVXS.jpeg)
## Naručivanje
Selektovanjem slobodnog stola i klikom na Dodaj se otvara sledeća forma u novom tab-u:

![](https://imgur.com/mf04HxG.jpeg)

Ova forma služi za dodavanje nove narudžbine i može se koristiti i od strane konobara i od strane
gostiju. Izbor proizvoda se vrši klikom na dugmad + i – sa desne i leve strane svakog proizvoda, a
uputstvo se može uneti po potrebi. Klikom na ime odgovarajućeg proizvoda, pojavljuje se poruka sa
detaljima o tom proizvodu:

![](https://imgur.com/m4RRM42.jpeg)

Klikom na odgovarajuće dugme proizvod se pojavljuje u manjoj listi sa desne strane gde korisnik može
videti šta je sve naručio, ispod čega se nalazi ukupan iznos narudžbine:

![](https://imgur.com/S94VHCx.jpeg)

>Možemo primetiti da URL ove stranice pored putanje ima i određene parametre: naziv kafića, x i y pozicija stola i nadimak konobara (nisu korišćeni ID-jevi jer nije poželjno prikazati ID korisniku). Ideja koja se krije iza ovoga jeste da se za svaki sto može kreirati jedinstveni URL, koji se može dalje pretvoriti u QR kod, a gost kafića može samo skenirati kod i otići direktno na stranicu za naručivanje za njegov sto (takođe se na ovaj način može specificirati koji konobar je zadužen za koji sto). Pomoću ovih parametara se narudžbina prosleđuje odgovarajućem stolu. Ukoliko se ne unese nadimak konobara – on se bira nasumično. (Napomena: klik na dugme dodaj u pregledu kafića automatski generiše ovaj URL) 
>
>![](https://imgur.com/ASVHknx.jpeg)

Klikom na dugme Naruči – prikazuje se odgovarajuća poruka i otvara se mini forma u kojoj je potrebni
uneti iznos napojnice (po želji):

![](https://imgur.com/O09xW84.jpeg)

I klikom na dugme prosledi – dodaje se napojnica toj narudžbini i prikazuje se odgovarajuća poruka.
Nakon ovoga, konobarima će u prikazu kafića biti dostupan pregled narudžbine:

![](https://imgur.com/LVrMBOt.jpeg)
## Meni
Klikom na dugme Pregled menija na glavnoj stranici se otvara stranica koja sadrži formu za pregled,
izmenu, dodavanje i brisanje proizvoda u meniju:

![](https://imgur.com/tVpP5Bo.jpeg)
Klikom na bilo koji proizvod iz liste (nakon što se selektuje željena kategorija), podaci o proizvodu se
prikazuju u formi za desne strane. Korišćenjem iste forme, podaci se mogu menjati. Klikom na dugme
Dodaj stavku, podaci koji se trenutno nalaze u formi se učitavaju i u bazi se kreira nov proizvod na
osnovu tih podataka. Klikom na dugme izmeni stavku, prethodno selektovani proizvod se ažurira
korišćenjem podataka učitanih iz forme. Klikom na dugme Ukloni stavku, selektovani proizvod se briše.
Ova stranica implementira sve CRUD operacije nad entitetom Proizvod. Posle bilo koje akcije, podaci
u listi sa leve strane se ažuriraju. Ukoliko se klikne na dugme Izmeni ili Ukloni bez prethodnog
selektovanja proizvoda, prikazuje se odgovarajuća poruka. Klikom na dugme Nazad se vraćamo na
početni meni.
## Statistika
Još jedna stranica do koje se može doći iz početnog menija jeste Pregled statistike. Cilj ove stranice
jeste grafički prikaz statistike zaposlenih (koja je dnevna zarada, dnevni promet, ukupan iznos
napojnica i broj usluženih stolova). Ova stranica u gornjem delu sadrži kontrole za izbor kafića čiju
statistiku želimo da pregledamo, kontrole za izbor podataka koje želimo da vidimo i kontrolu za izbor
datuma za koji želimo da vidimo statistiku. Izborom datuma – podaci se učitavaju iz baze, a
popunjavanjem checkbox-ova se bira koji će podaci biti prikazani.

![](https://imgur.com/2aEB8Da.jpeg)

Dizajn svih stranica je napravljen da bude fleksibilan i prilagodjen svim dimenzijama ekrana: Na svim
stranicama koje su podeljene na dve polovine – desna polovina se prebaci ispod leve kada se ekran
dovoljno smanji, a na stranici za statistiku – grafici se ređaju u sledećem redu kada se prostor smanji.