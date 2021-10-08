import classes from "./TextArea.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextArea = (props) => {
  return (
    <div className={classes.container}>
      <h2>{props.heading}</h2>
      <CKEditor
        editor={ClassicEditor}
        data={props.text}
        onChange={(event, editor) => {
          props.func(props.id, editor.getData());
        }}
      ></CKEditor>
    </div>
  );
};

export default TextArea;
