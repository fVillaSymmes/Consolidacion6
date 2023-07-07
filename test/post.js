const chai = require('chai');
const chaiHttp = require('chai-http');
const { servidorAnime } = require('../index.js')
chai.use(chaiHttp);

describe('Probando respuesta de servidor para método POST /anime', () => {
    it('Comprueba que respuesta de método POST es código 200', (done) => {
        chai.request(servidorAnime)
        .post('/anime')
        .send({
            "nombre": "Sonny Boy",
            "genero": "Sci-fi",
            "año": "2021",
            "autor": "Shingo Natsume"
        })
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})