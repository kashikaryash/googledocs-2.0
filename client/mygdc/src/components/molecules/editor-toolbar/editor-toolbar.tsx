import { useContext, useState } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, DraftHandleValue } from "draft-js";
import "draft-js/dist/Draft.css";
import IconButton from "../../atoms/icon-button/icon-button";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { FaLink } from "react-icons/fa6";

const EditorToolbar = () => {
  const { editorState, setEditorState, currentFont } = useContext(EditorContext);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkURL, setLinkURL] = useState("");

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

  const handleUndoBtnClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoBtnClick = () => {
    setEditorState(EditorState.redo(editorState));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, blockType)
    );
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
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-5 h-10">
            <LuHeading1 size='1.55rem'
              onClick={() => toggleBlockType("header-one")}
            >
            </LuHeading1>
            <LuHeading2 size='1.55rem'
              onClick={() => toggleBlockType("header-two")}
            >
            </LuHeading2>
            <LuHeading3 size='1.55rem'
              onClick={() => toggleBlockType("header-three")}
            >
            </LuHeading3>
          </div>
          <FaBold size='1.2rem'
            onClick={() => toggleInlineStyle("BOLD")}>
          </FaBold>
          <FaItalic size='1.2rem'
            onClick={() => toggleInlineStyle("ITALIC")}
          >
          </FaItalic>
          <FaUnderline size='1.2rem'
            onClick={() => toggleInlineStyle("UNDERLINE")}
          >
          </FaUnderline>
        </div>
        <div className="ml-4 flex items-center space-x-5">
          <FaLink size='1.5rem'
            onClick={() => setShowLinkInput(!showLinkInput)}
          >
          </FaLink>
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

          <FaAlignLeft size='1.3rem'
            onClick={() => handleAlignment("left")}
          >
          </FaAlignLeft>
          <FaAlignCenter size='1.3rem'
            onClick={() => handleAlignment("center")}
          >
          </FaAlignCenter>
          <FaAlignRight size='1.3rem'
            onClick={() => handleAlignment("right")}
          >

          </FaAlignRight>
          <MdFormatListBulleted size='1.6rem'
            onClick={() => handleList("unordered-list-item")}
          >
          </MdFormatListBulleted>
          <MdFormatListNumbered size='1.6rem'
            onClick={() => handleList("ordered-list-item")}
          >
          </MdFormatListNumbered>

        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;