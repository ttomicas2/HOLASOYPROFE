const express = require("express");
const bodyParser = require("body-parser");
const { Unidades, Sistema, Ingrediente, Producto } = require("./src/clases");
const {obteneDatos,crearIngrediente,crearProducto,obtenerInfoIngredientes,obtenerIngredientes,obtenerProductos,currencyFormatter,} = require("./src/metodos");

const { PORT } = require("./src/config");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

const crearSistema = async () => {
  try {
    // creacion sistema
    let ingredientes = [];
    let productos = [];
    let sistema = new Sistema(productos, ingredientes);
    const resultadosIngredientes = await obtenerIngredientes();
    resultadosIngredientes.forEach((currenteIngrediente) => {
      sistema.getIngredientes.push(crearIngrediente(currenteIngrediente));
    });
    const productosSql = await obtenerProductos();
    for (const producto of productosSql) {
      const infoProducto = await obtenerInfoIngredientes(producto.id);
      const productoS = crearProducto(producto, infoProducto, ingredientes);
      sistema.getProductos.push(productoS);
    }

    // RUTAS

    //INGREDIENTES
    app.get("/ingredientes", (req, res) => {
      res.render("ingredientes/ingredientes", {
        result: sistema.getIngredientes,
        formateador: currencyFormatter,
      });
    });
    app.get("/ingredientes/buscar", (req, res) => {
      const buscado = req.query.buscador;
      console.log(req.query);

      res.render("ingredientes/ingredientes", {
        result: sistema.buscarIngredientes(buscado),
        formateador: currencyFormatter,
      });
    });
    app.get("/ingresar", (req, res) => {
      res.render("ingredientes/ingresarIngredientes", { unidades: Unidades });
    });
    app.post("/ingresar", async (req, res) => {
      let ingrediente = new Ingrediente(req.body.Id,req.body.Ingrediente,parseInt(req.body.Costo, 10),req.body.Unidad,parseInt(req.body.Cantidad, 10));

      if (!sistema.verificarIngrediente(ingrediente)) {
        let sql = `insert into ingredientes values(null, '${req.body.Ingrediente}',${parseInt(req.body.Costo, 10)},'${req.body.Unidad}',${parseInt(req.body.Cantidad,10)});`;
        obteneDatos(sql);
        sql = `select max(id) as id from ingredientes;`;
        const id = await obteneDatos(sql);
        ingrediente.setId = id[0].id;
        sistema.agregaringrediente(ingrediente);
      } else {
        console.log("corregir los campos");
      }
      res.render("ingredientes/ingredientes", {
        result: sistema.getIngredientes,
      });
    });
    app.get("/eliminar/:id", (req, res) => {
      let indice = -1;
      let ingrediente;
      let condicion = true;
      let sql = `delete from ingredientes where id = ${req.params.id}`;

      sistema.getIngredientes.forEach((currentIngrediente, index) => {
        if (currentIngrediente.getId == req.params.id) {
          indice = index;
          ingrediente = currentIngrediente;
        }
      });
      sistema.getProductos.forEach((currentProducto) => {
        currentProducto.getIngredientes.forEach((currentIngrediente) => {
          if ((currentIngrediente[0] == ingrediente)) {
            console.log("este ingrediente esta en un producto");
            condicion = false;
          }
        });
      });

      if (indice == -1) {
        console.log("este elemento no existe ya");
      } else if (condicion) {
        obteneDatos(sql);
        sistema.getIngredientes.splice(indice, 1);
      }
      res.render("ingredientes/ingredientes", {
        result: sistema.getIngredientes,
      });
    });
    app.get("/editarInterfaz/:id", (req, res) => {
      let ingrediente;
      sistema.getIngredientes.forEach((currentIngrediente) => {
        if (currentIngrediente.getId == req.params.id) {
          ingrediente = currentIngrediente;
        }
      });
      res.render("ingredientes/editarIngrediente", {
        id: req.params.id,
        unidades: Unidades,
        ingrediente: ingrediente,
      });
    });
    app.get("/editar/:id", (req, res) => {
      const id = req.params.id;
      if (sistema.verificarNumerosIngrediente(new Ingrediente(null,null,parseInt(req.query.Costo, 10),null,parseInt(req.query.Cantidad, 10)))) {
        let sql = `update ingredientes set nombre = "${req.query.Ingrediente}", costo = ${parseInt(req.query.Costo, 10)}, unidad = "${req.query.Unidad}", cantidad = ${parseInt(req.query.Cantidad, 10)} where id = ${id};`;
        obteneDatos(sql);
        sistema.getIngredientes.forEach(currentIngrediente => {
          if (currentIngrediente.getId == req.params.id) {
            currentIngrediente.setNombre = req.query.Ingrediente;
            currentIngrediente.setCosto = parseInt(req.query.Costo, 10);
            currentIngrediente.setUnidad = req.query.Unidad;
            currentIngrediente.setCantidad = parseInt(req.query.Cantidad, 10);
          }
        });
        sistema.getProductos.forEach((currentProducto) => {
          currentProducto.getIngredientes.forEach(
            (currentIngrediente) => {
              if ((currentIngrediente[0].getId = id)) {
                currentIngrediente.setNombre = req.query.Ingrediente;
                currentIngrediente.setCosto = parseInt(req.query.Costo, 10);
                currentIngrediente.setUnidad = req.query.Unidad;
                currentIngrediente.setCantidad = parseInt(req.query.Cantidad, 10);
              }
            }
          );
          currentProducto.calcularCosto();
        });
      } else {
        console.log("campos incorrectos");
      }
      res.render("ingredientes/ingredientes", {
        result: sistema.getIngredientes,
      });
    });

    //PRODUCTOS
    app.get("/productos", (req, res) => {
      res.render("productos", {
        result: sistema.getProductos,
        formateador: currencyFormatter,
      });
    });
    app.get("/productos/:id", (req, res) => {
      sistema.getProductos.forEach((element) => {
        if (element.getId == req.params.id) {
          res.render("ingredientesProducto", {
            result: element.getIngredientes,
            tamaño: element.getIngredientes.length,
            id: element.getId,
            formateador: currencyFormatter,
          });
        }
      });
    });
    app.get("/productos/buscar/:id", (req, res) => {
      sistema.getProductos.forEach((element) => {
        if (element.getId == req.params.id) {
          console.log(element.buscarIngredientes(req.query.buscador));
          res.render("ingredientesProducto", {
            result: element.buscarIngredientes(req.query.buscador),
            id: element.getId,
            formateador: currencyFormatter,
          });
        }
      });
    });
    app.post("/productos/buscar/:buscador", (req, res) => {
      const buscado = req.body.buscador;
      res.render("productos", {
        result: sistema.buscarProductos(buscado),
        formateador: currencyFormatter,
      });
    });
    app.get("/ingresarProducto", (req, res) => {
      res.render("ingresarProducto");
    });
    app.post("/ingresarProducto", async (req, res) => {
      let producto = new Producto(undefined,req.body.producto,parseInt(req.body.margen, 10),parseInt(req.body.packaging, 10),undefined,parseInt(req.body.agregado, 10),parseInt(req.body.cantidadReceta, 10));
      if (!sistema.verificarProducto(producto)) {
        let sql = `insert into productos values(null, '${req.body.producto}',${parseInt(req.body.margen, 10)},${parseInt(req.body.packaging,10)},${parseInt(req.body.agregado,10)}, ${parseInt(req.body.cantidadReceta, 10)});`;
        obteneDatos(sql);
        sql = `select max(id) as id from productos;`;
        const id = await obteneDatos(sql);
        producto.setId = id[0].id;
        sistema.agregarProducto(producto);
      } else {
        console.log("corregir campos");
      }
      res.render("productos", { result: sistema.getProductos });
    });
    app.get("/eliminarProducto/:id", (req, res) => {
      console.log(req.params.id);
      let indice = -1;
      sistema.getProductos.forEach((currentProducto, index) => {
        if (currentProducto.getId == req.params.id) {
          indice = index;
        }
      });
      if (indice == -1) {
        console.log("este elemento ya no existe");
      } else {
        let sql = `delete from infoingredientes where productos_id = ${req.params.id}`;
        obteneDatos(sql);
        sql = `delete from productos where id = ${req.params.id}`;
        obteneDatos(sql);
        sistema.getProductos.splice(indice, 1);
      }
      res.render("productos", { result: sistema.getProductos });
    });
    app.get("/editarProductoInterfaz/:id", (req, res) => {
      let producto;
      sistema.getProductos.forEach((currentProducto) => {
        if (currentProducto.getId == req.params.id) {
          producto = currentProducto;
        }
      });
      console.log(producto);
      res.render("editarProducto", { result: producto, id: req.params.id });
    });
    app.get("/editarProducto/:id", (req, res) => {
      console.log(req.query);
      let producto = new Producto(req.params.id,req.query.producto,parseInt(req.query.margen), parseInt(req.query.packaging),undefined,parseInt(req.query.agregado),parseInt(req.query.cantidadReceta, 10));
      if (!sistema.verificarNumerosProductos(producto)) {
        let sql = `update productos set nombre = "${req.query.producto}", margen = ${parseInt(req.query.margen, 10)}, packaging = ${parseInt(req.query.packaging,10)}, agregado = ${parseInt(req.query.agregado,10)}, cantidadReceta = ${parseInt(req.query.cantidadReceta, 10)} where id = ${req.params.id};`;
        obteneDatos(sql);
        let i = 0;
        sistema.getProductos.forEach((currentProducto, index) => {
          if (currentProducto.getId == req.params.id) {
            currentProducto.setNombre = req.query.producto;
            currentProducto.setMargen = parseInt(req.query.margen);
            currentProducto.setPackaging = parseInt(req.query.packaging);
            currentProducto.setAgregado = parseInt(req.query.agregado);
            currentProducto.setCantidadReceta = parseInt(req.query.cantidadReceta, 10);
            i = index;
          }
        });
        sistema.getProductos[i].calcularCosto();
      } else {
        console.log("corregir campos");
      }
      res.render("productos", { result: sistema.getProductos });
    });
    app.get("/seleccionarIngredientes/:id", (req, res) => {
      let ingredientes = [];
      sistema.getProductos.forEach((item) => {
        if (item.getId == req.params.id) {
          item.getIngredientes.forEach((currentIngrediente) => {
            ingredientes.push(currentIngrediente);
          });
        }
      });
      res.render("selectorIngredientes", {
        result: sistema.getIngredientes,
        ingredientesSelecionados: ingredientes,
        productoId: req.params.id,
      });
    });
    app.get("/seleccionarIngredientes/:buscar/:id", (req, res) => {
      
      console.log(req.params);
    });
    app.post("/recibirDatos/:id", (req, res) => {
      let sql = `delete from infoingredientes where productos_id = ${req.params.id}`;
      obteneDatos(sql);
      req.body.ingredientes.forEach((item) => {
        sql = `insert into infoingredientes values(${item[0]},${req.params.id},${item[1]})`;
        obteneDatos(sql);
        sistema.getIngredientes.forEach((currentIngrediente) => {
          if (parseInt(item[0]) == currentIngrediente.getId) {
            item[0] = currentIngrediente;
            item[1] = parseInt(item[1])
          }
        });
      });
      let productoActualizado;
      sistema.getProductos.forEach(item =>{
        if(item.getId == req.params.id){
            item.setIngredientes = req.body.ingredientes;
            item.calcularCosto();
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};
crearSistema();
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
