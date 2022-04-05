const functions = require('./functions.js');

let userPath = '';


const readline = require('readline').createInterface({ //lee la terminal 
  input: process.stdin,
  output: process.stdout
})


readline.question(`Ingresa tu ruta: \n`, (path) => {
  console.log(path)
  userPath= path

  if(functions.extensionValidate(userPath)){
   functions.validateFile(userPath)
  }
  readline.close()
})


