import React from "react";
import "./styles/UploadWidget.css";

class UploadWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(event) {
    event.stopPropagation();
    const tmpUrl = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    this.props.onFileSelect({ tmpUrl, file });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) {
      return;
    }
  }

  render() {
    const { name } = this.props;
    return (
      <React.Fragment>
        <label
          onClick={this.focusInput}
          className="UploadWidget label"
          htmlFor={name}
        >
          {this.props.children}
        </label>
        <input
          onChange={this.handleFile}
          className="UploadWidget input"
          id={name}
          type="file"
          name={name}
        />
      </React.Fragment>
    );
  }
}

export default UploadWidget;