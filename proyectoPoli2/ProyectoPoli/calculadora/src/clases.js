const Unidades = [
    "kg",
    "gr",
    "l",
    "ml",
    "unidad"
]
class Ingrediente {
    constructor(id, nombre, costo, unidad, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.costo = costo;
        this.unidad = unidad;
        this.cantidad = cantidad;
    }
    get getId() {
        return this.id;
    }
    get getNombre() {
        return this.nombre;
    }
    get getCosto() {
        return this.costo;
    }
    get getUnidad() {
        return this.unidad;
    }
    get getCantidad() {
        return this.cantidad;
    }

    /**
     * @param {any} x
     */
    set setId(x) {
        this.id = x;
    }
    /**
     * @param {any} x
     */
    set setNombre(x) {
        this.nombre = x;
    }
    /**
     * @param {any} x
     */
    set setCosto(x) {
        this.costo = x;
    }
    /**
     * @param {any} x
     */
    set setUnidad(x) {
        this.unidad = x;
    }
    /**
     * @param {any} x
     */
    set setCantidad(x) {
        this.cantidad = x;
    }
    CostoCantidad(cantidad) {
        return cantidad * this.costo / this.cantidad;
    }
}
class Producto {
    constructor(id, nombre, margen, packaging, ingredientes, agregado, cantidadReceta) {
        this.id = id;
        this.nombre = nombre;
        this.margen = margen;
        this.packaging = packaging;
        this.ingredientes = ingredientes;
        this.agregado = agregado;
        this.cantidadReceta = cantidadReceta;
        this.costo = this.calcularCosto();
    }
    get getId() {
        return this.id;
    }
    get getNombre() {
        return this.nombre;
    }
    get getMargen() {
        return this.margen;
    }
    get getPackaging() {
        return this.packaging;
    }
    get getIngredientes() {
        return this.ingredientes;
    }
    get getCosto() {
        return this.costo;
    }
    get getAgregado() {
        return this.agregado;
    }
    get getCantidadReceta() {
        return this.cantidadReceta;
    }
    /**
     * @param {any} x
     */
    set setId(x) {
        this.id = x;
    }
    /**
     * @param {any} x
     */
    set setNombre(x) {
        this.nombre = x;
    }
    /**
     * @param {any} x
     */
    set setMargen(x) {
        this.margen = x;
    }
    /**
     * @param {any} x
     */
    set setPackaging(x) {
        this.packaging = x;
    }
    /**
     * @param {any} x
     */
    set setIngredientes(x) {
        this.ingredientes = x;
    }
    /**
     * @param {any} x
     */
    set setCosto(x) {
        this.costo = x;
    }
    /**
     * @param {any} x
     */
    set setAgregado(x) {
        this.agregado = x;
    }
    /**
     * @param {any} x
     */
    set setCantidadReceta(x) {
        this.cantidadReceta = x;
    }
    calcularCosto() {
        let costoTotal = this.calcularCostoUnidad();
        this.costo = ((costoTotal + this.packaging) * ((this.agregado / 100) + 1)) * ((this.margen / 100) + 1);
        return this.costo;
    }
    calcularCostoIngredientes() { 
        let costoTotal = 0;
        if (this.ingredientes != null) {
            this.ingredientes.forEach(element => {
                costoTotal += element[0].CostoCantidad(element[1]);
            });
        }
        return costoTotal;
    }
    calcularCostoUnidad() { 
        let costoTotal = this.calcularCostoIngredientes();
        if (this.cantidadReceta == null) {
            this.setCantidadReceta = 1;
        }
        return costoTotal/this.cantidadReceta;
    }
    buscarIngredientes(buscado) {
        let encontrados = {
            getIngredientes: []
        };
        this.ingredientes.find(ingredient => {
            let cont = 0;
            let n1 = ingredient[0].getNombre.toLowerCase();
            buscado = buscado.toLowerCase();
            for (let i = 0; i < buscado.length; i++) {
                if (n1[i] === buscado[i]) {
                    cont++;
                }
            }
            if (cont == buscado.length) {
                encontrados.getIngredientes.push(ingredient);
            }
        });
        return encontrados;
    }
}
class Sistema {
    constructor(productos, ingredientes) {
        this.productos = productos;
        this.ingredientes = ingredientes;
    }
    get getProductos() {
        return this.productos;
    }
    get getIngredientes() {
        return this.ingredientes;
    }
    /**
     * @param {any} x
     */
    set setProductos(x) {
        this.productos = x;
    }
    /**
     * @param {any} x
     */
    set setIngredientes(x) {
        this.ingredientes = x;
    }

    buscarIngredientes(buscado) {
        let encontrados = [];
        this.ingredientes.find(ingredient => {
            let cont = 0;
            let n1 = ingredient.getNombre.toLowerCase();
            buscado = buscado.toLowerCase();
            for (let i = 0; i < buscado.length; i++) {
                if (n1[i] === buscado[i]) {
                    cont++;
                }
            }
            if (cont == buscado.length) {
                encontrados.push(ingredient);
            }
        });
        return encontrados;
    }
    buscarProductos(buscado) {
        let encontrados = [];
        this.productos.find(producto => {
            let cont = 0;
            let n1 = producto.getNombre.toLowerCase();
            buscado = buscado.toLowerCase();
            for (let i = 0; i <= buscado.length; i++) {
                if (n1[i] === buscado[i]) {
                    cont++;
                }
            }
            if (cont == buscado.length) {
                encontrados.push(producto);
            }
        });
        return encontrados;
    }
    verificarIngrediente(ingrediente) {
        return(this.verificarNombreIngrediente(ingrediente) && this.verificarNumerosIngrediente(ingrediente));
    }
    verificarNombreIngrediente(ingrediente) {
        return this.ingredientes.some(currentIngrediente => {
            return(currentIngrediente.getNombre == ingrediente.getNombre);
        });
    }
    verificarNumerosIngrediente(ingrediente) {
        return(typeof ingrediente.getCosto === "number" && typeof ingrediente.getCantidad === "number")
    }
    agregaringrediente(ingrediente) {
        this.ingredientes.push(ingrediente);
    }
    verificarNombreProducto(producto) {
        return this.productos.some(currentProducto => {
            return(currentProducto.getNombre === producto.getNombre);
        });
    }
    verificarNumerosProductos(producto) {
        return(typeof producto.getPackging === "number" && typeof producto.getMargen === "number" && typeof producto.getAgregado === "number" && typeof producto.getCantidadReceta === "number");
    }
    verificarProducto(producto) {
        return this.verificarNumerosProductos(producto) && this.verificarNombreProducto(producto);
    }
    agregarProducto(producto) {
        this.productos.push(producto);
    }
}
module.exports = {
    Unidades,
    Sistema,
    Ingrediente,
    Producto
}
