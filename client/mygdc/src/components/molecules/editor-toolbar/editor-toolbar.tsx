import React from "react";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ImageIcon from "@material-ui/icons/Image";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import CodeIcon from "@material-ui/icons/Code";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { IconButton, Select, MenuItem } from "@material-ui/core";
// import { ChromePicker } from "react-color";

interface EditorToolbarProps {
  handleBoldClick: () => void;
  handleItalicClick: () => void;
  handleUnderlineClick: () => void;
  handleStrikethroughClick: () => void;
  handleBulletListClick: () => void;
  handleNumberedListClick: () => void;
  handleInsertImage: (imageUrl: string) => void;
  handleTextColor: (color: string) => void;
  handleTextBackgroundColor: (color: string) => void;
  handleFontSizeChange: (newFontSize: number) => void;
  handlePageAlignment: (alignment: "left" | "center" | "right" | "justify") => void;
  handleUndoBtnClick: () => void;
  handleRedoBtnClick: () => void;
  handleInlineStyleToggle: (inlineStyle: string) => void;
  handleBlockTypeToggle: (blockType: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  handleBoldClick,
  handleItalicClick,
  handleUnderlineClick,
  handleStrikethroughClick,
  handleBulletListClick,
  handleNumberedListClick,
  handleInsertImage,
  // handleTextColor,
  // handleTextBackgroundColor,
  handleFontSizeChange,
  handlePageAlignment,
  handleUndoBtnClick,
  handleRedoBtnClick,
  handleInlineStyleToggle,
  handleBlockTypeToggle,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        handleInsertImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleTextColorChange = (color: string) => {
  //   handleTextColor(color);
  // };

  // const handleTextBackgroundColorChange = (color: string) => {
  //   handleTextBackgroundColor(color);
  // };

  const handleAlignmentChange = (alignment: "left" | "center" | "right" | "justify") => {
    handlePageAlignment(alignment);
  };

  const handleFontSizeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newFontSize = Number(event.target.value as string);
    handleFontSizeChange(newFontSize);
  };

  return (
    <div>
      <IconButton onClick={handleBoldClick}><FormatBoldIcon /></IconButton>
      <IconButton onClick={handleItalicClick}><FormatItalicIcon /></IconButton>
      <IconButton onClick={handleUnderlineClick}><FormatUnderlinedIcon /></IconButton>
      <IconButton onClick={handleStrikethroughClick}><StrikethroughSIcon /></IconButton>
      <IconButton onClick={handleBulletListClick}><FormatListBulletedIcon /></IconButton>
      <IconButton onClick={handleNumberedListClick}><FormatListNumberedIcon /></IconButton>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="icon-button-file" />
      <label htmlFor="icon-button-file">
        <IconButton component="span"><ImageIcon /></IconButton>
      </label>
      <Select onChange={(e) => handleFontSizeSelect(e)} defaultValue="12">
        <MenuItem value="12">12</MenuItem>
        <MenuItem value="14">14</MenuItem>
        <MenuItem value="16">16</MenuItem>
        <MenuItem value="18">18</MenuItem>
        <MenuItem value="20">20</MenuItem>
      </Select>
      <IconButton onClick={() => handleAlignmentChange("left")}><FormatAlignLeftIcon /></IconButton>
      <IconButton onClick={() => handleAlignmentChange("center")}><FormatAlignCenterIcon /></IconButton>
      <IconButton onClick={() => handleAlignmentChange("right")}><FormatAlignRightIcon /></IconButton>
      <IconButton onClick={() => handleAlignmentChange("justify")}><FormatAlignJustifyIcon /></IconButton>
      <IconButton onClick={handleUndoBtnClick}><UndoIcon /></IconButton>
      <IconButton onClick={handleRedoBtnClick}><RedoIcon /></IconButton>
      <IconButton onClick={() => handleInlineStyleToggle("code")}><CodeIcon /></IconButton>
      <IconButton onClick={() => handleBlockTypeToggle("blockquote")}><FormatQuoteIcon /></IconButton>
    </div>
  );
};

export default EditorToolbar;
