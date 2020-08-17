class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfo: {
                he: []
            },
            questionInfo: [],
            sections: {}
        };
        this.onNewComment = this.onNewComment.bind(this);
        this.onNewReply = this.onNewReply.bind(this);
        this.toggleTopic = this.toggleTopic.bind(this);
    }

    async componentDidMount() {
        this.setState({ textInfo: await getText(this.props.textId), questionInfo: await getTopics(this.props.textId, "questions") });
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
                <h2>Questions</h2>
                <div id="questions">
                    {this.state.questionInfo && this.state.questionInfo.map(topic => this.createTopicContainer(topic))}
                </div>
                <h2>Kashyas</h2>
                <div id="kashyas">
                </div>
                <h2>Chiddushim</h2>
                <div id="chiddushim">
                </div>
                <h2>References</h2>
                <div id="references">
                </div>
            </div>
        );
    }
}