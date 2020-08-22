class TopicDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNum: props.lineNum
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const category = document.getElementById("new-topic-category").value;
        const title = document.getElementById("new-topic-title").value;
        const text = document.getElementById("new-topic-text").value;
        this.props.onSubmitTopic(this.props.lineNum, category, title, text);
    }

    render() {
        const id=`new-topic-${this.props.lineNum}`;
        const uktoggle=`target: #${id}; animation: uk-animation-fade`;
        //<button type="button" uk-close="true" uk-toggle={uktoggle}></button>
 
        return (
            <div className="uk-card-default uk-card-small uk-width-1-2@m" id={id}>
                <div className="uk-card-header">
                    <h3 className="uk-card-title">Start new topic</h3>
                </div>
                <div className="uk-card-body">
                    <label className="uk-form-label" htmlFor="new-topic-category">Category: </label>
                    <select name="new-topic-category" id="new-topic-category" className="uk-select" required>
                        <option disabled={true} defaultValue>Choose a category</option>
                        <option value="kashyas">Kashya</option>
                        <option value="questions">Question</option>
                        <option value="references">Reference</option>
                        <option value="chiddushim">Chiddush</option></select>
                    <label className="uk-form-label" htmlFor="new-topic-title">Title: </label>
                    <input type="text" id="new-topic-title" className="uk-input" required></input>
                    <label className="uk-form-label" htmlFor="new-topic-text">Text: </label>
                    <textarea id="new-topic-text" className="uk-textarea" required></textarea>
                </div>
                <div className="uk-card-footer">
                    <a className="uk-button uk-button-text" onClick={this.onSubmit}>Submit</a>
                </div>
            </div>
        );
    }
}