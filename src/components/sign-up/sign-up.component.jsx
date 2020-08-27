import React from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button";
import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "", username: "" };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "", username: "" });
  };
  handleChange = (event) => {
    // console.log(event);
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-up">
        <h2 className="title">Don't have an account ? </h2>
        <span>Sign up with your email</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="username"
            type="text"
            value={this.state.username}
            handleChange={this.handleChange}
            label="username"
            required
          />
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit" value="Submit Form">
              Sign Up
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
