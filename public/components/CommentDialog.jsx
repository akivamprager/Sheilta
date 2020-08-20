class CommentDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicId: props.topicId
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const text = document.getElementById("new-comment-text").value;
        this.props.onSubmitComment(this.props.topicId, text);
    }

    render() {
        const id=`new-comment-${this.props.topicId}`;
        const uktoggle=`target: #${id}; animation: uk-animation-fade`;
        //<button type="button" uk-close="true" uk-toggle={uktoggle}></button>
        return (
            <div className="uk-container uk-card-default uk-card-small" id={id}>
                <div className="uk-card-header">
                    <h3 className="uk-card-title">New comment</h3>
                </div>
                <div className="uk-card-body">
                    <label htmlFor="new-comment-text">Text: </label>
                    <textarea id="new-comment-text" className="uk-textarea" required></textarea>
                </div>
                <div className="uk-card-footer">
                    <a className="uk-button uk-button-text" onClick={this.onSubmit}>Submit</a>
                </div>
            </div>
        );
    }
}