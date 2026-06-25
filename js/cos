let cos = JSON.parse(localStorage.getItem("cos")) || [];

// Actualizează contorul din antet
function actualizeazaContor() {
  const totalProduse = cos.reduce(
    (suma, articol) => suma + articol.cantitate,
    0,
  );
  const contor = document.getElementById("contor-cos");
  if (contor) contor.textContent = totalProduse;
}

// Funcție nouă: Golește tot coșul
function golesteCos() {
  if (confirm("Ești sigur că vrei să ștergi toate produsele din coș?")) {
    cos = [];
    localStorage.setItem("cos", JSON.stringify(cos));
    actualizeazaContor();
    afiseazaCos();
  }
}

// Afișează produsele din coș
function afiseazaCos() {
  const container = document.getElementById("lista-cos");
  if (!container) return;

  if (cos.length === 0) {
    container.innerHTML = `
            <div class="cos-gol">
                <p>Coșul tău este gol în acest moment.</p>
            </div>
        `;
    return;
  }

  let html = "";
  let sumaTotala = 0;

  cos.forEach((articol) => {
    const sumaBucata = articol.pret * articol.cantitate;
    sumaTotala += sumaBucata;

    html += `
            <div class="articol-cos">
                <div class="info-articol">
                    <img src="imagini/${articol.imagine}" alt="${articol.nume}">
                    <div>
                        <h4>${articol.nume}</h4>
                        <p>${articol.pret.toFixed(2)} RON / buc</p>
                    </div>
                </div>
                <span>Cantitate: ${articol.cantitate}</span>
                <span><strong>${sumaBucata.toFixed(2)} RON</strong></span>
            </div>
        `;
  });

  html += `
        <div class="total-general">
            Total de plată: ${sumaTotala.toFixed(2)} RON
        </div>
        <div style="margin-top: 1.5rem; text-align: right;">
            <button onclick="golesteCos()" class="buton buton-sterge">Golește tot coșul</button>
        </div>
    `;

  container.innerHTML = html;
}

// Rulează la încărcare pagină
window.onload = () => {
  actualizeazaContor();
  afiseazaCos();
};

// Facem funcțiile accesibile din HTML
window.golesteCos = golesteCos;

