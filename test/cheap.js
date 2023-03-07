// Primero, parsea el JSON original
const productosJSON = `{
    "productos": [
       {
          "id": "producto1",
          "proveedores": [
             {
                "nombre": "Proveedor A",
                "precio": 10.99
             },
             {
                "nombre": "Proveedor B",
                "precio": 12.99
             },
             {
                "nombre": "Proveedor C",
                "precio": 9.99
             }
          ]
       },
       {
          "id": "producto2",
          "proveedores": [
             {
                "nombre": "Proveedor A",
                "precio": 5.99
             },
             {
                "nombre": "Proveedor B",
                "precio": 6.99
             },
             {
                "nombre": "Proveedor C",
                "precio": 7.99
             }
          ]
       }
    ]
 }`;
 
 const productos = JSON.parse(productosJSON).productos;
 
 // Luego, ordena los proveedores de menor a mayor precio
 for (const producto of productos) {
   producto.proveedores.sort((a, b) => a.precio - b.precio);
 }
 
 // Finalmente, crea un nuevo objeto JSON con los productos y los proveedores ordenados
 const productosOrdenadosJSON = JSON.stringify({ productos });
 
 console.log(productosOrdenadosJSON);
 