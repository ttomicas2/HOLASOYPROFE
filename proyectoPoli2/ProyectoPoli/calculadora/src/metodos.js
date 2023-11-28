const { con } = require("./mysql");
const {Ingrediente,Producto,} = require("./clases");

  const obteneDatos = async ( sql ) => {
    try {
      result = await new Promise((resolve, reject) => {
        con.query(sql, (err, rest) => {
          if (err) throw err;
          resolve(rest);
        });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerIngredientes = async () => {
    let sql = `select * from ingredientes`;
    let result = await obteneDatos(sql);
    return result;
  }
  const crearIngrediente = (currenteIngrediente) => {
    return new Ingrediente(
      currenteIngrediente.id,
      currenteIngrediente.nombre,
      currenteIngrediente.costo,
      currenteIngrediente.unidad,
      currenteIngrediente.cantidad
    );
  }
  const obtenerProductos = async () => {
    let sql = `select * from productos`;
    let productosSql = await obteneDatos(sql);
    return productosSql;
  }
  const obtenerInfoIngredientes = async (productoId) => {
    let sql = `select * from infoingredientes where productos_id = ${productoId}`;
    let infoProducto = await obteneDatos(sql);
    return infoProducto;
  }
  const crearProducto = (producto, infoProducto, ingredientes) => {
    let ingredientesProducto = [];
    infoProducto.forEach(current => { 
        ingredientes.forEach((element) => {
        if (element.getId === current.materias_primas_id) {
            let ingredienteProducto = [element, current.cantidad];
            ingredientesProducto.push(ingredienteProducto);
        }
        });
    });
    return new Producto(
        producto.id,
        producto.nombre,
        producto.margen,
        producto.packaging,
        ingredientesProducto,
        producto.agregado,
        producto.cantidadReceta
    );
  }
  function currencyFormatter({ currency, value}) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }

module.exports ={
    crearIngrediente,
    crearProducto,
    obteneDatos,
    obtenerInfoIngredientes,
    obtenerIngredientes,
    obtenerProductos,
    currencyFormatter,
}