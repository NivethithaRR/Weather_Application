import React, { Component } from "react";
import { Grid, Input, Icon, Button, Segment, Card } from "semantic-ui-react";

const ReactToastr = require("react-toastr");
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(
  ReactToastr.ToastMessage.animation
);

const styles = {
  message: {
    textAlign: "center",
    marginTop: "5%",
    fontSize: "20px"
  },
  weather: {
    fontSize: "25px"
  }
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      weather: "",
      location: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorAlert = this.errorAlert.bind(this);
  }

  errorAlert(message) {
    this.refs.asd.warning(message, "", {
      timeOut: 3000,
      extendedTimeOut: 3000
    });
  }

  handleSubmit() {
    $.ajax({
      url: "/api/" + this.state.city,
      type: "GET",
      success: function(data) {
        let weather = JSON.parse(data);
        this.setState({
          weather: weather.main.temp,
          location: weather.name
        });
      }.bind(this),
      error: function(err) {
        if (err.responseJSON.errorResponse.err.response.status === 503) {
          this.errorAlert("Service Unavailabe....Check you connectivity");
        } else if (
          JSON.parse(err.responseJSON.errorResponse.err.response.text)
            .message === "city not found"
        ) {
          this.errorAlert("City not found.Enter valid location");
        }
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <Card
          raised
          style={{
            backgroundColor: "#c0c0c029",
            margin: "auto",
            marginTop: "7%",
            padding: "3%"
          }}
        >
          <Grid>
            <Grid.Row style={{ marginTop: "20%" }}>
              <Grid.Column width={2} />
              <Grid.Column
                width={12}
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  letterSpacing: "2px",
                  fontFamily: "Open Sans"
                }}
              >
                <Input
                  focus
                  placeholder="Enter your location"
                  onChange={e => {
                    this.setState({
                      city: e.target.value
                    });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid.Row>
            {/* <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column
                width={12}
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  letterSpacing: "2px",
                  fontFamily: "Open Sans"
                }}
              >
                {/* <Input
                 icon={<Icon name='search' inverted circular link />}
                 placeholder='Enter yoy location'
               /> */}
            {/* <Input
                  focus
                  placeholder="Enter your API key"
                  onChange={e => {
                    this.setState({
                      apikey: e.target.value
                    });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid.Row> */}
            <Grid.Row>
              <Grid.Column width={5} />
              <Grid.Column
                width={6}
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  letterSpacing: "2px",
                  fontFamily: "Open Sans"
                }}
              >
                <Button
                  inverted
                  color="blue"
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </Grid.Column>
              <Grid.Column width={5} />
            </Grid.Row>
          </Grid>
        </Card>
        {this.state.weather && this.state.location ? (
          <p style={styles.message}>
            It's <b style={styles.weather}>{this.state.weather}</b> degrees in{" "}
            {this.state.location}!
          </p>
        ) : null}
        <ToastContainer
          ref="asd"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-center"
          style={{ marginLeft: "28.5%" }}
        />
      </div>
    );
  }
}
export default Home;
