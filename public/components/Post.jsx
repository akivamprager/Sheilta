class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body,
            author: props.author,
            date: props.date,
            open: false,
            vote: null
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({ open: !this.state.open });
        this.props.launchCommentDialog(this.props.topicId);
        event.preventDefault();
        event.stopPropagation();
    }

    onUpvote() {
        this.setState( { vote: up });
        this.props.upvote(this.props.postId);
    }

    onDownvote() {
        this.setState( { vote: down });
        this.props.downvote(this.props.postId);
    }

    render() {
        return (
            
                <article className="uk-comment uk-visible-toggle" tabIndex="-1">
                    <header className="uk-comment-header uk-position-relative">
                        <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                        <div className="uk-width-auto">
                        <img className="uk-comment-avatar" src="../images/avatar.jpg" width="40" height="40" alt=""/>
                        </div>
                            <div className="uk-width-expand">
                                <h4 className="uk-comment-title uk-margin-remove">{this.state.author}</h4>
                                <p className="uk-comment-meta uk-margin-remove-top">{this.state.date}</p>
                            </div>
                        </div>
                        <div className="uk-position-top-right uk-position-small uk-hidden-hover"><a className="uk-link-muted" onClick={this.onClick}>Reply</a></div>
                    </header>
                    <div className="uk-comment-body" dangerouslySetInnerHTML={{__html: this.state.body }}></div>
                    {this.state.open && this.props.commentDialog}
                    <ul className="uk-iconnav ">
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