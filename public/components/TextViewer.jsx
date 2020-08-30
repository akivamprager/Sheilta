class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfo: {
                he: []
            },
            questionInfo: [],
            kashyaInfo: [],
            chiddushInfo: [],
            referenceInfo: [],
            sections: {},
            searchValue: ''
            // , isAuthenticated : isAuthenticated()

        };
        this.launchTopicDialog = this.launchTopicDialog.bind(this);
        this.onSubmitTopic = this.onSubmitTopic.bind(this);
        this.launchCommentDialog = this.launchCommentDialog.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.toggleTopic = this.toggleTopic.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.showTopicsForLine = this.showTopicsForLine.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.loginModal = this.loginModal.bind(this);
    }

    fetchText() {
        if (this.props.textId === null) {
            redirectToSource("bereshit.1");
        } else {
            try {
                getText(this.props.textId).then((textInfo) => {
                    this.setState({ textInfo: textInfo });
                });
            } catch (error) {
                this.showAlert({
                    status: "error",
                    message: "The source you have entered does not exist."
                });
                setTimeout(redirectToSource("bereshit.1"), 3000);
            }
        }
    }

    fetchTopics(topicConfig) {
        for (let key in topicConfig) {
            getTopics(this.props.textId, key).then((info) => {
                const stateKey = topicConfig[key];
                this.setState({ [stateKey]: info });
            });
        }
    }
    fetchTopicsForLine(topicConfig, line) {
        for (let key in topicConfig) {
            getTopicsByLine(this.props.textId, line, key).then((info) => {
                const stateKey = topicConfig[key];
                this.setState({ [stateKey]: info });
            });
        }
    }

    async componentDidMount() {
        this.fetchText();
        this.fetchTopics({
            "questions": "questionInfo",
            "kashyas": "kashyaInfo",
            "chiddushim": "chiddushInfo",
            "references": "referenceInfo"
        });
        //const username = localStorage.getItem('name');
        //this.setState({ username });
    }
    async showTopicsForLine(lineNum) {
        this.fetchTopicsForLine({
            "questions": "questionInfo",
            "kashyas": "kashyaInfo",
            "chiddushim": "chiddushInfo",
            "references": "referenceInfo"
        }, lineNum);
        document.getElementById("topics").scrollIntoView();
    }
    launchTopicDialog(lineNum) {
        if (localStorage.getItem('user') === null || localStorage.getItem('user') === "null")
            this.loginModal();
        const topicDialog = (<TopicDialog lineNum={lineNum} onSubmitTopic={this.onSubmitTopic} />);
        this.setState({
            topicDialog: topicDialog,
            selectedLineIndex: lineNum
        });
    }

    async onSubmitTopic(lineNum, category, title, text) {
        const response = await createTopic(textId, category, title, text, lineNum);
        this.showAlert({
            status: "success",
            message: "Your topic has been saved!"
        });
        this.setState({
            selectedLineIndex: -1,
            topicDialog: null
        });
    }

    launchCommentDialog(topicId) {
        if (localStorage.getItem('user') === null || localStorage.getItem('user') === "null")
            this.loginModal();
        const commentDialog = (<CommentDialog topicId={topicId} onSubmitComment={this.onSubmitComment} />);
        this.setState({
            commentDialog: commentDialog,
            selectedTopicId: topicId
        });
    }

    async upvote(postId) {
        const response = await votePost(postId, "up");
        this.showAlert({
            status: "success",
            message: "Post has been upvoted"
        });
    }

    async downvote(postId) {
        const response = await votePost(postId, "down");
        this.showAlert({
            status: "success",
            message: "Post has been downvoted"
        });
    }
    async onSubmitComment(topicId, text) {
        const response = await createComment(topicId, text);
        this.showAlert({
            status: "success",
            message: "Your comment has been saved!"
        });
        this.setState({
            selectedTopicId: -1,
            commentDialog: null
        });
    }

    toggleTopic(topic) {
        const newSectionState = !this.isOpen(topic);
        const sections = Object.assign({}, this.state.sections);
        sections[topic.id] = newSectionState;
        this.setState({ sections: sections });
    }

    isOpen(topic) {
        return this.state.sections[topic.id];
    }

    createTopicContainer(topic) {
        const textClasses = ["topic-text"];
        if (!this.isOpen(topic)) {
            textClasses.push("hidden");
        }
        const commentDialog = (this.state.selectedTopicId === topic.id) ? this.state.commentDialog : null;
        const createdAt = convertDate(topic.created_at);
        return (
            <dt>
                <div key={topic.id} className="topic-container">
                    <div uk-tooltip="title: Click to expand thread; pos: top-left; delay: 300" onClick={this.toggleTopic.bind(this, topic)}>
                        <span className="topic-title">{topic.title}</span>
                        <dd>{createdAt}</dd>
                    </div>
                    <div className={textClasses.join(" ")}>
                        <ul className="uk-comment-list uk-padding">

                            {
                                topic.post_stream.posts.map((post) => (
                                    <Post key={post.id} body={post.cooked} topicId={post.topic_id} author={post.name} date={post.created_at} profileColor={localStorage.getItem("profileColor")} postId={post.id} commentDialog={commentDialog} upvote={this.upvote} downvote={this.downvote} launchCommentDialog={this.launchCommentDialog} />)
                                )
                            }
                        </ul>
                    </div>
                </div>
            </dt>
        );
    }

    showAlert(alertObj) {
        let style = "success";
        switch (alertObj.status) {
            case "success": style = "success"; break;
            case "error": style = "danger"; break;
        }
        UIkit.notification(alertObj.message, style);
    }

    handleSearchChange(event) {
        this.setState({ searchValue: event.target.value });
    }

    onSubmitSearch(event) {
        event.preventDefault();
        redirectToSource(this.state.searchValue);
    }

    gotoNext() {
        skipPage(this.props.textId, "next");
    }

    gotoPrevious() {
        skipPage(this.props.textId, "previous");
    }

    /*UserGreeting(props) {
        return <h1>Welcome back!</h1>;
    }

    GuestGreeting(props) {
        return <h1>Please sign up.</h1>;
    }

    Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <UserGreeting />;
        }
        return <GuestGreeting />;
    }*/
    /*login(){
        login();
    }
    logout(){
        logout();
    }*/
    loginModal() {
        UIkit.modal.prompt('Enter your name:', '').then(function (user) {
            localStorage.setItem("user", user);
            localStorage.setItem("profileColor", Math.floor(Math.random() * 16777215).toString(16));
            createNewUserWithoutEmail(user);
        });
    }
    render() {
        return (
            // <ErrorBoundary>
            <div>
                <nav className="uk-navbar-container uk-margin uk-background-primary" uk-navbar="true">
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" href="#">Sefaria</a>
                        <ul className="uk-navbar-nav">
                            <li><a onClick={this.loginModal}>Login</a></li>
                            <li><a href="#">Item</a></li>
                        </ul>
                    </div>
                    <div className="uk-navbar-right">
                        <div>
                            <a className="uk-navbar-toggle" uk-search-icon="true" href="#"></a>
                            <div className="uk-drop" uk-drop="mode: click; pos: left-center; offset: 0">
                                <form className="uk-search uk-search-navbar uk-width-1-1" onSubmit={this.onSubmitSearch}>
                                    <input value={this.state.searchValue} onChange={this.handleSearchChange} className="uk-search-input" type="search" placeholder="English source name..." autoFocus={true}></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
                <ul className="uk-pagination">
                    <li>
                        <a onClick={this.gotoPrevious}><span className="uk-margin-small-right" uk-pagination-previous="true"></span> Previous</a>
                    </li>
                    <li className="uk-margin-auto-left">
                        <a onClick={this.gotoNext}>Next <span className="uk-margin-small-left" uk-pagination-next="true"></span></a>
                    </li>
                </ul>
                <div>
                    <div id="texts" className="uk-container uk-background-muted" dir="rtl">
                        <h2 id="source-title">{this.state.textInfo.heRef}</h2>
                        {this.state.textInfo &&
                            this.state.textInfo.he.map((line, index) => {
                                const topicDialog = (this.state.selectedLineIndex === index) ? this.state.topicDialog : null;
                                return (<TextLine key={index} line={line} lineNum={index} topicDialog={topicDialog} showTopicsForLine={this.showTopicsForLine} launchTopicDialog={this.launchTopicDialog} />);
                            })
                        }
                    </div>
                    <ReactTabs.Tabs id="topics">
                        <ReactTabs.TabList>
                            <ReactTabs.Tab>Questions</ReactTabs.Tab>
                            <ReactTabs.Tab>Kashyas</ReactTabs.Tab>
                            <ReactTabs.Tab>Chiddushim</ReactTabs.Tab>
                            <ReactTabs.Tab>References</ReactTabs.Tab>
                        </ReactTabs.TabList>
                        <ReactTabs.TabPanel id="questions">
                            <dl className="uk-description-list uk-description-list-divider">
                                {this.state.questionInfo && this.state.questionInfo.map(topic => this.createTopicContainer(topic))}
                            </dl>
                        </ReactTabs.TabPanel>
                        <ReactTabs.TabPanel id="kashyas">
                            <dl className="uk-description-list uk-description-list-divider">
                                {this.state.kashyaInfo && this.state.kashyaInfo.map(topic => this.createTopicContainer(topic))}
                            </dl>
                        </ReactTabs.TabPanel>
                        <ReactTabs.TabPanel id="chiddushim">
                            <dl className="uk-description-list uk-description-list-divider">
                                {this.state.chiddushInfo && this.state.chiddushInfo.map(topic => this.createTopicContainer(topic))}
                            </dl>
                        </ReactTabs.TabPanel>
                        <ReactTabs.TabPanel id="references">
                            <dl className="uk-description-list uk-description-list-divider">
                                {this.state.referenceInfo && this.state.referenceInfo.map(topic => this.createTopicContainer(topic))}
                            </dl>
                        </ReactTabs.TabPanel>
                    </ReactTabs.Tabs>
                </div>
            </div>
            //  </ErrorBoundary>
        );
    }
}