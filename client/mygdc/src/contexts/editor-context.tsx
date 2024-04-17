import { EditorState, Editor, convertToRaw, convertFromRaw, RawDraftContentState } from "draft-js";
import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { FONTS } from "../components/atoms/font-select";
import { DocumentContext } from "./document-context";
import { ToastContext } from "./toast-context";
import useAuth from "../hooks/use-auth";
import SocketEvent from "../types/enums/socket-events-enum";
import DocumentInterface from "../types/interfaces/document";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../services/api";

interface EditorContextInterface {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  socket: null | MutableRefObject<Socket | null>;
  documentRendered: boolean;
  setDocumentRendered: Dispatch<SetStateAction<boolean>>;
  editorRef: null | MutableRefObject<null | Editor>;
  handleEditorChange: (editorState: EditorState) => void;
  focusEditor: () => void;
  currentFont: string;
  setCurrentFont: Dispatch<SetStateAction<string>>;
}

const defaultValues = {
  editorState: EditorState.createEmpty(),
  setEditorState: () => { },
  socket: null,
  documentRendered: false,
  setDocumentRendered: () => { },
  editorRef: null,
  handleEditorChange: () => { },
  focusEditor: () => { },
  currentFont: FONTS[0],
  setCurrentFont: () => { },
};

export const EditorContext = createContext<EditorContextInterface>(defaultValues);

interface EditorProviderInterface {
  children: JSX.Element;
}
const DEFAULT_SAVE_TIME = 1500;
let saveInterval: number | null = null;

export const EditorProvider = ({ children }: EditorProviderInterface) => {
  const [editorState, setEditorState] = useState(defaultValues.editorState);
  const socket = useRef<Socket | null>(defaultValues.socket);
  const [documentRendered, setDocumentRendered] = useState(defaultValues.documentRendered);
  const editorRef = useRef<null | Editor>(defaultValues.editorRef);
  const [currentFont, setCurrentFont] = useState(defaultValues.currentFont);

  const { document, setCurrentUsers, setSaving, setDocument, saveDocument } = useContext(DocumentContext);
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();

  const focusEditor = () => {
    if (editorRef.current === null) return;
    editorRef.current.focus();
  };

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(EditorState.moveSelectionToEnd(editorState));

    if (socket.current) {
      const content = convertToRaw(editorState.getCurrentContent());
      socket.current.emit(SocketEvent.SEND_CHANGES, content);

      const updatedDocument = {
        ...document!,
        content: JSON.stringify(content),
      } as DocumentInterface;

      setDocument(updatedDocument);

      if (!document || JSON.stringify(content) === document.content) return;

      setSaving(true);
      if (saveInterval !== null) {
        clearInterval(saveInterval);
        saveInterval = null;
      }

      saveInterval = window.setInterval(async () => {
        await saveDocument(updatedDocument);
        if (saveInterval !== null) {
          clearInterval(saveInterval);
          saveInterval = null;
        }
      }, DEFAULT_SAVE_TIME);
    }
  };

  useEffect(() => {
    if (documentRendered || !document || document.content === null) return;

    try {
      const contentState = convertFromRaw(JSON.parse(document.content) as RawDraftContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(EditorState.moveSelectionToEnd(newEditorState));
    } catch {
      error("Error when loading document.");
    } finally {
      setDocumentRendered(true);
    }
  }, [document, documentRendered, error]);

  useEffect(() => {
    if (!document || !accessToken || (socket.current && socket.current.connected)) return;

    socket.current = io(BASE_URL, {
      query: { documentId: document.id, accessToken },
    }).connect();
  }, [document, accessToken]);

  useEffect(() => {
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    const handler = (rawDraftContentState: RawDraftContentState) => {
      const contentState = convertFromRaw(rawDraftContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(EditorState.moveSelectionToEnd(newEditorState));
    };

    socket.current.on(SocketEvent.RECEIVE_CHANGES, handler);

    return () => {
      socket.current!.off(SocketEvent.RECEIVE_CHANGES, handler);
    };
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    const handler = (currentUsers: Array<string>) => {
      setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on(SocketEvent.CURRENT_USERS_UPDATE, handler);

    return () => {
      socket.current!.off(SocketEvent.CURRENT_USERS_UPDATE, handler);
    };
  }, [setCurrentUsers]);

  return (
    <EditorContext.Provider
      value={{
        editorState,
        socket,
        documentRendered,
        setDocumentRendered,
        editorRef,
        currentFont,
        setEditorState,
        setCurrentFont,
        focusEditor,
        handleEditorChange,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
