import { EditorContent, useEditor } from "@tiptap/react";
import "../styles/NewNote.css";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { Note, useLocalStorage } from "./useLocalStorage";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const { setItem, getItem } = useLocalStorage("Notes");

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
          onClick={() => {
            const newNote: Note = {
              id: uuidv4(),
              title: inputRef.current?.value || "New Note",
              content: editor?.getHTML() || "Empty Note",
              createdAt: new Date().toLocaleString(),
            };
            const currentNotes = getItem() || [];
            setItem([...currentNotes, newNote]);
            navigate("/");
          }}
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
