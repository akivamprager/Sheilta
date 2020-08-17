class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfo: {
                he: []
            },
            questionInfo: [],
            kashyaInfo: [],
            chiddushInfo: [],
            referenceInfo: [],
            sections: {}
        };
        this.onNewTopic = this.onNewTopic.bind(this);
        this.onNewReply = this.onNewReply.bind(this);
        this.toggleTopic = this.toggleTopic.bind(this);
    }

    async componentDidMount() {
        this.setState({
            textInfo: await getText(this.props.textId), questionInfo: await getTopics(this.props.textId, "questions"),
            kashyaInfo: await getTopics(this.props.textId, "kashyas"), chiddushInfo: await getTopics(this.props.textId, "chiddushim"),
            referenceInfo: await getTopics(this.props.textId, "references")
        });
    }

    onNewTopic(lineNum) {
        createNewTopic(category)
    }
    onSubmitTopic(lineNum) {
        alert("new " + lineNum);
    }

    onNewReply(topicId) {
        alert("new " + topicId);
    }

    toggleTopic(topic) {
        const newSectionState = !this.isOpen(topic);
        const sections = Object.assign({}, this.state.sections);
        sections[topic.id] = newSectionState;
        this.setState({ sections: sections });
    }

    isOpen(topic) {
        return this.state.sections[topic.id];
    }

    createTopicContainer(topic) {
        const textClasses = ["topic-text"];
        if (!this.isOpen(topic)) {
            textClasses.push("hidden");
        }
        return (
            <div key={topic.id} className="topic-container" onClick={this.toggleTopic.bind(this, topic)}>
                <span className="topic-title">{topic.title}</span>
                <div className={textClasses.join(" ")}>
                    {
                        topic.post_stream.posts.map(post => (
                            <Post key={post.id} body={post.cooked} topicId={post.topic_id} onNewReply={this.onNewReply} />
                        ))
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h2>Sefaria Text</h2>
                <div id="texts" dir="rtl">
                    {this.state.textInfo &&
                        this.state.textInfo.he.map((line, index) => (
                            <TextLine key={index} line={line} lineNum={index} onNewTopic={this.onNewTopic} />
                        ))
                    }
                </div>
                <form id="new-topic" onSubmit={this.submitNewTopic}>
                    <h3>Start new topic</h3>
                    <label for="new-topic-category">Category: </label>
                    <select name="new-topic-category" id="new-topic-category" required>
                        <option disabled selected>Choose a category</option>
                        <option value="kashyas">Kashya</option>
                        <option value="questions">Question</option>
                        <option value="references">Reference</option>
                        <option value="chiddushim">Chiddush</option></select>
                    <label for="new-topic-title">Title: </label>
                    <input type="text" id="new-topic-title" required></input>
                    <label for="new-topic-text">Text: </label>
                    <textarea id="new-topic-text" required></textarea>
                    <button type="submit">Submit</button>
                </form>
                <h2>Questions</h2>
                <div id="questions">
                    {this.state.questionInfo && this.state.questionInfo.map(topic => this.createTopicContainer(topic))}
                </div>
                <h2>Kashyas</h2>
                <div id="kashyas">
                    {this.state.kashyaInfo && this.state.kashyaInfo.map(topic => this.createTopicContainer(topic))}
                </div>
                <h2>Chiddushim</h2>
                <div id="chiddushim">
                    {this.state.chiddushInfo && this.state.chiddushInfo.map(topic => this.createTopicContainer(topic))}
                </div>
                <h2>References</h2>
                <div id="references">
                    {this.state.referenceInfo && this.state.referenceInfo.map(topic => this.createTopicContainer(topic))}
                </div>
            </div>
        );
    }
}