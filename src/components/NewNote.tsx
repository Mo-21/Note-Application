import { EditorContent, useEditor } from "@tiptap/react";
import "../styles/NewNote.css";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { Note, useLocalStorage } from "./useLocalStorage";
import { useRef, useState } from "react";
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

  const [tags, setTags] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
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
        ref={titleRef}
        required
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTags([...tags, tagRef.current?.value || ""]);
          tagRef.current!.value = "";
        }}
      >
        <input
          ref={tagRef}
          placeholder="Tag"
          type="text"
          className="tags-input"
        />
      </form>
      <div className="tags-container">
        {tags.map((tag) => (
          <div className="tag">{tag}</div>
        ))}
      </div>
      <EditorContent className="editor-content" editor={editor} />
      <div className="action-buttons">
        <button
          onClick={() => {
            const newNote: Note = {
              id: uuidv4(),
              title: titleRef.current?.value || "New Note",
              content: editor?.getHTML() || "Empty Note",
              tag: tags || [],
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
