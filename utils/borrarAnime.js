const fs = require('fs/promises');
const { leerArchivoAnimeJson } = require('./leerArchivoAnimeJson.js')

const deleteComics = async(id) => {
    const archivoAnimes = await leerArchivoAnimeJson();
    const objetoAnimes = JSON.parse(archivoAnimes);
    delete objetoAnimes[id]
    await fs.writeFile('../practicaDeConsolidacion6/datos/anime.JSON', JSON.stringify(objetoAnimes, null, 2))
}

module.exports = { deleteComics };