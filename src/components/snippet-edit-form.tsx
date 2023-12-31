"use client";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { editSnippet } from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        onChange={handleEditorChange}
        height="40vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="mt-2 p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
