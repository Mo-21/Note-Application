import { Editor } from "@tiptap/react";
import bold from "../assets/bold-svgrepo-com.svg";
import italic from "../assets/italic-svgrepo-com.svg";
import strike from "../assets/strike-svgrepo-com.svg";
import code from "../assets/code-svgrepo-com.svg";
import header from "../assets/gui-header-svgrepo-com.svg";
import orderedList from "../assets/ordered-list-svgrepo-com.svg";
import bulletList from "../assets/bullet-list-svgrepo-com.svg";
import { useState } from "react";

interface MenuBarProps {
  editor: Editor | null;
}

function MenuBar({ editor }: MenuBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="menu-container">
      <button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        className={editor?.isActive("bold") ? "is-active" : ""}
      >
        <img className="image" src={bold} alt="bold" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        className={editor?.isActive("italic") ? "is-active" : ""}
      >
        <img className="image" src={italic} alt="italic" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        className={editor?.isActive("strike") ? "is-active" : ""}
      >
        <img className="image" src={strike} alt="bold" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={editor?.isActive("code") ? "is-active" : ""}
      >
        <img className="image" src={code} alt="code" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={editor?.isActive("orderedList") ? "is-active" : ""}
      >
        <img className="image" src={orderedList} alt="orderedList" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={editor?.isActive("bulletList") ? "is-active" : ""}
      >
        <img className="image" src={bulletList} alt="bulletList" />
      </button>

      <div className="header-button-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }}
          className="header-dropdown-button"
        >
          <img className="image" src={header} alt="bold" />
        </button>

        {showDropdown && (
          <ul className="header-dropdown">
            <li
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 1 }).run();
                setShowDropdown(false);
              }}
            >
              H1
            </li>
            <li
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 2 }).run();
                setShowDropdown(false);
              }}
            >
              H2
            </li>
            <li
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 3 }).run();
                setShowDropdown(false);
              }}
            >
              H3
            </li>
            <li
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 4 }).run();
                setShowDropdown(false);
              }}
            >
              H4
            </li>
            <li
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 5 }).run();
                setShowDropdown(false);
              }}
            >
              H5
            </li>
            <li
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 6 }).run();
                setShowDropdown(false);
              }}
            >
              H6
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default MenuBar;
