import { useContext, useState } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, DraftHandleValue } from "draft-js";
import "draft-js/dist/Draft.css";
import IconButton from "../../atoms/icon-button/icon-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

const EditorToolbar = () => {
  const { editorState, setEditorState, currentFont } = useContext(EditorContext);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkURL, setLinkURL] = useState("");

  const handleUndoBtnClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoBtnClick = () => {
    setEditorState(EditorState.redo(editorState));
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
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

  const handleLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkURL(e.target.value);
  };

  const handleLinkSubmit = () => {
    addLink();
  };

  const addLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
      url: linkURL,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
    );
    setLinkURL("");
    setShowLinkInput(false);
  };

  const handleAlignment = (alignment: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, alignment));
  };

  const handleList = (listType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, listType));
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <IconButton
          onClick={handleUndoBtnClick}
          icon={<ArrowLeftIcon className="h-5 w-5" />}
          tooltip="Undo"
        />
        <IconButton
          onClick={handleRedoBtnClick}
          icon={<ArrowRightIcon className="h-5 w-5" />}
          tooltip="Redo"
        />
        <div className="flex items-center space-x-2">
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => toggleBlockType("header-one")}
          >
            H1
          </button>
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => toggleBlockType("header-two")}
          >
            H2
          </button>
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => toggleBlockType("header-three")}
          >
            H3
          </button>
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => toggleInlineStyle("BOLD")}
          >
            B
          </button>
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => toggleInlineStyle("ITALIC")}
          >
            I
          </button>
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => toggleInlineStyle("UNDERLINE")}
          >
            U
          </button>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          <button
            className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() => setShowLinkInput(!showLinkInput)}
          >
            Link
          </button>
          {showLinkInput && (
            <>
              <input
                type="text"
                value={linkURL}
                onChange={handleLinkInput}
                className="text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                placeholder="Enter URL..."
              />
              <button
                className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleLinkSubmit}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={() => handleAlignment("left")}
        >
          Left
        </button>
        <button
          className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={() => handleAlignment("center")}
        >
          Center
        </button>
        <button
          className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={() => handleAlignment("right")}
        >
          Right
        </button>
        <button
          className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={() => handleList("unordered-list-item")}
        >
          Bulleted
        </button>
        <button
          className="text-xs font-semibold px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={() => handleList("ordered-list-item")}
        >
          Numbered
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
