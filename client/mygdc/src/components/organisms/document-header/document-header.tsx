/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Quill from "quill";
import EditorToolbar from "../../molecules/editor-toolbar/editor-toolbar";

interface DocumentHeaderProps {
  documentHeaderRef: React.RefObject<HTMLDivElement>;
}
const DocumentHeader: React.FC<DocumentHeaderProps> = ({ documentHeaderRef }) => {
  const quillRef = React.useRef<HTMLDivElement>(null);
  const [quill, setQuill] = React.useState<Quill | null>(null);

  React.useEffect(() => {
    if (quillRef.current) {
      const quillInstance = new Quill(quillRef.current, {
        theme: "snow",
      });
      setQuill(quillInstance);
    }
  }, []);

  const handleBoldClick = () => {
    if (quill) quill.format("bold", true);
  };

  const handleItalicClick = () => {
    if (quill) quill.format("italic", true);
  };

  const handleUnderlineClick = () => {
    if (quill) quill.format("underline", true);
  };

  const handleStrikethroughClick = () => {
    if (quill) quill.format("strike", true);
  };

  const handleBulletListClick = () => {
    if (quill) quill.format("list", "bullet");
  };

  const handleNumberedListClick = () => {
    if (quill) quill.format("list", "ordered");
  };

  const handleInsertImage = (imageUrl: string) => {
    if (quill) {
      const range = quill.getSelection();
      quill.insertEmbed(range?.index || 0, "image", imageUrl);
    }
  };


  const handlePageAlignment = (alignment: "left" | "center" | "right" | "justify") => {
    if (quill) quill.format("align", alignment);
  };

  return (
    <div ref={documentHeaderRef}>
      <div ref={quillRef} style={{ height: "400px" }} />
      {quill && (
        <EditorToolbar
          quill={quill}
          handleBoldClick={handleBoldClick}
          handleItalicClick={handleItalicClick}
          handleUnderlineClick={handleUnderlineClick}
          handleStrikethroughClick={handleStrikethroughClick}
          handleBulletListClick={handleBulletListClick}
          handleNumberedListClick={handleNumberedListClick}
          handleInsertImage={handleInsertImage}
          handlePageAlignment={handlePageAlignment} 
          handleFontSizeChange={function (_newFontSize: string): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
};

export default DocumentHeader;
