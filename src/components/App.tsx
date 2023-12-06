import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function App() {
  const navigate = useNavigate();

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
          <p className="notes-count">6 notes</p>
        </div>
        <ul className="notes-list">
          <li className="note">
            <div className="note-title">
              <span className="note-title-text">Note 1</span>
              <span className="note-title-buttons">
                <button className="note-button note-edit">&#9998;</button>
                <button className="note-button note-delete">&#128465;</button>
              </span>
            </div>
            <div className="note-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eget augue quam. Suspendisse feugiat eros dapibus, consequat
                magna vulputate, ultrices nunc. In hac habitasse platea
                dictumst. Cras consequat ac ipsum eu posuere. Praesent nulla
                elit, varius eget magna at, viverra auctor mi. Nullam
                sollicitudin ante erat, id vehicula urna dignissim nec. Nulla
                facilisi. Sed eget mauris condimentum, molestie justo eu,
                feugiat felis.
              </p>
            </div>
          </li>
          <li className="note">
            <div className="note-title">
              <span className="note-title-text">Note 1</span>
              <span className="note-title-buttons">
                <button className="note-button note-edit">&#9998;</button>
                <button className="note-button note-delete">&#128465;</button>
              </span>
            </div>
            <div className="note-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eget augue quam. Suspendisse feugiat eros dapibus, consequat
                magna vulputate, ultrices nunc. In hac habitasse platea
                dictumst. Cras consequat ac ipsum eu posuere. Praesent nulla
                elit, varius eget magna at, viverra auctor mi. Nullam
                sollicitudin ante erat, id vehicula urna dignissim nec. Nulla
                facilisi. Sed eget mauris condimentum, molestie justo eu,
                feugiat felis.
              </p>
            </div>
          </li>
          <li className="note">
            <div className="note-title">
              <span className="note-title-text">Note 2</span>
              <span className="note-title-buttons">
                <button className="note-button note-edit">&#9998;</button>
                <button className="note-button note-delete">&#128465;</button>
              </span>
            </div>
            <div className="note-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eget augue quam. Suspendisse feugiat eros dapibus, consequat
                magna vulputate, ultrices nunc. In hac habitasse platea
                dictumst. Cras consequat ac ipsum eu posuere. Praesent nulla
                elit, varius eget magna at, viverra auctor mi. Nullam
                sollicitudin ante erat, id vehicula urna dignissim nec. Nulla
                facilisi. Sed
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
