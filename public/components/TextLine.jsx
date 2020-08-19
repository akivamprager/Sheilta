class TextLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line: props.line
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.launchTopicDialog(this.props.lineNum);
    }

    render() {
        return (
            <div>
                <span>{this.state.line}</span>
                <button className="uk-icon-link" uk-icon="comment" onClick={this.onClick}></button>
                { this.props.topicDialog }
            </div>
        );
    }
}