class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: props.isAuthenticated };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
        this.props.login();
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
        this.props.logout();
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <li className="uk-active"><a onClick={this.handleLogoutClick}>Logout</a></li>;
        } else {
            button = <li className="uk-active"><a onClick={this.handleLoginClick}>Login</a></li>;
        }

        return (
             button
        );
    }
}