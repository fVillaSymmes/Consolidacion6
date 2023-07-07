const { leerArchivoAnimeJson } = require('./leerArchivoAnimeJson.js');

const generadorId = async() => {
    const jsonAnime = await leerArchivoAnimeJson();
    const objetoAnimes = JSON.parse(jsonAnime);
    idAnimes = Object.keys(objetoAnimes);
    if(idAnimes.length == 0) {
        return 1;
    }else if(idAnimes.length > 0){
        const nuevoId = idAnimes.length + 1;
        return nuevoId;
    }
}

module.exports = { generadorId }