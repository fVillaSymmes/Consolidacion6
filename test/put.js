const chai = require('chai');
const chaiHttp = require('chai-http');
const { servidorAnime } = require('../index.js')
chai.use(chaiHttp);

describe('Probando respuesta de servidor para método PUT /anime', () => {
    it('Comprueba que respuesta de método PUT es código 200', (done) => {
        chai
        .request(servidorAnime)
        .put('/anime?id=2')
        .send({
            "nombre": "Fullmetal Alchemist",
            "genero": "Shonen",
            "año": "2001",
            "autor": "Hiromu Arakawa"
        })
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})