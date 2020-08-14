class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfo: {
                he: []
            },
            questionInfo: {
                topics: []
            }
        };
        this.onNewComment = this.onNewComment.bind(this);
        this.onNewReply = this.onNewReply.bind(this);
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

    render() {
        return (
            <div>
                <h2>Sefaria Text</h2>
                <div id="texts" dir="rtl">
                    {
                        this.state.textInfo.he.map((line, index) => (
                            <TextLine key={index} line={line} lineNum={index} onNewComment={this.onNewComment} />
                        ))
                    }
                </div>
                <h2>Questions</h2>
                <div id="questions">
                    {
                        this.state.questionInfo.topics.forEach(topic => {
                            const title = topic.title;
                            topic.post_stream.posts.forEach(post => {
                                <TextLine key={post.post_number} line={post.cooked} topicId={post.topicId} onNewReply={this.onNewReply} />
                            });
                        })
                        //this.state.questionInfo.topics.map((line, index) => (
                        //   <TextLine key={index} line={line} topicId={index} onNewReply={this.onNewReply} />
                        //))
                    }
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