import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //We will check if there is a user/user is signed in then we will store its data in the state
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState(
            {
              currentUser: { id: snapshot.id, ...snapshot.data() },
            },
            () => {
              return console.log(this.state);
            }
          );
        });
      }
      //if there is no user/user is not signed in than we will be setting our state to the user which will be null by default
      else {
        this.setState({ currentUser: userAuth });
      }
    });
  }
  // To prevent the memory leak we will have to remove the space used
  componentWillUnmount() {
    this.unSubscribeFromAuth();
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
