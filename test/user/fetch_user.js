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

describe("FETCH USER OPERATION", async function () {
    beforeEach(async () => {
        await firebaseTesting.clearFirestoreData({ projectId: firebaseProjectId });
    });

    it("Should fecth all the users", async () => {
        let response = await chai.request(server)
            .get('/api/user');
        expect(response).to.have.status(200);
    });

    it("Should fetch particular user only", async () => {

        let inputData = {
            "email": "veeha@gmail.com",
            "name": "Romal",
            "phone_number": "9033436700"
        }

        const testUser1 = db.doc('users/user1');
        await testUser1.set(inputData);

        let response = await chai.request(server)
            .get("/api/user/user1")
        expect(response).to.have.status(200);

    });

    it("Should give proper error message if user id doesn't exist", async () => {
        let response = await chai.request(server)
            .get("/api/user/user1")
        expect(response).to.have.status(404);
    });
});
