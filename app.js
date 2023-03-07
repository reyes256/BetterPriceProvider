const xlsx = require('xlsx'); // Pa leer excel
const fs = require('fs'); // Pa escribir y leer archivos del sistema(JSON)

// Leer excel y convertirlo en JSON
function ReadExcel(path){
    const workBook = xlsx.readFile(path);
    const sheetName = workBook.SheetNames[0];

    let jsonData = xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);
    let jsonString = JSON.stringify(jsonData);

    GenerateJSON(jsonString);
}

// Generar el archivo JSON
function GenerateJSON(jsonString){
    const data = JSON.parse(jsonString);

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

    //console.log(resultadoJson);
    
    fs.writeFileSync('./json_files/prices.json', resultadoJson);

    GetCheapest()
}

// En base al archivo previamente generado, Logica para calcular provedor con mejor precio de cada producto
function GetCheapest(){
    let jsonData = fs.readFileSync('./json_files/prices.json')
    
    const objOriginal = JSON.parse(jsonData);
    
    const objModificado = {
      productos: objOriginal.productos.map((producto) => ({
        id: producto.id,
        proveedores: producto.proveedores.sort((a, b) => a.precio - b.precio),
      })),
    };
    
    const jsonModificado = JSON.stringify(objModificado);

    fs.writeFileSync('./json_files/best_prices.json', jsonModificado);

    GenerateExcel()
}

function GenerateExcel(){

    /* 
        Todaviano

    // Read the JSON data from a file
    const jsonData = JSON.parse(fs.readFileSync('./json_files/best_prices.json'));

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(jsonData);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a file
    xlsx.writeFile(workbook, './excel_files/cheapest_prices.xlsx');
    */

}


// Inicia el programa tomando un archivo excel como parametro ya con un formato en especifico
ReadExcel('./excel_files/google_prices.xlsx');