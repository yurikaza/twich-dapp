import { Component } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import { CreateUser } from "./Components/Auth/CreateUser";
import { UserNavbar } from "./Components/Layout/Navbar";
import { CreateLiveStream } from "./Components/LiveStream/CreateLiveStream";
import { LiveStream } from "./Components/LiveStream/LiveStream";
import { Profile } from "./Components/Profile/Profile";
import { Home } from "./Container/Home";
import { Users } from "./Container/Users";

class App extends Component {
  render() {
    return (
      <>
        <UserNavbar />
        <Container fluid>
          <Row>
            <Col xs={2}>
              <Users />
            </Col>

            <Col xs={10}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/createUserName" component={CreateUser} />
                <Route exact path="/allUsers" component={Users} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/stream/:publicKey" component={LiveStream} />
                <Route
                  exact
                  path="/profile/createLiveStream"
                  component={CreateLiveStream}
                />
              </Switch>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
