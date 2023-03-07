const originalJson = '[{"Marca temporal":44945.47386574074,"Proveedor":"siseñor","Cebolla":22,"Tomate":34,"Limon":53,"Papa":65},{"Marca temporal":44945.47386574074,"Proveedor":"Aguh","Cebolla":45,"Tomate":55,"Limon":78,"Papa":50},{"Marca temporal":44945.47386574074,"Proveedor":"pufff","Cebolla":23,"Tomate":44,"Limon":38,"Papa":25},{"Marca temporal":44945.47386574074,"Proveedor":"delPlaya","Cebolla":28,"Tomate":37,"Limon":20,"Papa":76}]';

const data = JSON.parse(originalJson);

const productos = [];

// Iteramos por los productos en la data original
for (const producto in data[0]) {
  if (producto !== "Marca temporal" && producto !== "Proveedor") {
    const proveedores = [];
    // Iteramos por cada proveedor
    for (const proveedor of data) {
      proveedores.push({
        nombre: proveedor.Proveedor,
        precio: proveedor[producto]
      });
    }
    productos.push({
      id: producto,
      proveedores
    });
  }
}

const resultado = { productos };
const resultadoJson = JSON.stringify(resultado);
console.log(resultadoJson);
