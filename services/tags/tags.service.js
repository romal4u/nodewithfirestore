const db = require('../../config/db');

// Function for save to learn_content collection into user collection 
exports.saveLearnData = async (userId, learnContent) => {
    try {
        const learnContentRef = await db.collection('users').doc(userId)
            .collection('learn_content').add(learnContent);
        return {
            status: 200,
            learn_id: learnContentRef.id
        }

    } catch (e) {
        console.error('saveLearnData Error: ', e.message)
        return {
            status: 500,
            message: e.message
        }
    }
};

// Function for save tag into learn content collection into user collection
exports.saveLinkPreviewDatawithTag = async (learnContentId, tagsObj) => {
    try {
        return await db.collection('learn_content').doc(learnContentId)
            .collection('tags').add(tagsObj)
            .then((tagsRef) => {
                console.log("Tags ID:" + tagsRef.id);
                return {
                    status: 200,
                    tagId: tagsRef.id
                }
            })
            .catch((e) => {
                console.error('Error Tag Add:');
                console.error(e.message);
                return {
                    status: 500,
                    message: e.message
                }
            });
    } catch (e) {
        console.error('saveLinkPreviewDatawithTag Error: ', e.message)
        return {
            status: 500,
            message: e.message
        }
    }
}