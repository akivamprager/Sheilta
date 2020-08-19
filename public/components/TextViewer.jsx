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
            sections: {}
        };
        this.launchTopicDialog = this.launchTopicDialog.bind(this);
        this.onSubmitTopic = this.onSubmitTopic.bind(this);
        this.onNewReply = this.onNewReply.bind(this);
        this.toggleTopic = this.toggleTopic.bind(this);
    }

    fetchText() {
        getText(this.props.textId).then((textInfo) => {
            this.setState({textInfo: textInfo});
        });
    }

    fetchTopics(topicConfig) {
        for (let key in topicConfig) {
            getTopics(this.props.textId, key).then((info) => {
                const stateKey = topicConfig[key];
                this.setState({[stateKey]: info});
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
        // this.setState({
        //     textInfo: await getText(this.props.textId), 
        //     questionInfo: await getTopics(this.props.textId, "questions"),
        //     kashyaInfo: await getTopics(this.props.textId, "kashyas"), 
        //     chiddushInfo: await getTopics(this.props.textId, "chiddushim"),
        //     referenceInfo: await getTopics(this.props.textId, "references")
        // });
    }

    launchTopicDialog(lineNum) {
        const topicDialog = (<TopicDialog lineNum={lineNum} onSubmitTopic={this.onSubmitTopic} />);
        this.setState({ 
            topicDialog: topicDialog,
            selectedLineIndex: lineNum
        });
    }

    async onSubmitTopic(lineNum, category, title, text) {
        const response = await createNewTopic(textId, category, title, text, lineNum);
        this.showAlert({ 
            status: "success",
            message: "Your topic has been saved!"
        });
        this.setState({
            selectedLineIndex: -1,
            topicDialog: null
        });
    }

    onNewReply(topicId) {
        alert("new " + topicId);
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
        return (
            <div key={topic.id} className="topic-container" onClick={this.toggleTopic.bind(this, topic)}>
                <span className="topic-title">{topic.title}</span>
                <div className={textClasses.join(" ")}>
                    {
                        topic.post_stream.posts.map(post => (
                            <Post key={post.id} body={post.cooked} topicId={post.topic_id} onNewReply={this.onNewReply} />
                        ))
                    }
                </div>
            </div>
        );
    }

    createAlert() {
        const currentAlert = this.state.currentAlert;
        if (!currentAlert) {
            return null;
        }
        let style = "uk-alert-success";
        switch (currentAlert.status) {
            case "success": style = "uk-alert-success"; break;
            case "error": style = "uk-alert-danger"; break;
        }
        return ( 
            <div className={style} uk-alert="true">
                <a className="uk-alert-close" uk-close="true"></a>
                <p>{currentAlert.message}</p>
            </div>
        );
    }

    showAlert(alertObj) {
        this.setState({ currentAlert: alertObj });
    }

    render() {
        return (
            <div>
                <h1 className="uk-heading-divider">Sefaria Text</h1>
                {this.createAlert()}
                <div id="texts" dir="rtl">
                    {this.state.textInfo &&
                        this.state.textInfo.he.map((line, index) => {
                            const topicDialog = (this.state.selectedLineIndex === index) ? this.state.topicDialog : null;
                            return (<TextLine key={index} line={line} lineNum={index} topicDialog={topicDialog} launchTopicDialog={this.launchTopicDialog} />);
                        })
                    }
                </div>
                
                <ReactTabs.Tabs>
                    <ReactTabs.TabList>
                        <ReactTabs.Tab>Questions</ReactTabs.Tab>
                        <ReactTabs.Tab>Kashyas</ReactTabs.Tab>
                        <ReactTabs.Tab>Chiddushim</ReactTabs.Tab>
                        <ReactTabs.Tab>References</ReactTabs.Tab>                        
                    </ReactTabs.TabList>
                    <ReactTabs.TabPanel id="questions">
                        {this.state.questionInfo && this.state.questionInfo.map(topic => this.createTopicContainer(topic))}
                    </ReactTabs.TabPanel>
                    <ReactTabs.TabPanel id="kashyas">
                        {this.state.kashyaInfo && this.state.kashyaInfo.map(topic => this.createTopicContainer(topic))}
                    </ReactTabs.TabPanel>
                    <ReactTabs.TabPanel id="chiddushim">
                        {this.state.chiddushInfo && this.state.chiddushInfo.map(topic => this.createTopicContainer(topic))}
                    </ReactTabs.TabPanel>
                    <ReactTabs.TabPanel id="references">
                        {this.state.referenceInfo && this.state.referenceInfo.map(topic => this.createTopicContainer(topic))}
                    </ReactTabs.TabPanel>
                </ReactTabs.Tabs>
            </div>
        );
    }
}