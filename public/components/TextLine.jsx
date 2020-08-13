class TextLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line: props.line
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onNewComment(this.props.lineNum);
    }

    render() {
        return (
            <div>
                <span>{this.state.line}</span>
                <button onClick={this.onClick}>+</button>
            </div>
        );
    }
}