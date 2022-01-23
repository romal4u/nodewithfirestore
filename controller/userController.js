const { success, error, validation } = require('../utils/restResponse');
const userService = require('../services/users/users.service');
const User = require('../model/userModel');

/**
 * Reference from https://firebase.google.com/docs/firestore/query-data/queries for getting idea about firebase query
 * Function for get all users
 */
exports.getAllUsers = async (req, res) => {
    try {
        const result = await userService.fetchAllUsers();
        const usersList = [];

        if (result.status == 200) {
            if (result.userData.empty) {
                return res.status(200).send(success('No user record found'));
            }
            else {
                result.userData.forEach(userDocument => {
                    const userModel = new User(
                        userDocument.id,
                        userDocument.data().email,
                        userDocument.data().name,
                        userDocument.data().phone_number
                    );
                    usersList.push(userModel);
                });
                return res.status(200).send(success("User List", usersList));
            }
        } else {
            return res.status(500).send(error('Error while fetchAllUsers'));
        }
    } catch (e) {
        console.error('getAllUsers Error: ' + e.message);
        return res.status(500).send(error(e.message));
    }
};

// Function for create user
exports.createUser = async (req, res) => {
    try {
        const inputData = req.body;
        const email = inputData.email;

        inputData.phone_number = parseInt(inputData.phone_number);

        const result = await userService.checkUserExistByEmail(email);

        if (result.status == 200) {
            if (!result.isExists) {
                const userResponse = await userService.insertUser(inputData);
                if (userResponse.status == 200) {
                    return res.status(200).send(success("User added successfully!", userResponse.userData));
                }
                else
                    return res.status(409).send(validation('Email already exist!', 409));
            } else {
                return res.status(409).send(validation('Email already exist!', 409));
            }
        }
        else {
            return res.status(500).send(error('Error while checking user by email'));
        }
    } catch (e) {
        console.error('createUser Error: ' + e);
        return res.status(500).send(error(e.message));
    }
};

// Function for get user by id
exports.findById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await userService.checkUserExistByID(userId);

        if (result.status == 200) {
            if (result.isExists) {
                const userDetail = result.userData;
                return res.status(200).send(success("User detail", userDetail));
            } else {
                return res.status(404).send(error('User with the given ID not found', 404));
            }
        }
    } catch (e) {
        console.error('findById Error: ' + e);
        return res.status(500).send(e.message);
    }
};

// Function for update user data
exports.updateUser = async (req, res) => {
    try {
        const inputData = req.body;
        const email = inputData.email;
        const userId = req.params.userId;

        const result = await userService.checkUserExistByID(userId);

        if (result.status == 200) {
            if (result.isExists) {
                const usersDatabyEmail = await userService.checkUserExistByEmail(email);
                if (usersDatabyEmail.status == 200) {
                    if (usersDatabyEmail.isExists == 0) {
                        await userService.updateUser(userId, inputData);
                        inputData.id = userId;
                        return res.status(200).send(success("User updated successfully!", inputData));
                    } else {
                        for (const user of usersDatabyEmail.userData.docs) {
                            if (user.id != userId) {
                                return res.status(409).send(validation('Email ' + email + ' already used!', 409));
                            }
                        }
                        await userService.updateUser(userId, inputData);
                        inputData.id = userId;
                        return res.status(200).send(success("User updated successfully!", inputData));
                    }
                } else {
                    return res.status(404).send(validation('User not found!', 404));
                }
            }
            else {
                return res.status(404).send(validation('User not found!', 404));
            }
        }
    } catch (e) {
        console.error, ('updateUser Error: ' + e);
        return res.status(500).send(error(e.message));
    }
};

// Function for delete user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await userService.checkUserExistByID(userId);

        if (result.status == 200) {
            if (!result.isExists) {
                return res.status(409).send(validation('User not found!', 409));
            } else {
                await userService.deleteUser(userId);
                return res.status(200).send(success("User deleted successfully!"));
            }
        } else {
            return res.status(500).send(error('Error while check user by id'));
        }
    } catch (e) {
        console.error('deleteUser Error: ' + e);
        return res.status(500).send(error(e.message));
    }
};