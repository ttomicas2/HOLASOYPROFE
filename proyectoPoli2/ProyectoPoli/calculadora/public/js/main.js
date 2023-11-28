const form = document.getElementById("form");
const inputs = document.querySelectorAll('[type="checkbox"]');
const body = document.getElementsByTagName("body");
const buscar = document.getElementById("buscar");

const productoId = form.getAttribute("data-producto-id");
const result = form.getAttribute("result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ingredientes = [];
    let condicion = true;
    inputs.forEach((item) => {
        let ingredienteCantidad = [];
        if (item.checked === true) {
            ingredienteCantidad.push(item.value);
            ingredienteCantidad.push(item.parentElement.nextElementSibling.valueAsNumber);

            if (isNaN(ingredienteCantidad[1])) {
                item.parentElement.nextElementSibling.classList.add("is-invalid");
                condicion = false;
            } else {
                ingredientes.push(ingredienteCantidad);
                item.parentElement.nextElementSibling.classList.remove("is-invalid");
            }
        }
    });
    if (condicion) {
        const datos = {
            ingredientes: ingredientes
        };

        fetch(`/recibirDatos/${productoId}`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.href = `/productos/${productoId}`;

    }

});

buscar.addEventListener("submit", e => {
    e.preventDefault();
    const valorBuscado = document.getElementById('searchInput');
    let ingredientes = [];
    let condicion = true;
    inputs.forEach((item) => {
        let ingredienteCantidad = [];
        if (item.checked === true) {
            ingredienteCantidad.push(item.value);
            ingredienteCantidad.push(item.parentElement.nextElementSibling.valueAsNumber);

            if (isNaN(ingredienteCantidad[1])) {
                item.parentElement.nextElementSibling.classList.add("is-invalid");
                condicion = false;
            } else {
                ingredientes.push(ingredienteCantidad);
                item.parentElement.nextElementSibling.classList.remove("is-invalid");
            }
        }
    });
    console.log(ingredientes);
        fetch(`/seleccionarIngredientes/${valorBuscado.value}/${productoId}`);
});


inputs.forEach((item) => {
    item.addEventListener("change", (e) => {
        if (item.checked === true) {
            let nuevoHTML = `<input type="number" class="form-control w-75 ">`;
            item.parentElement.parentElement.insertAdjacentHTML("beforeend", nuevoHTML);
        } else {
            item.parentElement.parentElement.removeChild(item.parentElement.parentElement.children[1]);
        }
    });
});
