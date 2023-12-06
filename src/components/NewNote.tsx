import { EditorContent, useEditor } from "@tiptap/react";
import "../styles/NewNote.css";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

function NewNote() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write Something</p> <h1>Hello World! 🌎️</h1>",
    editorProps: {
      attributes: {
        class: "new-note",
      },
    },
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent className="editor-content" editor={editor} />
      <div className="action-buttons">
        <button className="create-btn">Create</button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </>
  );
}

export default NewNote;
