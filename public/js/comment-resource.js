// all of the functions for POSTing posts to Discourse
async function createNewTopic(category, topicTitle, text, context) {
    const tag = new URLSearchParams(location.search).get("location").replace(/[.]/g, "-") + "-" + context;
    const topic = {
        "title": topicTitle,
        "raw": text,
        "category": category,
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
