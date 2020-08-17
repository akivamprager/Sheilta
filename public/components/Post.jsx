class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onNewComment(this.props.topicId);
    }

    render() {
        return (
            <div>
                <span>{this.state.body}</span>
                <button onClick={this.onClick}>Reply</button>
            </div>
        );
    }
}