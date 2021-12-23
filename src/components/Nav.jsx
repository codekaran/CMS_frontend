import { Component } from "react";
import "./Nav.css";

class Nav extends Component {
  state = { pageList: [], page: "home", lang: "nl" };
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let data = {};
    try {
      let res = await fetch(
        // "https://webfixxers-cms.herokuapp.com/getPageList?lang=en"
        "http://localhost:8000/getPageList?lang=" + this.state.lang
      );
      res = await res.json();
      data = res.data;
    } catch (err) {
      console.log(err);
    }
    this.setState({ pageList: data });
    console.log(this.state);
  };

  setPage = (page) => {
    this.setState({ page });
    console.log(this.state);
  };
  updateLangClass = (lang) => {
    this.setState({ lang });
  };

  render() {
    if (this.state.pageList.length > 0) {
      return (
        <nav className="NavBar">
          <ul className="page_list">
            {this.state.pageList.map((val) => {
              return (
                <li
                  className="page"
                  onClick={() => {
                    this.props.getData(val, this.props.lang);
                    this.setPage(val);
                  }}
                  key={val}
                >
                  {val}
                </li>
              );
            })}
          </ul>
          <ul className="lang_changer">
            <li
              className={this.state.lang === "en" ? "active" : "inactive"}
              onClick={() => {
                this.props.changeLang("EN");
                this.props.getData(this.state.page, "en");
                this.updateLangClass("en");
              }}
            >
              EN
            </li>
            <li
              className={this.state.lang === "nl" ? "active" : "inactive"}
              onClick={() => {
                this.props.changeLang("NL");
                this.props.getData(this.state.page, "nl");
                this.updateLangClass("nl");
              }}
            >
              NL
            </li>
          </ul>
        </nav>
      );
    } else {
      return <h4>Loading</h4>;
    }
  }
}

export default Nav;
