import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}
import Link from "next/link";

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const snippet = await db.snippet.findFirst({
    where: { id: Number(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="bg-gray-900 p-5">
      <div className="flex m-4 justify-between items-center bg-gray-800 shadow-lg rounded-lg p-5">
        <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="px-4 py-2 border border-gray-600 rounded text-gray-300 bg-gray-700 hover:bg-gray-600"
          >
            Edit
          </Link>
          <button className="px-4 py-2 border border-gray-600 rounded text-gray-300 bg-gray-700 hover:bg-gray-600">
            Delete
          </button>
        </div>
      </div>
      <pre className="p-3 border border-gray-600 rounded bg-gray-700 mt-5 shadow-lg">
        <code className="text-sm text-gray-200">{snippet.code}</code>
      </pre>
    </div>
  );
}
