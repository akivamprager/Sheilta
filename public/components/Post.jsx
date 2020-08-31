class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body,
            author: props.author,
            date: props.date,
            profileColor: props.profileColor,
            open: false
        };
        this.onClick = this.onClick.bind(this);
        this.onUpvote = this.onUpvote.bind(this);
        this.onDownvote = this.onDownvote.bind(this);

    }

    onClick(event) {
        this.setState({ open: !this.state.open });
        this.props.launchCommentDialog(this.props.topicId);
        event.preventDefault();
        event.stopPropagation();
    }

    onUpvote() {
        this.setState({ vote: "up" });
        this.props.upvote(this.props.postId);
    }

    onDownvote() {
        this.setState({ vote: "down" });
        this.props.downvote(this.props.postId);
    }

    render() {
        const author = this.state.author.replace(' ', '+');
        //const profileColor = this.state.profileColor;
        const profileUrl = `https://ui-avatars.com/api/?name=${author}`;//&background=${this.state.profileColor}`;
        const date = convertDate(this.state.date);
        return (
            <article className="uk-comment uk-visible-toggle uk-card uk-card-hover uk-card-default uk-card-small uk-card-body uk-margin-small" tabIndex="-1">
                <header className="uk-comment-header uk-position-relative">
                    <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                        <div className="uk-width-auto">
                            <img className="uk-comment-avatar uk-border-circle" src={profileUrl} width="40" height="40" />
                        </div>
                        <div className="uk-width-expand">
                            <h4 className="uk-comment-title uk-margin-remove">{this.state.author}</h4>
                            <p className="uk-comment-meta uk-margin-remove-top" dangerouslySetInnerHTML={{ __html: date }}></p>
                        </div>
                    </div>
                    <div className="uk-position-top-right uk-position-small uk-hidden-hover"><a className="uk-link-muted" onClick={this.onClick}><span uk-icon="icon: reply"></span> Reply</a></div>
                </header>
                <div className="uk-comment-body" dangerouslySetInnerHTML={{ __html: this.state.body }}></div>
                {this.state.open && this.props.commentDialog}
                <ul hidden={true} className="uk-iconnav ">
                    <li><a onClick={this.onUpvote} uk-tooltip="title: Upvote post; delay: 300" uk-icon="icon: chevron-up"></a></li>
                    <li><a onClick={this.onDownvote} uk-tooltip="title: Downvote post; delay: 300" uk-icon="icon: chevron-down"></a></li>
                </ul>

            </article>

        );
    }

    /*
        render() {
            return (
                <div>
                    <span>{this.state.body}</span>
                    <button classNameName="uk-icon-link" uk-icon="commenting" onClick={this.onClick}></button>
                    { this.state.open && this.props.commentDialog }  
                </div>
            );
        }
        */
}