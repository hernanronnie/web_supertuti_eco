// AQUI EMPEZAMOS VON JAVA - Referencias al DOM
const form = document.getElementById("productForm");
const list = document.getElementById("productList");
const error = document.getElementById("errorMessage");

const totalCount = document.getElementById("totalCount");
const boughtCount = document.getElementById("boughtCount");
const pendingCount = document.getElementById("pendingCount");

// ACTUALIZAR CONTADORES
function updateCounters() {
  totalCount.textContent = products.length;
  boughtCount.textContent = products.filter(p => p.bought).length;
  pendingCount.textContent = products.filter(p => !p.bought).length;
}

// VALIDACION Y AGREGARR
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("productQuantity").value;

  if (name === "" || quantity <= 0) {
    error.textContent = "Ingrese un producto válido y cantidad mayor a cero.";
    return;
  }

  error.textContent = "";

  products.push({
    name,
    quantity,
    bought: false
  });

  form.reset();
});





