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
  componentWillReceiveProps(nextProps) {
    console.log("got the props", nextProps);
    this.setState({
      data: nextProps.text,
      page: nextProps.page,
      lang: nextProps.lang,
    });
  }

  replaceTags = (data) => {
    console.log("inside replace");
    let temp = data;
    temp = temp.replace(/<p>/g, "").replace(/<\/p>/g, "");
    temp = temp.replace(/<h1>/g, "").replace(/<\/h1>/g, "");
    temp = temp.replace(/<h2>/g, "").replace(/<\/h2>/g, "");
    temp = temp.replace(/<h3>/g, "").replace(/<\/h3>/g, "");
    temp = temp.replace(/<h4>/g, "").replace(/<\/h4>/g, "");
    temp = temp.replace(/<h5>/g, "").replace(/<\/h5>/g, "");
    temp = temp.replace(/<h6>/g, "").replace(/<\/h6>/g, "");
    temp = temp.replace(/&nbsp;/g, "<br />");
    console.log(temp);
    return temp;
  };

  handleChange = (id, data) => {
    let { sections } = this.state.data;
    console.log(id, data);
    data = this.replaceTags(data);
    console.log("test : ", data);
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
