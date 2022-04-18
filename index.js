const functions = require('./functions.js');
let links = []


 const mdLinks = (path,options) => {

  let totalLinks = 0;
  let linksOk = 0;
  let linkBroken =0;
  let arraylink = [];

  return new Promise((resolve) => {
    
    if(functions.checkRoute(path)){

      path = functions.absolutePath(path);

      if(functions.isFile(path)){

        if(functions.extensionValidate(path)){

         const data = functions.readFile(path);
         functions.getLinks(data,path)
         .then((arrayLinks) => {
          totalLinks = arrayLinks.length
          
          arrayLinks.forEach(element => {
            links.push(element.href)
          });

    
            const promiseArr = links.map((url) => functions.validateLinks(url).then((status) => {
              arraylink.push(status);

              if(options.validate && !options.stats ){
              console.log('Link : ', status.linkname, )
              console.log('Status Code : ', status.Code)
              if(status.status){
              console.log('Status: OK ','\n')
              }else{
              console.log('Status: NOTFOUND ', '\n')
                  } 
                }

            })
              .catch((err) => {
                console.log('La ruta  no existe'.bgRed);
                console.log(err);
              }));
            return Promise.all(promiseArr);



          }).then(() => {
            if(!options.validate && options.stats ){
              arraylink.forEach(element => {
                   if(element.status){
                     linksOk++
                   }else{
                     linkBroken++
                   }
               });

               console.log('Links Correctos : ', linksOk)
               console.log('Links Rotos : ', linkBroken)
            }
          })

        }else{
          console.log('No es una archivo .md')
        }
      }else{
        console.log('No es una archivo')
      }

    }else{
      console.log('La ruta no existe')
    }


  });
};


exports.mdLinks = mdLinks
