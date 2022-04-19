const functions = require('./functions.js');
var colors = require('colors/safe');

let links = []


const mdLinks = (path, options) => {

  let duplicados = [];
  let linkBroken = 0;
  let linksOk = 0;
  let arraylink = [];
  

  return new Promise((resolve) => {

    if (functions.checkRoute(path)) {

      path = functions.absolutePath(path);

      if (functions.isFile(path)) {

        if (functions.extensionValidate(path)) {

          const data = functions.readFile(path);
          functions.getLinks(data, path)
            .then((arrayLinks) => {
              totalLinks = arrayLinks.length
              arrayLinks.forEach(element => {
                links.push(element.href)

              });


              const promiseArr = links.map((url) => functions.validateLinks(url).then((status) => {
                arraylink.push(status);


                const busqueda = arraylink.reduce((acc, arraylink) => {
                  acc[arraylink.linkname] = ++acc[arraylink.linkname] || 0;
                  return acc;
                }, {});
                
                duplicados = arraylink.filter( (arraylink) => {
                  return busqueda[arraylink.linkname];
                });



                if (options.validate && !options.stats) {

                  if (status.status) {
                    status.status = 'ok'
                  } else {
                    status.status = 'fail'
                  }
                }



              })
                .catch((err) => {
                  console.log('La ruta  no existe');
                  console.log(err);
                }));


              return Promise.all(promiseArr);




            }).then(() => {

              if (options.validate && !options.stats) {

                console.table(arraylink)
              }

              if (options.validate && options.stats) {
                arraylink.forEach(element => {
                  if (element.status) {
                    linksOk++
                  } else {
                    linkBroken++
                  }
                });

                console.log('Total: ', arraylink.length)
                console.log('Broken : ', colors.red(linkBroken) )
                console.log('Unique: ' ,arraylink.length - duplicados.length )
              }

            }).then(() => {
              if (!options.validate && options.stats) {

                console.log('total: ',arraylink.length)
                console.log('unique: ' ,arraylink.length - duplicados.length )
              }

            });



        } else {
          console.log('No es una archivo .md')
        }
      } else {
        console.log('No es una archivo')
      }

    } else {
      console.log('La ruta no existe')
    }


  });
};


exports.mdLinks = mdLinks
