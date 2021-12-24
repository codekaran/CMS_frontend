import classes from "./PageContent.css";
import TextArea from "./TextArea";
import { Component } from "react";

class Home extends Component {
  state = {
    data: "",
    lang: "",
    page: "",
  };

  componentDidMount() {
    this.setState({
      data: this.props.text,
      lang: this.props.lang,
      page: this.props.page,
    });
    console.log(this.state);
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log("got the props", nextProps);
  //   this.setState({
  //     data: nextProps.text,
  //     page: nextProps.page,
  //     lang: nextProps.lang,
  //   });
  // }

  handleChange = (id, data) => {
    let { sections } = this.state.data;
    console.log(id, data);
    sections[id.index][id.field] = data;
    console.log(sections);
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        sections: sections,
      },
      // page: this.props.page,
      // lan
    }));
    console.log(this.state);
  };

  handleSubmit = (page, lang) => {
    console.log("submitting for page ", page);
    fetch(
      // `https://webfixxers-cms.herokuapp.com/updateData?page=${page}&lang=${lang}`,
      `http://161.35.41.189/updateData?page=${page}&website=${
        window.location.pathname === "/"
          ? "webfixxers"
          : window.location.pathname
      }&lang=${lang}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      }
    ).then((res) => {
      if (res.status == 200) {
        alert("data updated");
      }
    });
  };

  render() {
    if (this.state.data) {
      let { sections } = this.state.data;
      return (
        <div className={classes.container}>
          <div>
            {Object.keys(sections).map((val) => {
              return (
                <ul>
                  {Object.entries(sections[val]).map(([k, v]) => {
                    return (
                      <li>
                        <TextArea
                          key={`section_${parseInt(val) + 1}_${k}`}
                          func={this.handleChange}
                          heading={`section_${parseInt(val) + 1}_${k}`}
                          text={v}
                          id={{ index: val, field: k }}
                        ></TextArea>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>

          <button
            onClick={() => {
              this.handleSubmit(this.state.page, this.state.lang);
            }}
          >
            submit
          </button>
        </div>
      );
    } else {
      return <h3>Loading...</h3>;
    }
  }
}

export default Home;
