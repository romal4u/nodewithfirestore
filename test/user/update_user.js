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

describe("UPDATE USER OPERATION", async function () {
    beforeEach(async () => {
        await firebaseTesting.clearFirestoreData({ projectId: firebaseProjectId });
    });

    it("Should update particular user only", async () => {

        let inputData = {
            "email": "veeha@gmail.com",
            "name": "Romal",
            "phone_number": 9033436700
        }

        const testUser1 = db.doc('users/user1');
        await testUser1.set(inputData);

        const updateUser = {
            "email": "veeha19@gmail.com",
            "name": "Veeha",
            "phone_number": "9033423457"
        }

        let response = await chai.request(server)
            .post('/api/user/update/user1')
            .send(updateUser)
   
        expect(response).to.have.status(200);

        const testUser1Data = await testUser1.get();
        assert(testUser1Data.get('email') == 'veeha19@gmail.com', 'email updated');
        assert(testUser1Data.get('name') == 'Veeha', 'name updated');
        assert(testUser1Data.get('phone_number') == '9033423457', 'phone number updated');
    });

    it("Should check user not exist while update record", async () => {
        const updateUser = {
            "email": "veeha19@gmail.com",
            "name": "Veeha",
            "phone_number": "9033423457"
        }
        const updUserId = 1;
        let response = await chai.request(server)
            .post('/api/user/update/' + updUserId)
            .send(updateUser)
        expect(response).to.have.status(404);

    });

    it("Should check email aready used for other user while update record", async() => {
        let inputData = {
            "email": "romal@gmail.com",
            "name": "Romal",
            "phone_number": 9033436700
        }

        const testUser1 = db.doc('users/user1');
        await testUser1.set(inputData);

        let inputData1 = {
            "email": "veeha@gmail.com",
            "name": "Veeha",
            "phone_number": 9033693712
        }

        const testUser2 = db.doc('users/user2');
        await testUser2.set(inputData1);

        const updateUser = {
            "email": "romal@gmail.com",
            "name": "Veeha",
            "phone_number": "9033423457"
        }
        let response = await chai.request(server)
            .post('/api/user/update/user2')
            .send(updateUser)
   
        expect(response).to.have.status(409);
    });
});