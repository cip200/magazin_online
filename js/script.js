import { produse } from "./date-produse.js";

let cos = JSON.parse(localStorage.getItem("cos")) || [];

function actualizeazaContorCos() {
  const total = cos.reduce((suma, produs) => suma + produs.cantitate, 0);
  const contor = document.getElementById("contor-cos");
  if (contor) contor.textContent = total;
  localStorage.setItem("cos", JSON.stringify(cos));
}

function adaugaInCos(idProdus) {
  const produsGasit = produse.find((p) => p.id === idProdus);
  const existent = cos.find((p) => p.id === idProdus);

  if (existent) {
    existent.cantitate += 1;
  } else {
    cos.push({ ...produsGasit, cantitate: 1 });
  }

  actualizeazaContorCos();
  // Mesajul de confirmare a fost eliminat
}

function afiseazaListaProduse() {
  const container = document.querySelector(".lista-produse");
  if (!container) return;

  container.innerHTML = "";
  produse.forEach((produs) => {
    const card = document.createElement("div");
    card.className = "card-produs";
    card.innerHTML = `
      <img src="imagini/${produs.imagine}" alt="${produs.nume}">
      <h3>${produs.nume}</h3>
      <p class="pret">${produs.pret.toFixed(2)} RON</p>
      <a href="produs.html?id=${produs.id}" class="buton buton-detalii">Detalii</a>
      <button onclick="adaugaInCos(${produs.id})" class="buton buton-adauga">Adaugă în coș</button>
    `;
    container.appendChild(card);
  });
}

function afiseazaDetaliuProdus() {
  const parametri = new URLSearchParams(window.location.search);
  const id = parseInt(parametri.get("id"));
  const produs = produse.find((p) => p.id === id);

  if (!produs) {
    document.querySelector("main").innerHTML = "<h2>Produsul nu există!</h2>";
    return;
  }

  document.querySelector("h1").textContent = produs.nume;
  document.querySelector(".continut-produs").innerHTML = `
    <div class="produs-detalii">
      <img src="imagini/${produs.imagine}" alt="${produs.nume}">
      <div>
        <p class="pret">Preț: ${produs.pret.toFixed(2)} RON</p>
        <h3>Descriere</h3>
        <p>${produs.descriere}</p>
        <button onclick="adaugaInCos(${produs.id})" class="buton buton-adauga">Adaugă în coș</button>
        <a href="index.html" class="buton buton-detalii">Înapoi la magazin</a>
      </div>
    </div>
  `;
}

window.onload = () => {
  actualizeazaContorCos();
  if (document.querySelector(".lista-produse")) afiseazaListaProduse();
  if (document.querySelector(".continut-produs")) afiseazaDetaliuProdus();
};

window.adaugaInCos = adaugaInCos;
