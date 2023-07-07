const fs = require('fs/promises');
const { leerArchivoAnimeJson } = require('./leerArchivoAnimeJson')

const updateAnime = async(id, datosParaModificar) => {
    const archivoAnimes = await leerArchivoAnimeJson()
    const objetoAnimes = JSON.parse(archivoAnimes);
    const animePorModificar = objetoAnimes[id];
    const animeModificado = {...animePorModificar, ...datosParaModificar}

    objetoAnimes[id] = animeModificado;

    await fs.writeFile('../practicaDeConsolidacion6/datos/anime.JSON', JSON.stringify(objetoAnimes, null, 2))
}

module.exports = { updateAnime };