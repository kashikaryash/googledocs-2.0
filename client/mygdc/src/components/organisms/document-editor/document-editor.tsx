window.global ||= window;
import { useContext, useState } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { Editor } from "draft-js";
import "rabbitcss"
import { ChatBubble, Send } from "@mui/icons-material";

const DocumentEditor = () => {
  const { editorState, editorRef, handleEditorChange, focusEditor } =
    useContext(EditorContext);

    const [bot  , setBot] = useState(false);

    const setChat = () =>{ 
        if(bot === true){
          setBot(false)
        }else{
          setBot(true)
        }
    }


  return (
    <div className="   flex ">
    <div
      style={{ height: "1100px", width: "950px" }}
      className=" bg-white shadow-2xl border border-black rounded-xl flex-shrink-0 cursor-text p-12 "
      onClick={focusEditor}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleEditorChange}
      />
      
    </div>
    <div className="absolute bottom-6 right-5 rounded-full shadow-xl border border-black bg-grey-400 p-3" onClick={()=>setChat()}>
        <ChatBubble className="text-blue-700"/>
    </div>
    {bot && 
    
    <div className=" absolute right-3 z-10 p-5 flex justify-center flex-1  ">
      <div className=" w-[350px] blue-blur-glass h-[500px] rounded-xl p-3 flex flex-col justify-center">
        
        <div className="bg-white text-black rounded-xl shadow-xl h-[80%] overflow-y-scroll text-xl font-mono p-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus et, quidem perspiciatis nihil dicta sequi excepturi, aut aperiam nesciunt qui aspernatur maiores nostrum ipsa unde culpa quae esse placeat doloremque obcaecati ad. Nemo.s
        </div>
        <div className="my-3 flex justify-center gap-3 items-center">
        <input className="w-full p-3  rounded-full" placeholder="Enter Prompt Here" />
        <Send className="text-blue-500"/>
        </div>
      </div>
    </div>
    
    }
    
    </div>
  );
};

export default DocumentEditor;