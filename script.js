// AQUI EMPEZAMOS VON JAVA - Referencias al DOM
const form = document.getElementById("productForm");
const list = document.getElementById("productList");
const error = document.getElementById("errorMessage");

const totalCount = document.getElementById("totalCount");
const boughtCount = document.getElementById("boughtCount");
const pendingCount = document.getElementById("pendingCount");


// LISTA DE PRODUCTO USANDO LOCALSTORAGE
let products = JSON.parse(localStorage.getItem("products")) || [];

// GUARDAR DENTRO DE LOCALSTORAGE
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}


// ACTUALIZAR CONTADORES
function updateCounters() {
  totalCount.textContent = products.length;
  boughtCount.textContent = products.filter(p => p.bought).length;
  pendingCount.textContent = products.filter(p => !p.bought).length;
}

// USAR LA FUNCION DE RENDERIZAR 
// UTILICE IA PARA ENTERNER EL PROCESO DE LA FUNCION
function renderProducts() {
  list.innerHTML = ""; // limpiar antes de renderizar

  products.forEach((product, index) => {
    const li = document.createElement("li");

    li.textContent = `${product.name} (${product.quantity})`;

    if (product.bought) {
      li.classList.add("bought");
    }

    // MARCAR COMPRADO
    li.addEventListener("click", () => {
      product.bought = !product.bought;
      saveProducts();
      renderProducts();
    });

    // BOTON ELIMINAR 
    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.classList.add("delete");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      products.splice(index, 1);
      saveProducts();
      renderProducts();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });

  updateCounters();
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

  saveProducts();
  renderProducts();
  form.reset();
});

// CARGAR DATOS AL INICIAR
renderProducts();

