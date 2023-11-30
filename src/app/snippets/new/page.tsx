"use client";
import { createSnippet } from "./createSnippet";
import { db } from "@/db";
import { useState, useEffect } from "react";

interface Snippet {
  id: number;
  title: string;
  code: string;
  createdAt: Date;
}

export default function NewSnippetPage({
  initialSnippets,
}: {
  initialSnippets: Snippet[];
}) {
  const [snippets, setSnippets] = useState<Snippet[]>(initialSnippets);

  useEffect(() => {
    const fetchSnippets = async () => {
      const allSnippets = await db.snippet.findMany();
      setSnippets(allSnippets);
    };

    fetchSnippets();
  }, []);

  return (
    <div>
      <form action={createSnippet}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap 4">
            <label className="w-12" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              id="title"
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex gap 4">
            <label className="w-12" htmlFor="code">
              Code
            </label>
            <textarea
              name="code"
              id="code"
              className="border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="rounded p-2 bg-blue-200">
            Create
          </button>
        </div>
      </form>
      {snippets.map((snippet) => (
        <div key={snippet.id} className="border m-4 p-4">
          <h2 className="text-gray-800">{snippet.title}</h2>
          <pre className="bg-gray-200 p-4">{snippet.code}</pre>
          <h4 className="text-gray-900">
            {snippet.createdAt.toLocaleString()}
          </h4>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const snippets = await db.snippet.findMany();
  return { props: { initialSnippets: snippets } };
}
