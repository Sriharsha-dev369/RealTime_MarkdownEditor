"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {Toolbar} from "./Toolbar";

export default function Tiptap({
  storageKey = "tiptap-content",
}: {
  storageKey?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Explicitly configure Heading to support levels 1, 2, and 3
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const json = JSON.parse(saved);
          editor.commands.setContent(json);
        } catch {
          editor.commands.setContent(saved);
        }
      } else {
        editor.commands.setContent("<p>start writing...<p>");
      }
    } catch (e) {
      console.error("load error", e);
    }
  }, [editor, storageKey]);

  const saveToStorage = () => {
    if (!editor) return;

    const json = editor.getJSON();
    localStorage.setItem(storageKey, JSON.stringify(json));
  };

  const clearStorage = () => {
    localStorage.removeItem(storageKey);
    if (editor) editor.commands.clearContent();
  };

  if (!editor) return null;

  return (
    <div className="prose max-w-full">
      {/* Toolbar */}
      <div className="mb-2 flex gap-2">
        <Toolbar editor={editor} />

        <button onClick={saveToStorage} title="Save">
          Save
        </button>

        <button onClick={clearStorage} title="Clear">
          Clear
        </button>
      </div>
      <div className="border rounded p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
