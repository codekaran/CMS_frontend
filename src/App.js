import "./App.css";
import PageContent from "./components/PageContent";
import Nav from "./components/Nav";
import { Component } from "react";

class App extends Component {
  state = { data: "", page: "", lang: "", shouldLoad: false };

  // APP starts here home page with nl lang

  componentDidMount() {
    this.getData("home", "nl");
  }

  getData = async (page, lang) => {
    this.setState({ shouldLoad: true, lang: "nl" });
    console.log("getting the data ", page, " lang ", lang);
    let data = {};
    try {
      let res = await fetch(
        `http://161.35.41.189/getData?page=${page}&website=${
          window.location.pathname === "/"
            ? "webfixxers"
            : window.location.pathname
        }&lang=${lang}`
      );
      res = await res.json();
      data = JSON.parse(res.data);
      console.log("got data from fetch", data);
      this.setState({ shouldLoad: false });
    } catch (err) {
      console.log(err);
    }
    this.setState({ data, page, lang });
    console.log("state after get data", this.state);
  };

  changeLang = (lang) => {
    this.setState({ lang });
  };

  render() {
    return (
      <div className="app_container">
        <div className="app_nav">
          <Nav
            changeLang={this.changeLang}
            getData={this.getData}
            lang={this.state.lang}
          ></Nav>
        </div>
        {this.state.data ? (
          <div className="app_content">
            <h2>{this.state.page}</h2>
            <PageContent
              text={this.state.data}
              page={this.state.page}
              lang={this.state.lang}
            ></PageContent>{" "}
          </div>
        ) : (
          <div className="app_content">Loading...</div>
        )}
      </div>
    );
  }

  // render() {
  //   if (this.state.data) {
  //     return (
  //       <div className="app_container">
  //         <div className="app_nav">
  //           <Nav
  //             changeLang={this.changeLang}
  //             getData={this.getData}
  //             lang={this.state.lang}
  //           ></Nav>
  //         </div>
  //         <div className="app_content">
  //           <PageContent
  //             text={this.state.data}
  //             page={this.state.page}
  //             lang={this.state.lang}
  //           ></PageContent>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="app_container">
  //         <div className="app_nav">
  //           <Nav></Nav>
  //         </div>
  //         <div className="app_content">Loading...</div>
  //       </div>
  //     );
  //   }
  // }
}

export default App;

// function App() {

//   const refreashData

//   return (
//     <div className="App">
//       <Nav></Nav>
//       <PageContent></PageContent>
//     </div>
//   );
// }

// export default App;
