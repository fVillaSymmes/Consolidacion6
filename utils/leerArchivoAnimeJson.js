const fs = require('fs/promises');

const leerArchivoAnimeJson = async() => {
    try {
        const jsonAnime = await fs.readFile('../practicaDeConsolidacion6/datos/anime.json')
        return jsonAnime
    } catch (error) {
        console.log(`No fue posible acceder al archivo anime.json: ${error}`);
    }
}



module.exports = { leerArchivoAnimeJson }