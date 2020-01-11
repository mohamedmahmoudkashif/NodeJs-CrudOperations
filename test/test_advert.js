const mongoose = require("mongoose");
const Advert = require('../app/models/Advert');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);



/*
  * Test the /GET list of adverts
  */
  describe('/GET advert', () => {
    it('it should GET all the adverts', (done) => {
      chai.request(server)
          .get('/list')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.data.data.length.should.be.eql(7);
                
            done();
          });
    });
});


/**
 * Test posting an advert with authentication
 */
describe('/POST advert', () => {
    var token = '';
    before(function(done) {
        let user = {
                email: 'mohamedmkashif@gmail.com',
                password: 'Kashif123',
            }
        chai.request(server)
            .post('/login')
            .send({
                email: 'mohamedmkashif@gmail.com',
                password: 'Kashif123'
            })
            .end(function(err, res) {
                var result = res.body.data.token;
                token = result;
            done();
        });
    });
    
    it('it should not an advert  without all required fields', (done) => {
        let advert = {
            title: "Ferrari",
            fuel: "gasoline",
            price: 79000,

        }
    chai.request(server)
        .post('/addAdvert')
        .send(advert)
        .set('x-access-token' , token)
        .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.message.should.include("Advert validation failed");
            done();
        });
    });
});

/**
 * Test for getting an advert by id
 */

describe('/GET/:id advert', () => {
    it('it should GET an advert by the given id', (done) => {
        let advert = new Advert({ 
            title: "BMW 6", 
            price: 250000, 
            fuel: "gasoline",
            new: true 
        });
        advert.save((err, advert) => {
            chai.request(server)
          .get('/list/' + advert._id)
          .send(advert)
          .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('title');
                // res.body.should.have.property('author');
                // res.body.should.have.property('pages');
                // res.body.should.have.property('year');
                // res.body.should.have.property('_id').eql(book.id);
            done();
          });
        });

    });
});


/**
 * Test for update an advert by id
 */

describe('/PUT/:id advert', () => {
    var token = '';
    before(function(done) {
        let user = {
                email: 'mohamedmkashif@gmail.com',
                password: 'Kashif123',
            }
        chai.request(server)
            .post('/login')
            .send({
                email: 'mohamedmkashif@gmail.com',
                password: 'Kashif123'
            })
            .end(function(err, res) {
                var result = res.body.data.token;
                token = result;
            done();
        });
    });
    it('it should UPDATE an advert of given id', (done) => {
        let advert = new Advert({
            title: "Dodge Ram", 
            price: 300000, 
            fuel: "diesel", 
            new: true
        })
        advert.save((err, advert) => {
              chai.request(server)
              .put('/update/' + advert._id)
              .send(
                  {title: "Dodge Dart", price: "200000", fuel: "gasoline", new: true}
                )
                .set('x-access-token' , token)
              .end((err, res) => {
                  console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Advert updated successfully');
                done();
              });
        });
    });
});

/**
 * Test delete endpoint
 */

describe('/DELETE/:id advert', () => {
    var token = '';
    before(function(done) {
        let user = {
                email: 'mohamedmkashif@gmail.com',
                password: 'Kashif123',
            }
        chai.request(server)
            .post('/login')
            .send({
                email: 'mohamedmkashif@gmail.com',
                password: 'Kashif123'
            })
            .end(function(err, res) {
                var result = res.body.data.token;
                token = result;
            done();
        });
    });

    it('it should DELETE an advert given the id', (done) => {
        let advert = new Advert({
            title: "Dodge Ram", 
            price: 300000, 
            fuel: "diesel", 
            new: true
        })
        advert.save((err, advert) => {
            console.log(advert);
              chai.request(server)
              .delete('/delete/' + advert._id)
              .set('x-access-token' , token)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Advert deleted successfully');
                done();
              });
        });
    });
});





