const functions = require('./functions.js');




const readline = require('readline').createInterface({ //lee la terminal 
  input: process.stdin,
  output: process.stdout
});

// Requerir ruta 

readline.question(`Ingresa tu ruta: \n`, (route) => {
  console.log(route);
  let userRoute = route;

  //Verificar que exista la ruta

  if (functions.checkRoute(userRoute)) {
    userRoute = functions.absolutePath(userRoute);
    console.log(" la ruta ingresada es ", userRoute);

    if (functions.isFile(userRoute)) {
      console.log("Es un archivo", userRoute);

      if (functions.extensionValidate(userRoute)) {
        console.log("md", route)

        functions.readFile(userRoute);
      }
      readline.close();
    }

  }
}
)
