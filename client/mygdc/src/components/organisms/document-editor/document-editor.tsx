import { useState, useContext } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { Editor, EditorState, ContentState, RichUtils } from "draft-js";

import "draft-js/dist/Draft.css";

const DocumentEditor = () => {
  const { editorState, setEditorState, editorRef, currentFont } =
    useContext(EditorContext);
  const [loading, setLoading] = useState(false);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleGenerateResponse = async () => {
    setLoading(true);
    const selectedText = editorState.getSelection().isCollapsed()
      ? null
      : editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getText();
    
    if (selectedText) {
      try {
        const response = await fetch("http://localhost:5500/api/generate-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: selectedText })
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
  
        const responseData = await response.json();
        const generatedText = responseData.response;
        const contentState = editorState.getCurrentContent();
        const newContentState = ContentState.createFromText(generatedText); // Corrected function name
        const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
        setEditorState(newEditorState);
      } catch (error) {
        console.error("Error generating response:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div
      style={{ height: "1100px", width: "850px" }}
      className="bg-white text-black shadow-2xl flex-shrink-0 cursor-text p-12 "
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={handleChange}
        spellCheck={true}
        placeholder="Type here..."
      />
      <button onClick={handleGenerateResponse} disabled={loading} className="absolute top-10 bg-red-500 right-0">Get Response</button>
    </div>
  );
};

export default DocumentEditor;
