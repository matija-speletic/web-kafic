export class ProizvodModal {
    constructor(host) {
        this.proizvod = null;
        this.naslov = "";
        this.tekst = "";
        this.host = host;
    }

    prikazi(proizvod, naslov, tekst) {
        this.proizvod = proizvod;
        this.naslov = naslov;
        this.tekst = tekst;

        let overlay = document.createElement("div");
        overlay.className = "details-modal-overlay";
        this.host.appendChild(overlay);

        let container = document.createElement("div");
        container.className = "details-modal"
        this.host.appendChild(container);

        let closeDiv = document.createElement("div");
        closeDiv.className = "details-modal-close";
        container.appendChild(closeDiv);

        let closeButton = document.createElement("div");
        closeButton.innerHTML = "✖";
        closeButton.onclick = () => {
            while (container.firstChild)
                container.removeChild(container.firstChild);
            this.host.removeChild(overlay);
            this.host.removeChild(container);
        }
        closeDiv.appendChild(closeButton);

        let modalTitle = document.createElement("div");
        modalTitle.className = "details-modal-title";
        container.appendChild(modalTitle);

        let modalHeader = document.createElement("h1");
        modalHeader.innerHTML = this.proizvod !== null ? this.proizvod.naziv : naslov;
        modalTitle.appendChild(modalHeader);

        let modalContent = document.createElement("div");
        modalContent.className = "details-modal-content";
        modalContent.innerHTML = this.proizvod !== null ? this.proizvod.opis : tekst;
        container.appendChild(modalContent);

        // let par = document.createElement("p");
        // par.innerHTML = this.proizvod.opis;
        // modalContent.appendChild(par);
    }
}