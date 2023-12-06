import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import { Note, useLocalStorage } from "./useLocalStorage";
import { FormEvent } from "react";

function App() {
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

  return (
    <div className="app-container">
      <div className="search-container">
        <input
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
            {getItem()?.length === 0 || getItem()?.length === undefined
              ? 0
              : getItem()?.length}{" "}
            Notes
          </p>
        </div>
        <ul className="notes-list">
          {getItem()?.map((note: Note) => (
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
