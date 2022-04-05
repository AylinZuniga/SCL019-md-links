const path = require('path');
const fs = require('fs');

// Función para validar la extensión del documento 
const extensionValidate = (router) => {
    const ext = path.extname(router.toLowerCase());
    if (ext === ".md") {
      return true;
    } else {
      console.log("No es un archivo md");
    }
};


//función para leer documento  
const validateFile = (files) => {
    try{
      const data = fs.readFileSync(files, "utf8");
      getLinks(data,files)

    }catch(e){
      throw new Error('Documento no válido',e)
    }
};

//Función para buscar y extraer los links del documento
const getLinks = (file , userPath) => {
        const lines = file.split("\n"); //separa en lineas el documento
    let arrayLinks = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
      const links = line.matchAll(regularEx);
      const match = regularEx.test(line);
      if (match) {
        for (const link of links) {
          const data = {
            text: link[1],
            href: link[2],
            file: userPath,
            line: i + 1,
          };
          arrayLinks.push(data);
        }
        console.log(arrayLinks)
      }
    }
    return arrayLinks;

  };













  //exporto las funciones que necesito
exports. extensionValidate =  extensionValidate;
exports. validateFile =  validateFile;
exports. getLinks =  getLinks;