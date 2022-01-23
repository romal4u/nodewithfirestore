const db = require('../../config/db');

// Function to check email address exists in user's collection
exports.checkUserExistByEmail = async (email) => {
    try {
        const userCollection = db.collection('users').where('email', '==', email);
        const userData = await userCollection.get();
        return {
            status:200,
            isExists: userData.size,
            userData: userData
        }
    } catch (e) {
        console.error('checkUserExistByEmail Error: ', e.message)
        return {
            status: 500,
            message:e.message
        }
    }
};

// Function to check user exist or not by user Id
exports.checkUserExistByID = async (userId) => {
    try {
        const userCollection = db.collection('users').doc(userId);
        const userData = await userCollection.get();
        return {
            status:200,
            isExists:userData.exists,
            userData: userData.data()
        }
    } catch (e) {
        console.error('checkUserExistByID Error: ', e.message)
        return {
            status: 500,
            message:e.message
        }
    }
};

// Function for insert user into user collection
exports.insertUser = async (inputData) => {
    try {
        const userDoc = await db.collection('users').add(inputData);
        inputData.id = userDoc.id;
        return {
            status:200,
            userData: inputData
        }
    } catch(e) {
        console.error("insertUser Error: ", e.message);
        return {
            status: 500,
            message:e.message
        }
    }
};

// Function for fetch all users from the user collection
exports.fetchAllUsers = async () => {
    try {
        const usersCollection = await db.collection('users');
        const userData = await usersCollection.get();
        return {
            status:200,
            userData: userData
        }
    } catch(e) {
        console.error("fetchAllUsers Error: ", e.message);
        return {
            status: 500,
            message:e.message
        }
    }
};

// Function for update user data
exports.updateUser = async (userId, inputData) => {
    try {
        const userCollection = await db.collection('users').doc(userId);
        userCollection.update(inputData);
        return 'success';
    } catch(e) {
        console.error("deleteUser Error: ", e.message);
    }
};

// Function for delete specific user from the user collection by id
exports.deleteUser = async (userId) => {
    try {
        await db.collection('users').doc(userId).delete();
    } catch(e) {
        console.error("deleteUser Error: ", e.message);
    }
};