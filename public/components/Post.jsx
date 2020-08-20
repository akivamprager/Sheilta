class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.launchCommentDialog(this.props.topicId);
    }

    render() {
        return (
            <div>
                <span>{this.state.body}</span>
                <button className="uk-icon-link" uk-icon="commenting" onClick={this.onClick}></button>
                { this.props.commentDialog }  
            </div>
        );
    }
}