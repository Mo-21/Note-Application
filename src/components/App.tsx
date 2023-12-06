import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import { Note, useLocalStorage } from "./useLocalStorage";
import { FormEvent, useEffect, useMemo, useState } from "react";

function App() {
  const [noteItems, setNoteItems] = useState<Note[]>([]);
  const [query, setQuery] = useState<string>("");
  const [taggedNotes, setTaggedNotes] = useState<Note[]>([]);

  const navigate = useNavigate();
  const { getItem, setItem } = useLocalStorage("Notes");

  const removeHTML = (html: string) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const handleDeleteNote = (e: FormEvent) => {
    e.preventDefault();
    const currentNotes = getItem() || [];
    const index = currentNotes.findIndex(
      (note: Note) => note.id === e.currentTarget.getAttribute("note-key")
    );
    currentNotes.splice(index, 1);
    setItem(currentNotes);
    window.location.reload();
  };

  //handle searching for notes
  useEffect(() => {
    setNoteItems(getItem() || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems = useMemo(() => {
    if (!query) return noteItems;
    return noteItems.filter((note: Note) => {
      return (
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, noteItems]);

  const handleTagFiltration = (e: FormEvent) => {
    const currentTag = e.currentTarget.textContent?.split("#")[1].trim();
    console.log(currentTag);
    if (!currentTag) return;

    const newTaggedNotes = noteItems.reduce((acc: Note[], note: Note) => {
      if (note.tag.includes(currentTag)) {
        acc.push(note);
      }
      return acc;
    }, []);

    setTaggedNotes(newTaggedNotes);
    console.log(newTaggedNotes);
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for notes..."
          type="text"
          className="search-input"
        />
      </div>
      <div className="button-container">
        <button
          onClick={() => {
            navigate("/new");
          }}
          className="button new-note-button"
        >
          New Note
        </button>
      </div>
      <div className="notes-container">
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          <p className="notes-count">
            {noteItems.length === 0 || noteItems.length === undefined
              ? 0
              : noteItems.length}{" "}
            Notes
          </p>
        </div>
        <ul className="notes-list">
          {(taggedNotes.length > 0
            ? taggedNotes
            : query
            ? filteredItems
            : noteItems
          ).map((note: Note) => (
            <li key={note.id} className="note">
              <div className="note-title">
                <span className="note-title-text">{note.title}</span>
                <span className="note-title-buttons">
                  <button
                    onClick={() => navigate(`/edit/${note.id}`)}
                    className="note-button note-edit"
                  >
                    &#9998;
                  </button>
                  <button
                    onClick={handleDeleteNote}
                    note-key={note.id}
                    className="note-button note-delete"
                  >
                    &#128465;
                  </button>
                </span>
              </div>
              <div className="note-body">
                <p>{removeHTML(note.content)}</p>
              </div>

              <div>
                {Array.isArray(note?.tag) &&
                  note.tag.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        onClick={handleTagFiltration}
                        className="tags-place"
                      >{`#${tag} `}</div>
                    );
                  })}
              </div>

              <div className="note-date">
                <p>{note.createdAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
