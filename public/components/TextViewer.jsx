class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfo: {
                he: [],
                en: []
            },
            questionInfo: [],
            kashyaInfo: [],
            chiddushInfo: [],
            referenceInfo: [],
            sections: {},
            searchValue: '',
            language: "he",
            dir: "rtl"
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
        this.redirectToGithubPages = this.redirectToGithubPages.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fetchTopics = this.fetchTopics.bind(this);
        this.setState = this.setState.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
    }

    fetchText() {
        if (this.props.textId === null) {
            redirectToSource("bereshit.1");
        } else {
            try {
                getText(this.props.textId).then((textInfo) => {
                    if (textInfo.he != undefined)
                        this.setState({ textInfo: textInfo });
                    else

                        redirectToSourceMsg("bereshit.1", "The source you have entered does not exist.");
                });

            } catch (error) {
                this.showAlert({
                    status: "error",
                    message: "The source you have entered does not exist."
                });
                setTimeout(redirectToSourceMsg("bereshit.1"), 3000);
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
        const isNotNewUser = localStorage.getItem('notNewUser');
        if (isNotNewUser === null) {
            this.redirectToGithubPages();
        }

        const name = localStorage.getItem('user');
        const color = localStorage.getItem('profileColor');
        if (!(name === null)) {
            const username = name.replace(/\s+/g, '');
            this.setState({ username, name, color });
        }
        if (this.props.msg) {
            this.showAlert({
                status: "error",
                message: "The source you have entered does not exist.",
                timeout: 3000
            });
        }
    }
    //async componentDidUpdate() {
    // if (this.state.name != null) {
    //     localStorage.setItem('user', this.state.name);
    //     localStorage.setItem('profileColor', this.state.color);
    // }
    //this.fetchText();
    /*this.fetchTopics({
        "questions": "questionInfo",
        "kashyas": "kashyaInfo",
        "chiddushim": "chiddushInfo",
        "references": "referenceInfo"
    });*/
    //}

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
        if (this.state.username === null || this.state.username === "null" || this.state.username == undefined)
            this.loginModal();
        else {
            const topicDialog = (<TopicDialog lineNum={lineNum} onSubmitTopic={this.onSubmitTopic} />);
            this.setState({
                topicDialog: topicDialog,
                selectedLineIndex: lineNum
            });
        }
    }

    async onSubmitTopic(lineNum, category, title, text) {
        const response = await createTopic(textId, category, title, text, lineNum, this.state.username);
        if (response.name)
            this.showAlert({
                status: "success",
                message: "Your topic has been saved!"
            });
        else {
            this.showAlert({
                status: "error",
                message: response.message
            });
        }
        this.setState({
            selectedLineIndex: -1,
            topicDialog: null
        });
        this.fetchTopics({
            "questions": "questionInfo",
            "kashyas": "kashyaInfo",
            "chiddushim": "chiddushInfo",
            "references": "referenceInfo"
        });
    }

    launchCommentDialog(topicId) {
        if (this.state.username === null || this.state.username === "null" || this.state.username == undefined)
            this.loginModal();
        else {
            const commentDialog = (<CommentDialog topicId={topicId} onSubmitComment={this.onSubmitComment} />);
            this.setState({
                commentDialog: commentDialog,
                selectedTopicId: topicId
            });
        }
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
        const response = await createComment(topicId, text, this.state.username);
        this.showAlert({
            status: "success",
            message: "Your comment has been saved!"
        });
        this.setState({
            selectedTopicId: -1,
            commentDialog: null
        });
        this.fetchTopics({
            "questions": "questionInfo",
            "kashyas": "kashyaInfo",
            "chiddushim": "chiddushInfo",
            "references": "referenceInfo"
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
            <li>
                <div key={topic.id} className="topic-container">
                    <div uk-tooltip="title: Click to expand thread; pos: top-left; delay: 300" onClick={this.toggleTopic.bind(this, topic)}>
                        <dt> <span className="topic-title">{topic.title} </span></dt>
                        <dd dangerouslySetInnerHTML={{ __html: createdAt }}></dd>
                    </div>
                    <div className={textClasses.join(" ")}>
                        <ul className="uk-comment-list uk-padding">
                            {
                                topic.post_stream.posts.map((post) => (
                                    <Post key={post.id} body={post.cooked} topicId={post.topic_id} author={post.name} date={post.created_at} profileColor={this.state.color} postId={post.id} commentDialog={commentDialog} upvote={this.upvote} downvote={this.downvote} launchCommentDialog={this.launchCommentDialog} />)
                                )
                            }
                        </ul>
                    </div>
                </div>
            </li>
        );
    }

    showAlert(alertObj) {
        let style = "success";
        switch (alertObj.status) {
            case "success": style = "success"; break;
            case "error": style = "danger"; break;
            case "warning": style = "warning"; break;
        }
        UIkit.notification({
            message: alertObj.message,
            status: style,
            timeout: (alertObj.timeout) ? alertObj.timeout : 1500
        });
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

    toggleLanguage() {
        if (this.state.language === "he")
            this.setState({ language: "en", dir: "ltr" });
        else if (this.state.language === "en")
            this.setState({ language: "he", dir: "rtl" });
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

    async loginModal() {
        var response;
        let showAlert = this.showAlert;
        let state = this.state;
        let fetchTopics = this.fetchTopics;
        let setState = this.setState;

        UIkit.modal.prompt('Enter your name:', '').then(async function (user) {
            if (user != null) {
                response = await createNewUserWithoutEmail(user);
                if (response.data.success) {
                    showAlert({
                        status: "success",
                        message: "Your name has been registered!"
                    });
                    localStorage.setItem("user", user);
                    const color = Math.floor(Math.random() * 16777215).toString(16);
                    localStorage.setItem("profileColor", color);
                    const username = user.replace(/\s+/g, '');
                    setState({ username, name: user, color });
                }
                else {
                    showAlert({
                        status: "error",
                        message: "Error: " + response.data.message
                    });
                    localStorage.removeItem("user");
                    localStorage.removeItem("profileColor");
                    setState({ username: null, name: null, color: null });
                }
                fetchTopics({
                    "questions": "questionInfo",
                    "kashyas": "kashyaInfo",
                    "chiddushim": "chiddushInfo",
                    "references": "referenceInfo"
                });
            }

            //if (state.name != null) {
            //    localStorage.setItem('user', state.name);
            //    localStorage.setItem('profileColor', state.color);
            //}
            //refreshPage();
        });
    }
    redirectToGithubPages() {
        setTimeout(this.showAlert({
            status: "success",
            message: "First time user? you will be redirected to the project's README. This will only happen once.",
            timeout: 5000
        }), 5000)
        location.href = "https://akivamprager.github.io/Sheilta/";
    }

    render() {
        var profileStyle = `title: ${this.state.name}; pos: bottom`;
        return (
            // <ErrorBoundary>
            <div>
                <nav className="uk-navbar-container uk-margin uk-background-primary" uk-navbar="true">
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" href="#"><img src="../images/resized-banner.png" width="151" height="69"></img></a>
                        <ul className="uk-navbar-nav">
                        </ul>
                    </div>
                    <div className="uk-navbar-right">
                        <div>
                            <a className="uk-navbar-toggle" uk-tooltip="title: Search; delay: 300" uk-search-icon="true" href="#"></a>
                            <div className="uk-drop" uk-drop="mode: click; pos: left-center; offset: 0">
                                <form className="uk-search uk-search-navbar uk-width-1-1" onSubmit={this.onSubmitSearch}>
                                    <input value={this.state.searchValue} onChange={this.handleSearchChange} className="uk-search-input" type="search" placeholder="English source name..." autoFocus={true}></input>
                                </form>
                            </div>
                        </div>
                        <a className="uk-navbar-item" onClick={this.toggleLanguage} uk-tooltip="title: Language; delay: 300" uk-icon="world"></a>
                        <a className="uk-navbar-item" href="https://github.com/akivamprager/sheilta" /*onClick={this.helpModal}*/ uk-tooltip="title: Open Readme; delay: 300" uk-icon="icon: question"></a>
                        {!this.state.username && (<a className="uk-navbar-item uk-margin-small-right" onClick={this.loginModal} uk-tooltip="title: Sign In; delay: 300" uk-icon="icon: users"></a>)}
                        {this.state.username && (<a className="uk-navbar-item uk-margin-small-right" onClick={this.loginModal} uk-tooltip={profileStyle}><img className="uk-border-circle" src={`https://ui-avatars.com/api/?name=${this.state.name}`} width="32" height="32" alt="" /></a>)}

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
                    <div id="texts" className="uk-container uk-background-muted" dir={this.state.dir}>
                        <h2 id="source-title">{this.state.language === "he" && this.state.textInfo.heRef}{this.state.language === "en" && this.state.textInfo.ref}</h2>
                        {this.state.language === "he" && this.state.textInfo &&
                            this.state.textInfo.he.map((line, index) => {
                                const topicDialog = (this.state.selectedLineIndex === index) ? this.state.topicDialog : null;
                                return (<TextLine key={index} line={line} lineNum={index} topicDialog={topicDialog} showTopicsForLine={this.showTopicsForLine} launchTopicDialog={this.launchTopicDialog} />);
                            })
                        }
                        {this.state.language === "en" && this.state.textInfo &&
                            this.state.textInfo.text.map((line, index) => {
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
                            <ul className="uk-list uk-list-divider uk-list-striped">
                                {this.state.questionInfo && this.state.questionInfo.map(topic => this.createTopicContainer(topic))}
                            </ul>
                            {!this.state.questionInfo && (
                                <div className="uk-alert-warning uk-margin-left uk-margin-right" uk-alert="true">
                                    <a className="uk-alert-close" uk-close="true"></a>
                                    <p>It seems like there are no topics yet in this category.</p>
                                </div>
                            )}
                        </ReactTabs.TabPanel>
                        <ReactTabs.TabPanel id="kashyas">
                            <ul className="uk-list uk-list-divider uk-list-striped">
                                {this.state.kashyaInfo && this.state.kashyaInfo.map(topic => this.createTopicContainer(topic))}
                            </ul>
                            {!this.state.kashyaInfo && (
                                <div className="uk-alert-warning" uk-alert="true">
                                    <a className="uk-alert-close" uk-close="true"></a>
                                    <p>It seems like there are no topics yet in this category.</p>
                                </div>
                            )}
                        </ReactTabs.TabPanel>
                        <ReactTabs.TabPanel id="chiddushim">
                            <ul className="uk-list uk-list-divider uk-list-striped">
                                {this.state.chiddushInfo && this.state.chiddushInfo.map(topic => this.createTopicContainer(topic))}
                            </ul>
                            {!this.state.chiddushInfo && (
                                <div className="uk-alert-warning" uk-alert="true">
                                    <a className="uk-alert-close" uk-close="true"></a>
                                    <p>It seems like there are no topics yet in this category.</p>
                                </div>
                            )}
                        </ReactTabs.TabPanel>
                        <ReactTabs.TabPanel id="references">
                            <ul className="uk-list uk-list-divider uk-list-striped">
                                {this.state.referenceInfo && this.state.referenceInfo.map(topic => this.createTopicContainer(topic))}
                            </ul>
                            {!this.state.referenceInfo && (
                                <div className="uk-alert-warning" uk-alert="true">
                                    <a className="uk-alert-close" uk-close="true"></a>
                                    <p>It seems like there are no topics yet in this category.</p>
                                </div>
                            )}
                        </ReactTabs.TabPanel>
                    </ReactTabs.Tabs>
                </div>
            </div>
        )
    }
}