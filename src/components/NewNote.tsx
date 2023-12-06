import { EditorContent, useEditor } from "@tiptap/react";
import "../styles/NewNote.css";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { useLocalStorage } from "./useLocalStorage";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function NewNote() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h1>Hello World! 🌎️</h1> <p>Write Something</p>",
    editorProps: {
      attributes: {
        class: "new-note",
      },
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const { setItem } = useLocalStorage("New Note");

  const navigate = useNavigate();

  return (
    <>
      <MenuBar editor={editor} />
      <input
        className="title-input"
        maxLength={200}
        type="text"
        placeholder="Title"
        ref={inputRef}
        required
      />
      <EditorContent className="editor-content" editor={editor} />
      <div className="action-buttons">
        <button
          onClick={() =>
            setItem({
              title: inputRef.current?.value || "New Note",
              content: editor?.getHTML(),
              createdAt: new Date().toLocaleString(),
            })
          }
          className="create-btn"
        >
          Create
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default NewNote;
