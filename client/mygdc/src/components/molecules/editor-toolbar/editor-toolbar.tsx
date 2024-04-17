import React, { useState } from "react";
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
} from "@material-ui/core";
import { Image } from "@material-ui/icons";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditorToolbarProps {
  quill: Quill;
  handleBoldClick: () => void;
  handleItalicClick: () => void;
  handleUnderlineClick: () => void;
  handleStrikethroughClick: () => void;
  handleBulletListClick: () => void;
  handleNumberedListClick: () => void;
  handleInsertImage: (imageUrl: string) => void;
  handleFontSizeChange: (newFontSize: string) => void;
  handlePageAlignment: (alignment: "left" | "center" | "right" | "justify") => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ quill, handleBoldClick, handleItalicClick, handleUnderlineClick, handleStrikethroughClick}) => {
  const [fontSize, setFontSize] = useState("12px");

  const handleFontSizeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const size = e.target.value as string;
    quill.format("size", size);
    setFontSize(size);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const range = quill.getSelection();
        quill.insertEmbed(range?.index || 0, "image", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAlignment = (align: string) => {
    quill.format("align", align);
  };

  return (
    <div>
      <Tooltip title="Bold">
        <IconButton onClick={handleBoldClick}>
          <span style={{ fontWeight: "bold" }}>B</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic">
        <IconButton onClick={handleItalicClick}>
          <span style={{ fontStyle: "italic" }}>I</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Underline">
        <IconButton onClick={handleUnderlineClick}>
          <span style={{ textDecoration: "underline" }}>U</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Strikethrough">
        <IconButton onClick={handleStrikethroughClick}>
          <del>S</del>
        </IconButton>
      </Tooltip>
      <FormControl>
        <Select value={fontSize} onChange={handleFontSizeChange}>
          {["12px", "14px", "16px", "18px", "20px"].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Insert Image">
        <IconButton component="label">
          <Image />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Left">
        <IconButton onClick={() => handleAlignment("left")}>
          <span style={{ textAlign: "left" }}>L</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Center">
        <IconButton onClick={() => handleAlignment("center")}>
          <span style={{ textAlign: "center" }}>C</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Right">
        <IconButton onClick={() => handleAlignment("right")}>
          <span style={{ textAlign: "right" }}>R</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Justify">
        <IconButton onClick={() => handleAlignment("justify")}>
          <span style={{ textAlign: "justify" }}>J</span>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default EditorToolbar;
