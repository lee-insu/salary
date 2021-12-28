import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ContentsList from "./components/contentsList/contentsList";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Main from "./components/main/main";
import Onboard from "./components/onboard/onboard";
import Register from "./components/register/register";
import Research from "./components/research/research";
import ResearchContent from "./components/research/research_content/research_content";
import Search from "./components/search/search";
import { firebaseAuth } from "./service/firebase";
import { getUser } from "./service/store";

function App({ getUser }) {
  const [login, getLogin] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        getUser(user);
        getLogin(true);
      } else {
        getLogin(false);
      }
    });
  }, []);

  return (
    <>
      <div className="responsive">
        <div className="container">
          <div>heyapp</div>
          <div>헤이앱은 데스크환경에 최적화 되어있습니다</div>
          <p>
            헤이앱은 스마트폰 사이즈의 이미지가 많아 <br />
            태블릿, 데스크탑에서 활용하시는 것을 추천합니다.
          </p>
        </div>
      </div>
      <div className="app">
        <BrowserRouter>
          <div className="session">
            <Header login={login} />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/onboard/:author/:id" component={Onboard} />
              <Route exact path="/research" component={Research} />
              <Route
                exact
                path="/research/:date/:id"
                component={ResearchContent}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/search/:id" component={Search} />
              <Route exact path="/appcontents/:id" component={ContentsList} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(App);
