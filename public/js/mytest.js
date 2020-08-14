
//file can be ignored
async function viewText() {
    const textSection = document.getElementById("text");
    textSection.innerHTML = "";
    const source = document.getElementById("source").value;
    const sSource = source.replace(/[ ,-/]/g, ".");
    const dSource = sSource.replace(/[.]/g, "");
    
    const sefariaUrl = `https://sefaria.org/api/texts/${sSource}`;
    const sefariaRes = await axios.get(sefariaUrl);
    const hebrewTexts = sefariaRes.data.he;
    const textContainerElem = document.createElement("div");
    hebrewTexts.forEach(line => {
        const lineElem = document.createElement("div");
        lineElem.textContent = line;
        textContainerElem.appendChild(lineElem);
    });
    textSection.appendChild(textContainerElem);
    
    const discourseUrl = `http://discourse2.akiva.ml/tags/${dSource}.json`;
    const discourseRes = await axios.get(discourseUrl);
    const comments = discourseRes.data.topic_list.topics;
    const commentContainerElem = document.createElement("div");
    comments.forEach(line => {
        const lineElem = document.createElement("div");
        lineElem.textContent = JSON.stringify(line);
        commentContainerElem.appendChild(lineElem);
    });
    textSection.appendChild(commentContainerElem);
    
    //get line 6:
    // document.getElementById("text").firstChild.childNodes[6];

    
}