import { useState, useContext } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { FaMicrophone } from "react-icons/fa6";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import 'regenerator-runtime/runtime';
import "draft-js/dist/Draft.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const DocumentEditor = () => {
  const { editorState, setEditorState, editorRef, handleEditorChange } = useContext(EditorContext);
  const [loading, setLoading] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, {
      successDuration:1000
  });
  

  const handleKeyCommand = (command:string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
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

        // Get the current selection
        const selection = editorState.getSelection();

        // Create a new ContentState with the generated text inserted at the selection
        const contentState = editorState.getCurrentContent();
        const contentStateWithResponse = Modifier.replaceText(
          contentState,
          selection,
          generatedText
        );

        // Create a new EditorState with the updated ContentState
        const newEditorState = EditorState.push(
          editorState,
          contentStateWithResponse,
          'insert-characters'
        );

        // Set the new EditorState
        setEditorState(newEditorState);
      } catch (error) {
        console.error("Error generating response:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  console.log(transcript)
  if (!browserSupportsSpeechRecognition) {
      return null
  }

  return (
    <div style={{ height: "1100px", width: "850px" }} className="bg-white text-black shadow-2xl flex-shrink-0 cursor-text p-12 ">

      <Editor
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={handleEditorChange}
        spellCheck={true}
        placeholder="Type here..."
      />

      <div className="absolute top-[200px] right-[30px] w-[260px] flex flex-col gap-5 p-8 rounded-lg shadow-lg bg-white md:flex w[240px] ml-5">
        <h2 className="text-2xl font-bold text-gray-900">Experience Generative AI</h2>
        <p className="text-gray-600">Select text and click the generate button to get an AI response.</p>
        <button onClick={handleGenerateResponse} disabled={loading} className="btn bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          {loading ? 'Loading...' : 'Generate Response'}
        </button>
      </div>

      <div className="absolute top-[200px] left-[20px] w-[250px] flex flex-col gap-5 p-8 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-gray-900">Speech to Text Converter</h2>
                <p>Click on start and speak to convert it into text.</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style flex flex-row gap-2">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                    <button className="bg-blue-500 w-12 h-8 rounded-lg text-white" onClick={startListening}>Start</button>
                    <button className="bg-blue-500 w-12 h-8 rounded-lg text-white" onClick={SpeechRecognition.stopListening}>Stop</button>

                </div>

            </div>


    </div>
  );
};

export default DocumentEditor;