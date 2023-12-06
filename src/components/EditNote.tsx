import { useNavigate, useParams } from "react-router-dom";
import { Note, useLocalStorage } from "./useLocalStorage";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function EditNote() {
  const noteId = useParams().id;
  const navigate = useNavigate();

  const { getItem, setItem } = useLocalStorage("Notes");

  let noteToEdit: Note = getItem()?.find((note: Note) => note.id === noteId);

  const [currentTitle, setTitle] = useState(noteToEdit.title);

  const editor = useEditor({
    extensions: [StarterKit],
    content: noteToEdit?.content || "<p>Empty Note</p>",
    editorProps: {
      attributes: {
        class: "new-note",
      },
    },
  });

  return (
    <>
      <MenuBar editor={editor} />
      <input
        className="title-input"
        maxLength={200}
        type="text"
        placeholder="Title"
        required
        value={currentTitle}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <EditorContent className="editor-content" editor={editor} />
      <div className="action-buttons">
        <button
          onClick={() => {
            noteToEdit = {
              id: noteId || uuidv4(),
              title: currentTitle || "New Note",
              content: editor?.getHTML() || "Empty Note",
              createdAt: noteToEdit.createdAt,
              tag: noteToEdit.tag,
            };
            const currentNotes = getItem() || [];
            const index = currentNotes.findIndex(
              (note: Note) => note.id === noteId
            );
            currentNotes.splice(index, 1);
            setItem([...currentNotes, noteToEdit]);
            navigate("/");
          }}
          className="create-btn"
        >
          Save Changes
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
