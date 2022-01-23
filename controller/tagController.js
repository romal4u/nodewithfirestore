const config = require('../config/config');
const axios = require('axios');
const { success, error, validation } = require('../utils/restResponse');
const tagService = require('../services/tags/tags.service');
const userService = require('../services/users/users.service');

// Fetch data from LinkPreview API
exports.fetchData = async (req, res) => {
    try {
        const inputData = req.body;
        const userId = inputData['user_id'];

        const apiUrl = config.link_preview_api_url;
        const apiKey = config.link_preview_api_key;

        // Check whether user with given id is exist or not 
        const result = await userService.checkUserExistByID(userId);

        if (result.status == 200) {
            if (result.isExists) {
                let qstr = 'key=' + apiKey + '&q=' + inputData['url'];

                // Fetch data from the LinkPreview API
                const apiResult = await axios.post(apiUrl, qstr);
                const learnContent = apiResult.data;
                learnContent.status = 'unread';
                learnContent.created_at = new Date();

                const learnResult = await tagService.saveLearnData(userId, learnContent);

                if (learnResult.status == 200 && Object.keys(inputData['tags']).length > 0) {
                    const learnContentId = learnResult.learn_id;
                    const tagsObj = Object.assign({}, inputData['tags']);

                    const tagResult = await tagService.saveLinkPreviewDatawithTag(learnContentId, tagsObj);

                    if (tagResult.status == 200) {
                        learnContent.tags = tagsObj;
                        return res.status(200).send(success("Record saved successfully!", learnContent));
                    }
                } else {
                    return res.status(500).send(error('Error while inserting learn data'));
                }
            }
            else {
                return res.status(409).send(validation('User not found!', 409));
            }
        } else {
            return res.status(409).send(validation('User not found!', 409));
        }
    } catch (e) {
        console.error(e.message);
        return res.status(500).send(error(e.message));
    }
}