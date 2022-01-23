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

describe("FETCH DATA FROM THIRD PARTY API", async function () {
    beforeEach(async () => {
        await firebaseTesting.clearFirestoreData({ projectId: firebaseProjectId });
    });

    it("Should check url field is missing or not while add third party api data", async () => {
        let noURLObject = {
            "url": "",
            "user_id": "9033492700",
            "tags": {
                "name": "tag1",
                "is_custom": false
            }
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(noURLObject);
        expect(response).to.have.status(422);
    });

    it("Should check url field is valid or not while add third party api data", async () => {
        let notValidURLObject = {
            "url": "romalpatel",
            "user_id": "9033492700",
            "tags": {
                "name": "tag1",
                "is_custom": false
            }
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(notValidURLObject);
        expect(response).to.have.status(422);
    });

    it("Should check userid field is missing or not while add third party api data", async () => {
        let noUserIdObject = {
            "url": "https://retool.com/blog/crud-with-cloud-firestore-using-the-nodejs-sdk/",
            "user_id": "",
            "tags": {
                "name": "tag1",
                "is_custom": false
            }
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(noUserIdObject);
        expect(response).to.have.status(422);
    });


    it("Should check tag field is array or not while add third party api data", async () => {
        let noTagArrayObject = {
            "url": "https://retool.com/blog/crud-with-cloud-firestore-using-the-nodejs-sdk/",
            "user_id": "",
            "tags": 'nodejs'
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(noTagArrayObject);
        expect(response).to.have.status(422);
    });

    it("Should check userid is not exist while add third party api data", async () => {
        let noTagArrayObject = {
            "url": "https://retool.com/blog/crud-with-cloud-firestore-using-the-nodejs-sdk/",
            "user_id": "123",
            "tags": {
                "name": "tag1",
                "is_custom": false
            }
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(noTagArrayObject);
        expect(response).to.have.status(409);
    });

    it("Should return error while get error from the API while fetching record", async () => {
        let userData = {
            "email": "mona@gmail.com",
            "name": "Mona",
            "phone_number": "9033436700"
        }
        const testUser1 = db.doc('users/user1');
        await testUser1.set(userData);

        let inputData = {
            "url": "https://retoolxxxx.com/blog/crud-with-cloud-firestore-using-the-nodejs-sdk/",
            "user_id": "user1",
            "tags": ['nodejs', 'firebase']
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(inputData);
        expect(response).to.not.have.status(200);
    });

    it("Should fetch data from the API and insert into DB along with tags into user collection", async () => {
        let userData = {
            "email": "mona@gmail.com",
            "name": "Mona",
            "phone_number": "9033436700"
        }
        const testUser1 = db.doc('users/user1');
        await testUser1.set(userData);

        let inputData = {
            "url": "https://axios-http.com/docs/handling_errors",
            "user_id": "user1",
            "tags": {
                "name": "tag1",
                "is_custom": false
            }
        }

        let response = await chai.request(server)
            .post('/api/tag/fetchData')
            .send(inputData);
        expect(response).to.have.status(200);
    });
});
