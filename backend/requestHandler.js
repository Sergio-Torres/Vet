const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./router');

//esta funcion http recibe otra funcion como parametro 
module.exports=((req, res)=>{
    //1.obtener la url desde el objet request =req
    const urlActual = req.url;
    urlParseada = url.parse(urlActual, true);
    console.log({urlActual, urlParseada});

    //2. obtener la ruta
    const ruta = urlParseada.pathname;

    //3. quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    //3.1 obtener el metodo http 
    const metodo = req.method.toLowerCase();
    
    //3.2 obtener las variables del query url
    const { query={} } = urlParseada;

    //3.3 obtener headers
    const { headers={} } = req;
    
    //3.4 obtener payload en el caso de haber uno
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    //3.4.1 ir acumulando la data cuando el request reciba un payload
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });

    // 3.4.2 terminar de acumular datos y decirle al decoder que finalice
    req.on('end', ()=>{
        buffer += decoder.end();
        
        if(headers["content-type"]==='application/json'){
            buffer = JSON.parse(buffer);
        }
        //3.4.2 revisar si tiene sus rutas (array index)
        if(rutaLimpia.indexOf("/")>-1){
            var [rutaPrincipal, id]= rutaLimpia.split('/');            
        }

        //3.5 ordenar la data del requuest
        const data = {
            id,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };

        console.log({ data  });
        //elegir el manejador de la ruta y asignarle una función que el enrutador tiene
        let handler;
        if(data.ruta &&
            enrutador[data.ruta] && 
            enrutador[data.ruta][metodo]){
                handler = enrutador[data.ruta][metodo];
        }
        else{
            handler = enrutador.noEncontrado;
        }

        //4. ejecutar handler(manejador) para enviar la respuesta
        if(typeof handler === 'function'){
            handler(data, (statusCode = 200, mensaje)=>{
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);                
                
                // linea donde realmente ya estamos respondiendo a la aplicación cliente
                res.end(respuesta);

            })
        }
    });    
});
