import React, { useState } from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import style from "./editor.less";

function Editor() {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState("<p>Hello <b>World!</b></p>"));
  const [outputHTML, setOutputHTML] = useState("<p></p>");

  function handleChange(editorState) {
    setEditorState(editorState);
    setOutputHTML(editorState.toHTML());
  }

  function createMarkup() {
    return { __html: outputHTML };
  }

  return (
    <div className={style.editorWrapper}>
      <h1>文本编辑器</h1>
      <BraftEditor className={style.myEditor} 
           value={editorState} 
           onChange={handleChange} 
           />
      <h4>输出内容：</h4>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

export default Editor;
