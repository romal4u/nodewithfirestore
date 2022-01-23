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

const assert = chai.assert;
const expect = chai.expect;

before(done => {
    db = require('../../config/db');
    done();
});

describe("DELETE USER OPERATION", async function () {
    beforeEach(async () => {
        await firebaseTesting.clearFirestoreData({ projectId: firebaseProjectId });
    });

    it("Should delete particular user", async () => {

        let inputData = {
            "email": "veeha@gmail.com",
            "name": "Romal",
            "phone_number": "9033436700"
        }

        const testUser1 = db.doc('users/user1');
        await testUser1.set(inputData);

        let response = await chai.request(server)
            .get("/api/user/delete/user1");

        expect(response).to.have.status(200);

        const testUser1Data = await testUser1.get();
        assert(testUser1Data.exists == false, 'no record found');
    });

    it("Should give error message if try to delete user which is not exist", async () => {

        let response = await chai.request(server)
            .get("/api/user/delete/user1");

        expect(response).to.have.status(409);
    });
});
