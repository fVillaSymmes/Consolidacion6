const chai = require('chai');
const chaiHttp = require('chai-http');
const { servidorAnime } = require('../index.js')
chai.use(chaiHttp);

describe('Probando respuesta de servidor para método GET /anime', (done) => {
    it('Comprueba que método GET responde con código 200', (done) => {
        chai.request(servidorAnime).get('/anime').end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})