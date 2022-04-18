const path = require('path');
const { lstatSync, existsSync} = require('fs');
const fs = require("fs") ;



// Verificar que la ruta exista 
const checkRoute = (route) => existsSync(route);

//Convertir ruta a absoluta
const absolutePath = (route) => (path.isAbsolute(route) ? answer : path.resolve(route));

//Ver si la ruta es un archivo
const isFile = (route) => lstatSync(route).isFile();

// Función para validar la extensión del documento 
const extensionValidate = (route) => {
    const ext = path.extname(route.toLowerCase());
    if (ext === ".md") {
        return true;
    } else {
        console.log("No es un archivo md");
        return false;
        
    }
};


//función para validar documento  para ver si es valido o no
const readFile = (files) => {
    try {
        console.log("files", files)
        const data = fs.readFileSync(files, "utf8");
        const arrayLinks= getLinks(data, files) 
        return arrayLinks  
    } 

    catch (e) {
        throw new Error('Documento no válido', e)
    }
};

//Función para buscar y extraer los links del documento
const getLinks = (file, userPath) => {
    const lines = file.split("\n"); //separa en lineas el documento
    let arrayLinks = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
        const links = line.matchAll(regularEx); 
        const match = regularEx.test(line); // test para ver si lo que hace match es un link
        if (match) {
            for (const link of links) { 
                const data = {
                    text: link[1],
                    href: link[2],
                    file: userPath,
                    line: i + 1,
                };
                arrayLinks.push(data); // se suma al arreglo de links
            }
            console.log(arrayLinks)
        }
    }
    return arrayLinks;

};

function validateLinks(link) {
    return new Promise((resolve) => {
      const options = {
        method: 'HEAD',
        host: url.parse(link).host,
        port: 80,
        path: url.parse(link).pathname,
      };
      const req = http.request(options, (res) => {
        const nuevaData = {
          linkname: link,
          Code: res.statusCode,
          status: res.statusCode <= 399,
        };
        // console.log(`statusCode: ${res.statusCode}`)
        resolve(nuevaData); 
      })
  
      req.on('error', (error) => {
        // console.error(error);
        const newData = {
          linkname: link,
          status: false,
        };
        resolve(newData);
      });
      req.end()
    })
  }












//exporto las funciones que necesito
exports.checkRoute = checkRoute;
exports.absolutePath = absolutePath;
exports.isFile = isFile;
exports.extensionValidate = extensionValidate;
exports.readFile = readFile;
exports.getLinks = getLinks;
exports.validateLinks = validateLinks;
