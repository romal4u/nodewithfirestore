const firebaseTesting = require("@firebase/testing");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiPromise = require('chai-as-promised');
let server = require("../../index");

chai.use(chaiPromise);
let db;
const firebaseProjectId = 'nodewithfirebase-e885a';
chai.use(chaiHttp);

// Reference site for how to write test for the rest api
// https://medium.com/kanssfer-consulting/testing-expressjs-rest-api-with-mocha-and-chai-90bf4178f15e

const expect = chai.expect;

before(done => {
     db = require('../../config/db');
     done();
});

describe("ADD USER OPERATION", async function () {
     beforeEach(async () => {
          await firebaseTesting.clearFirestoreData({ projectId: firebaseProjectId });
     })

     let user = {
          "email": "veeha@gmail.com",
          "name": "Veeha",
          "phone_number": "9033423457"
     };

     it("Should add user in DB", async () => {
          let response = await chai.request(server)
               .post('/api/user/create')
               .send(user);
          expect(response).to.have.status(200);
     });

     it("Should check email field is missing or not while add users", async () => {
          let noEmailinObject = {
               "name": "Mona",
               "phone_number": "9033492700"
          }

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(noEmailinObject)
          expect(response).to.have.status(422);
     });

     it("Should check email field is valid or not while add users", async () => {
          let noEmailinObject = {
               "email": "Mona",
               "name": "Mona",
               "phone_number": "9033492700"
          }

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(noEmailinObject);
          expect(response).to.have.status(422);
     });

     it("Should check name field is missing or not while add users", async () => {
          let noNameinObject = {
               "email": "mona@gmail.com",
               "phone_number": "9033492700"
          }

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(noNameinObject);
          expect(response).to.have.status(422);
     });

     it("Should check name field is valid or not while add users", async () => {
          let noEmailinObject = {
               "email": "mona@gmail.com",
               "name": "",
               "phone_number": "9033492700"
          }

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(noEmailinObject);
          expect(response).to.have.status(422);
     });

     it("Should check phone number field is missing or not while add users", async () => {
          let noNameinObject = {
               "email": "mona@gmail.com",
               "name": "Mona",
          }

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(noNameinObject);
          expect(response).to.have.status(422);
     });

     it("Should check phone number field is valid or not while add users", async () => {
          let noEmailinObject = {
               "email": "mona@gmail.com",
               "name": "Mona",
               "phone_number": ""
          }

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(noEmailinObject);
          expect(response).to.have.status(422);
     });

     it("Should not add user with same email in DB", async () => {
          let inputData = {
               "email": "veeha@gmail.com",
               "name": "Romal",
               "phone_number": 9033436700
          }
          await db.collection('users').add(inputData);

          let response = await chai.request(server)
               .post('/api/user/create')
               .send(inputData);
          expect(response).to.have.status(409);
     });
});