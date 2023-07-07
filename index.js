const http = require('http');
const { leerAnime } = require('./utils/leerAnime.js');
const { crearAnime } = require('./utils/crearAnime.js');
const { updateAnime } = require('./utils/actualizarAnime.js');
const { deleteComics } = require('./utils/borrarAnime.js')


const servidorAnime = http.createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`)
    const params = new URLSearchParams(searchParams)
    const id = params.get("id")
    const name = params.get("name");
    console.log(`${pathname}/id: ${id}/name: ${name}`);

if(pathname == '/anime') {
    switch (req.method) {
        case 'GET':

        const { objetoIndexAnimes, objetoAnimes, idAnimes, namesAnimes } = await leerAnime()

            if(id == null && name == null){
                try {
                    res.write(JSON.stringify(objetoAnimes, null, 2))
                    res.write('\nLa lectura y muestra del contenido del archivo anime.json fue exitosa.')
                    res.statusCode = 200;
                    res.end()
                } catch (error) {
                    res.write('No fue posible desplegar la lista de animé.')
                    res.statusCode = 400;
                    res.end()
                    console.log(`No fue posible mostrar la lista de animé. Error: ${error}`);
                }
            } else if(idAnimes.includes(id)) {
                    try {
                        res.write(JSON.stringify(objetoAnimes[id], null, 2))
                        res.statusCode = 200;
                        res.write(`\n\nLa lectura y muestra del animé id:${id} fue exitosa.`)
                        res.end()
                    } catch (error) {
                    res.write('No fue posible mostrar el animé seleccionado.')
                    res.statusCode = 400;
                    res.end()
                    console.log(`El id provisto no corresponde a ningún animé o no es un número. Error: ${error}`);
                    }
            } else if(namesAnimes.includes(name)) {    
                    try {
                        res.write(JSON.stringify(objetoAnimes[objetoIndexAnimes[name]], null, 2))
                        res.statusCode = 200;
                        res.write(`\n\nLa lectura y muestra del animé id:${objetoIndexAnimes[name]} fue exitosa.`)
                        res.end()
                    } catch (error) {
                        res.write('No fue posible mostrar el animé seleccionado.')
                        res.statusCode = 400;
                        res.end()
                        console.log(`El name provisto no corresponde a ningún animé o no es un string. Error: ${error}`);
                    }
            } else {
                        res.write('El nombre o id provisto no corresponde a ningún animé o no está bien escrito.')
                        res.statusCode = 404;
                        res.end()
                        console.log('El nombre o id provisto no corresponde a ningún animé o no está bien escrito.');
                }

            break;
    
        case 'POST':
            try {
                let animeIngresado;
                req.on('data', (data) => {
                    animeIngresado = JSON.parse(data);
                    res.write(`Se procederá a agregar el siguiente animé:\n\n ${JSON.stringify(animeIngresado, null, 2)} `)
                })
                req.on('end', async() => {
                    await crearAnime(animeIngresado);
                    res.statusCode = 200;
                    res.write('\nComic agregado exitosamente');
                    res.end();
                })
            } catch (error) {
                res.write("ERROR: No fue posible agregar el animé indicado al archivo anime.json")
                res.end()
                console.log(`No fue posible agregar el animé indicado. Error: ${error}`);
            }
        break;
    
        case 'PUT':
        try {
            let datosParaModificar

            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            })
            req.on('end', async() => {
                await updateAnime(id, datosParaModificar)
                res.statusCode = 200;
                res.write('Los datos del animé indicado han sido modificados y cargados al archivo anime.json')
                res.end();
                
            })
        } catch (error) {
            res.write('No fue posible actualizar o modificar los datos del animé solicitado')
            res.end();
            console.log(`No fue posible actualizar o modificar los datos del animé indicado: ${error}`);
        }
        break;
    
        case 'DELETE':
        try {
            await deleteComics(id);
            res.statusCode = 200;
            res.write('\nEl animé indicado ha sido eliminado satisfactoriamente')
            res.end()
        } catch (error) {
            res.write('\nHa ocurrido un error. El animé indicado no ha podido ser eliminado.')
            res.end();
            console.log(`El animé indicado no ha podido ser eliminado: ${error} `);
        }
        break;
    
        default:
            break;
    }
}})
.listen(3000, function() {
    console.log("Servidor iniciado en el puerto 3000");
})

module.exports = { servidorAnime }