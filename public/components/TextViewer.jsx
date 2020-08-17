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
        this.onNewComment = this.onNewComment.bind(this);
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

    onNewComment(lineNum) {
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
        return (<div key={topic.id} className="topic-container" onClick={this.toggleTopic.bind(this, topic)}>
            <span className="topic-title">{topic.title}</span>
            <div className={textClasses.join(" ")}>
                {
                    topic.post_stream.posts.map(post => (
                        <Post key={post.id} body={post.cooked} topicId={post.topic_id} onNewReply={this.onNewReply} />
                    ))
                }
            </div>
        </div>);
    }

    render() {
        return (
            <div>
                <h2>Sefaria Text</h2>
                <div id="texts" dir="rtl">
                    {this.state.textInfo &&
                        this.state.textInfo.he.map((line, index) => (
                            <TextLine key={index} line={line} lineNum={index} onNewComment={this.onNewComment} />
                        ))
                    }
                </div>
                <div id="new-comment">
                    <label for="new-comment-category">Category: </label>
                    <input type="dropdown" id="new-comment-category"></input>
                    <label for="new-comment-title">Title: </label>
                    <input type="text" id="new-comment-title"></input>
                    <label for="new-comment-text">Text: </label>
                    <textarea id="new-comment-text"></textarea>
                    
                </div>
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