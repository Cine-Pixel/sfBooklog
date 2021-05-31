import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './Editor.css'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

interface Props {
  editorState: {state: EditorState}
  setEditorState: React.Dispatch<React.SetStateAction<{state: EditorState}>>
}

const EditorConvertToHTML: React.FC<Props> = ({editorState, setEditorState}) => {
  const onEditorStateChange = (state: any) => {
    setEditorState({state});
  };

  const handleFocus = () => {
    console.log("focus")
  }

  const { state } = editorState;
  return (
      <>
      <Editor
        editorState={state}
        toolbarClassName="toolbar"
        editorClassName="editor"
        onEditorStateChange={onEditorStateChange}
        onFocus={handleFocus}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </>
  );
}

export default EditorConvertToHTML;