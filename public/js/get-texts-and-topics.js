// functions for getting the texts and topics from sefaria and discourse
async function getText(textId) {
    const sefariaRes = await axios.get(`/api/v1/texts/${textId}`);
    return sefariaRes.data;
}

async function getTopics(textId, category) {
    const topicId = textId.replace(/[.]/g, "-");
    const discourseRes = await axios.get(`/api/v1/categories/${category}/${topicId}`);
    const topicList = [];
    const topics = discourseRes.data.topics;
    for (let i = 0; i < topics.length; i++) {
        const result = topics[i];
        const topic = await axios.get(`/api/v1/topics/${result.id}`);
        topicList.push(topic.data);
    }
    return topicList;
}