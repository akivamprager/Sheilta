class TextLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line: props.line,
            open: false
        };
        this.onNewTopic = this.onNewTopic.bind(this);
        this.onShowTopics = this.onShowTopics.bind(this);
    }

    onNewTopic() {
        this.setState({ open: !this.state.open });
        this.props.launchTopicDialog(this.props.lineNum);
    }

    onShowTopics() {
        this.props.showTopicsForLine(this.props.lineNum);
    }

    render() {
        return (
            <div className="uk-visible-toggle" tabIndex="-1">
                <div uk-grid="true">
                    <div className="uk-width-expand text-line" dangerouslySetInnerHTML={{ __html: this.state.line }}></div>
                    <div className="uk-width-auto">
                        <ul className="uk-invisible-hover uk-iconnav">
                            <li><button uk-tooltip="title: Create new post; delay: 300" className="uk-icon-link uk-margin-small-left uk-margin-small-right" uk-icon="pencil" onClick={this.onNewTopic}></button></li>
                            <li><button uk-tooltip="title: Show posts; delay: 300" className="uk-icon-link" uk-icon="comments" onClick={this.onShowTopics}></button></li>
                        </ul>
                    </div>
                </div>

                {this.state.open && this.props.topicDialog}
            </div>
        );
    }
}