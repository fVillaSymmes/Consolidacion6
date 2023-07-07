const fs = require('fs/promises');
const { generadorId } = require('./generadorId.js')
const { leerArchivoAnimeJson } = require('./leerArchivoAnimeJson.js')

const crearAnime = async(nuevoAnime) => {
    const archivoAnimes = await leerArchivoAnimeJson()
    const objetoAnimes = JSON.parse(archivoAnimes);
    const id = await generadorId();

    objetoAnimes[id] = nuevoAnime;
    await fs.writeFile('../practicaDeConsolidacion6/datos/anime.JSON', JSON.stringify(objetoAnimes, null, 2))
}

module.exports = { crearAnime }