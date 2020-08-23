import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: "",
    };
  }
  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
    // console.log(this.unSubscribeFromAuth());
    console.log("I am unmounted from the DOM ");
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact={true} path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/sign" component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
