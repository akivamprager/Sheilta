// functions for getting the texts and topics from sefaria and discourse

//const express = require("express");
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
    let locArr = location.split(".");
    let lastPart = locArr[locArr.length - 1];
    if (direction === "next") {
        if (lastPart.endsWith("a")) {
            location = replaceAt(location, location.length - 1, "b");
        } else if (lastPart.endsWith("b")) {
            let num = parseInt(lastPart.substring(0, lastPart.length - 1));
            let newLast = (num + 1) + "a";
            locArr[locArr.length - 1] = newLast;
            location = locArr.join();
        } else {
            num = parseInt(lastPart) + 1;
            locArr[locArr.length - 1] = num;
            location = locArr.join();
        }
    }
    else if (direction === "previous") {
        if (location.endsWith("a")) {
            let num = parseInt(lastPart.substring(0, lastPart.length - 1));
            let newLast = (num - 1) + "b";
            locArr[locArr.length - 1] = newLast;
            location = locArr.join();
        } else if (location.endsWith("b")) {
            location = replaceAt(location, location.length - 1, "a");
        } else {
            num = parseInt(lastPart) - 1;
            locArr[locArr.length - 1] = num;
            location = locArr.join();
        }
    }
    redirectToSource(location);
}
function redirectToSource(textId, msg) {
    location.href = location.origin + location.pathname + parseSourceToURLParam(textId)+"&msg="+msg;
}
function convertDate(timestamp) {
    const readable = new Date(timestamp);
    const m = readable.getMonth();
    const d = readable.getDate();
    const y = readable.getFullYear();
    const h = readable.getHours();
    const mi = readable.getMinutes();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const mlong = months[m];
    return `${mlong} ${d}, ${y} <span uk-icon="icon: clock"></span> ${h}:${mi}`;
}
//---util
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}
