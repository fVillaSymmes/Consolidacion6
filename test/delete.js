const chai = require('chai');
const chaiHttp = require('chai-http');
const { servidorAnime } = require('../index.js')
chai.use(chaiHttp);

describe('Probando respuesta de servidor para método DELETE /anime', () => {
    it('Comprueba que respuesta de método DELETE es código 200', (done) => {
        chai
        .request(servidorAnime)
        .delete('/anime?id=7')
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})