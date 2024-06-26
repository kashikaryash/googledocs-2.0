window.global ||= window;
import { useParams } from "react-router-dom";
import useWindowSize from "../../hook/use-window-size";
import useDocument from "../../hook/use-document";
import DocumentHeader from "../../components/organisms/document-header/document-header";
import { useContext, useEffect, useRef, useState } from "react";
import { DocumentContext } from "../../contexts/document-context";
import DocumentEditor from "../../components/organisms/document-editor/document-editor";

const Document = () => {
  const { heightStr, widthStr } = useWindowSize();
  const { id: documentId } = useParams();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const { document, errors, loading } = useDocument(parseInt(documentId as string));
  const { setDocument } = useContext(DocumentContext);
  const [isLoading, setIsLoading] = useState(true);

  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;

  useEffect(() => {
    if (document !== null) {
      setDocument(document);
      setIsLoading(false);
    }
  }, [document, setDocument]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length > 0) {
    return <div>Error: {errors[0]}</div>;
  }

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray-300 flex flex-col"
    >
      <>
        <DocumentHeader documentHeaderRef={documentHeaderRef} />
        <div
          style={{
            height: documentViewerHeight,
          }}
          className="w-full flex flex-col justify-start items-center overflow-hidden"
        >
          <div
            style={{ width: widthStr }}
            className="h-full w-full overflow-auto space-y-4 flex flex-col items-center p-4"
          >
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <DocumentEditor />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Document;
