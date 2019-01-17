import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsCompleted: 0,
      flippedColors: false
    };
  }

  componentDidMount() {
    //make start button active on load
    $(document.querySelector(".start-btn")).fadeIn(10);
    // hide form inputs
    $(document.querySelector(".section1")).fadeOut(10);
    $(document.querySelector(".section2")).fadeOut(10);
    $(document.querySelector(".section3")).fadeOut(10);
    $(document.querySelector(".section4")).fadeOut(10);
    $(document.querySelector(".donation-box")).fadeOut(10);
    $(document.querySelector(".message")).fadeOut(10);
    $(document.querySelector(".submit-message")).fadeOut(10);
    $(document.querySelector(".donate-message")).fadeOut(10);
  }

  loadSection = section => {
    if (section === "section1") {
      console.log("loading section 1...");

      //hide Start button
      $(document.querySelector(".start-btn")).fadeOut(500);
      //show form
      $(document.querySelector(".section1")).fadeIn(1000);
    } else if (section === "section2") {
      console.log("loading section 2...");
      //hide section 1
      $(document.querySelector(".section1")).fadeOut(10);
      //load section 2
      $(document.querySelector(".section2")).fadeIn(1000);
    } else if (section === "section3") {
      console.log("loading section 3...");
      //hide section 2
      $(document.querySelector(".section2")).fadeOut(10);
      //load section 3
      $(document.querySelector(".section3")).fadeIn(1000);
    } else if (section === "section4") {
      console.log("loading section 4...");
      //hide section 3
      $(document.querySelector(".section3")).fadeOut(10);
      //load section 4
      $(document.querySelector(".section4")).fadeIn(1000);
    }
  };

  flipColors = () => {
    if (!this.state.flippedColors) {
      //flip
      let el = document.querySelector(".display-3");
      el.classList.add("display-3-flipped");

      el = document.querySelector(".App");
      el.classList.add("app-flipped");

      el = document.querySelector(".jumbotron");
      el.classList.add("jumbotron-flipped");

      el = document.querySelector(".start-btn");
      el.classList.add("start-btn-flipped");

      el = document.querySelector(".lead");
      el.classList.add("gray");

      el = document.querySelector(".desc");
      el.classList.add("gray");

      el = document.querySelector(".section1");
      el.classList.add("black");

      el = document.querySelector(".section2");
      el.classList.add("black");

      el = document.querySelector(".section3");
      el.classList.add("black");

      el = document.querySelector(".custom-control-label");
      el.classList.add("gray");
      this.setState({ flippedColors: true });
    } else {
      //flip back
      let el = document.querySelector(".display-3");
      el.classList.remove("display-3-flipped");

      el = document.querySelector(".App");
      el.classList.remove("app-flipped");

      el = document.querySelector(".jumbotron");
      el.classList.remove("jumbotron-flipped");

      el = document.querySelector(".lead");
      el.classList.remove("gray");

      el = document.querySelector(".start-btn");
      el.classList.remove("start-btn-flipped");

      el = document.querySelector(".desc");
      el.classList.remove("gray");

      el = document.querySelector(".section1");
      el.classList.remove("black");

      el = document.querySelector(".section2");
      el.classList.remove("black");

      el = document.querySelector(".section3");
      el.classList.remove("black");

      el = document.querySelector(".custom-control-label");
      el.classList.remove("gray");

      this.setState({ flippedColors: !this.state.flippedColors });
    }
  };

  checkValid = (form, section, input1, input2) => {
    let success = false;
    console.log(form, input1, input2);
    if (section === "section1") {
      let first_input = document.forms[form][input1].value;
      let second_input = document.forms[form][input2].value;
      if (first_input !== "" && second_input !== "") {
        success = true;
      }
    } else if (section === "section2") {
      let first_input = document.forms[form][input1].value;
      if (first_input !== "") {
        success = true;
      }
    }

    if (!success) {
      console.log("showing alert");
      $(document.querySelector(".message")).fadeIn(1000);
      setTimeout(function() {
        $(document.querySelector(".message")).fadeOut(1000);
      }, 3000);
    } else {
      console.log("hiding alert");
      $(document.querySelector(".message")).fadeOut(1000);
      this.setState({ sectionsCompleted: this.state.sectionsCompleted + 1 });
      //load next section
      if (this.state.sectionsCompleted === 0) {
        this.loadSection("section2");
      } else if (this.state.sectionsCompleted === 1) {
        this.loadSection("section3");
      }
    }
    console.log("form section complete: " + success);
  };

  toggleDonate = t => {
    console.log("toggling donation box...");
    if (t === "show") {
      $(document.querySelector(".donation-box")).fadeIn(1000);
    } else if (t === "hide") {
      $(document.querySelector(".donation-box")).fadeOut(1000);
    }
  };

  submitForm = () => {
    console.log("submitting form...");
    $(document.querySelector(".submit-message")).fadeIn(1000);
    $(document.querySelector(".submit-btn")).fadeOut(10);
  };

  donateClick = () => {
    if (document.querySelector("#donate-number-box").value < 500) {
      $(document.querySelector(".donate-message")).fadeIn(1000);
      setTimeout(function() {
        $(document.querySelector(".donate-message")).fadeOut(1000);
      }, 3000);
    } else {
      $(document.querySelector(".donate-message")).text(
        "Thank you for your donation!"
      );
      $(document.querySelector(".donate-message")).fadeIn(1000);
      setTimeout(function() {
        $(document.querySelector(".donate-message")).fadeOut(1000);
      }, 3000);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <h1 className="display-3">My ReactStrap Form</h1>
          <p className="lead">
            This is a simple form built using ReactJS and Bootstrap.
          </p>
          <hr className="my-2" />
          <p className="desc">
            Fill out the infomation required in each section and click the Next
            button to move on to the next section.
          </p>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
              onChange={this.flipColors}
            />
            <label className="custom-control-label" htmlFor="customSwitch1">
              Flip Colors
            </label>
          </div>
          <p className="lead">
            <a
              className="start-btn btn btn-primary btn-lg"
              href="#!"
              role="button"
              id="btnStart"
              onClick={() => this.loadSection("section1")}
            >
              Start
            </a>
          </p>
        </div>
        <form className="react-form" name="myForm">
          <div className="section1">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">First Name</label>
              <span className="badge badge-danger">Required</span>
              <input
                type="text"
                name="firstName"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Last Name</label>
              <span className="badge badge-danger">Required</span>
              <input
                type="text"
                name="lastName"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Last Name"
                required
              />
            </div>
            <button
              name="section1Next"
              type="button"
              className="btn btn-dark"
              onClick={() =>
                this.checkValid("myForm", "section1", "firstName", "lastName")
              }
            >
              Next
            </button>
          </div>
          <div className="section2">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Email Address</label>
              <span className="badge badge-danger">Required</span>
              <input
                type="url"
                name="emailAddress"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Phone"
              />
            </div>
            <button
              name="section2Next"
              type="button"
              className="btn btn-dark"
              onClick={() =>
                this.checkValid(
                  "myForm",
                  "section2",
                  "emailAddress",
                  "phoneNumber"
                )
              }
            >
              Next
            </button>
          </div>
          <div className="section3">
            <div className="form-group">
              <label className="form-check-label">Donate:</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="donate"
                id="donateRadio1"
                value="option1"
                onChange={() => this.toggleDonate("show")}
              />
              <label className="form-check-label" htmlFor="donateRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="donate"
                id="donateRadio2"
                value="option2"
                defaultChecked
                onChange={() => this.toggleDonate("hide")}
              />
              <label className="form-check-label" htmlFor="donateRadio2">
                No
              </label>
            </div>
            <button
              name="section3Next"
              type="button"
              className="btn btn-dark"
              onClick={() => this.loadSection("section4")}
            >
              Next
            </button>
            <div className="form-group">
              <div className="donation-box input-group">
                <span className="input-group-text">$</span>
                <input
                  id="donate-number-box"
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={this.donateClick}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="donate-message alert alert-info" role="alert">
                <strong>Uh Oh!</strong> The amount you entered is below the
                minimum. (It's $500)
              </div>
            </div>
          </div>
          <div className="section4">
            <div className="form-group">
              <button
                name="submitButton"
                type="button"
                className="submit-btn btn btn-success"
                onClick={this.submitForm}
              >
                Submit Form
              </button>
              <div className="submit-message alert alert-success" role="alert">
                <strong>Success!</strong> Thank you for participating!
              </div>
            </div>
          </div>
          <div className="message alert alert-danger" role="alert">
            <strong>Error!</strong> All required fields must be filled in.
          </div>
        </form>
      </div>
    );
  }
}

export default App;
