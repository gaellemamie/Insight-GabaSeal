"use client";

import React, { useState, useRef, useEffect } from "react";
import { EditorContent, useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Node, mergeAttributes } from "@tiptap/core";
import mammoth from "mammoth";

// --- Signature Marker Extension ---
const SignatureMarker = Node.create({
  name: "signatureMarker",
  group: "inline",
  inline: true,
  draggable: true,
  atom: true,

  parseHTML() {
    return [{ tag: "span[data-type='signature-marker']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "signature-marker",
        style:
          "display:inline-block;padding:2px 6px;background:#4CAF50;color:white;border-radius:4px;cursor:move;",
      }),
      "✍ Signature",
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SignatureMarkerComponent);
  },
});

const SignatureMarkerComponent = ({ node, updateAttributes }: any) => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 6px",
        background: "#4CAF50",
        color: "white",
        borderRadius: "4px",
        cursor: "move",
      }}
      draggable
      onDragEnd={() => {
        // In a real app, update position here if needed
      }}
    >
      ✍ Signature
    </span>
  );
};

export default function DocumentEditor() {
  const [markers, setMarkers] = useState<{ id: number; position: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, SignatureMarker],
    content: "<p>Upload a DOCX to start editing...</p>",
    immediatelyRender: false,
  });

  const handleAddMarker = () => {
    if (!editor) return;
    const pos = editor.state.selection.from;
    setMarkers((prev) => [...prev, { id: Date.now(), position: pos }]);
    editor
      .chain()
      .insertContentAt(pos, { type: "signatureMarker" })
      .run();
  };

  const handleImportDocx = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    editor?.commands.setContent(`<p>${value.replace(/\n/g, "</p><p>")}</p>`);
  };

  const handleSave = () => {
    if (!editor) return;
    console.log("Document HTML:", editor.getHTML());
    console.log("Markers:", markers);
    alert("Document and markers logged in console");
  };

  if (!mounted) return null;

  return (
    <div className="p-4 space-y-4 border rounded">
      <div className="flex space-x-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Import DOCX
        </button>
        <button
          onClick={handleAddMarker}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Signature Marker
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Save
        </button>
      </div>

      <input
       aria-label="file-input"
        type="file"
        accept=".docx"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImportDocx}
      />

      <div className="border p-2 min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
