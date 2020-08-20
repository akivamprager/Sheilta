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
    if (!(topics == null)) {
        const requests = [];
        for (let i = 0; i < topics.length; i++) {
            const result = topics[i];
            requests.push(axios.get(`/api/v1/topics/${result.id}`));
        }
        for (let i = 0; i < requests.length; i++) {
            const topic = await requests[i];
            topicList.push(topic.data);
        }
        return topicList;
    }
}
async function getTopicsByLine(textId, line, category) {
    const topicId = textId.replace(/[.]/g, "-") + "-" + line;
    const topicList = await getTopics(topicId, category);
    return topicList;
}
//parse sourcename into url
function parseSourceToURLParam(sourceName) {
    return `?location=${sourceName.replace(/[ -,]/g, ".")}`;
}
function skipPage(textId, direction) {
    let location = textId;
    if (direction === "next") {
        if (location.endsWith("a")) {
            location = replaceAt(location, location.length - 1, "b");
        } else if (location.endsWith("b")) {
            num = parseInt(location.charAt(location.length - 2)) + 1;
            location = replaceAt(location, location.length - 2, num);
            location = replaceAt(location, location.length - 1, "a");
        } else {
            num = parseInt(location.charAt(location.length - 1)) + 1;
            location = replaceAt(location, location.length - 1, num);
        }
    }
    else if (direction === "previous") {
        if (location.endsWith("a")) {
            location = replaceAt(location, location.length - 1, "b");
            num = parseInt(location.charAt(location.length - 2)) - 1;
            location = replaceAt(location, location.length - 2, num);
        } else if (location.endsWith("b")) {
            location = replaceAt(location, location.length - 1, "a");
        } else {
            num = parseInt(location.charAt(location.length - 1)) - 1;
            location = replaceAt(location, location.length - 1, num);
        }
    }
    redirectToSource(location);
}
function redirectToSource(textId) {
    location.href = location.origin + location.pathname + parseSourceToURLParam(textId);
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}
