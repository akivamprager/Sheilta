class TextLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line: props.line
        };
        this.onNewTopic = this.onNewTopic.bind(this);
        this.onShowTopics = this.onShowTopics.bind(this);
    }

    onNewTopic() {
        this.props.launchTopicDialog(this.props.lineNum);
    }

    onShowTopics() {
        this.props.showTopicsForLine(this.props.lineNum);
    }
    
    render() {
        return (
            <div>
                <span className="text-line">{this.state.line}</span>
                <button className="uk-icon-link uk-margin-small-left uk-margin-small-right" uk-icon="pencil" onClick={this.onNewTopic}></button>
                <button className="uk-icon-link" uk-icon="comments" onClick={this.onShowTopics}></button>
                { this.props.topicDialog }
            </div>
        );
    }
}