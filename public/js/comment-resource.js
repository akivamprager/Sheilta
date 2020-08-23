// all of the functions for POSTing posts to Discourse
async function createTopic(textId, category, topicTitle, text, context) {
    const tag = textId.replace(/[.]/g, "-") + "-" + context;
    let categoryCode = 0;
    if (category === "questions")
        categoryCode = 5;
    else if (category === "kashyas")
        categoryCode = 6;
    else if (category === "references")
        categoryCode = 7;
    else if (category === "chiddushim")
        categoryCode = 8;

    const topic = {
        "title": topicTitle,
        "raw": text,
        "category": categoryCode,
        "tags": [
            tag
        ]
    }
    return await axios.post(`/api/v1/topics`, topic);
}

async function createComment(topicId, text) {
    const comment = {
        "topic_id": topicId,
        "raw": text
    }
    return await axios.post(`/api/v1/topics/${topicId}/comments`, comment);
}

async function upvotePost(postId) {
    return await axios.post(`/api/v1/posts/${postId}/upvote`);
}

async function downvotePost(postId) {
    return await axios.post(`/api/v1/posts/${postId}/downvote`);
}