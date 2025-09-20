import React, { useEffect, useState } from "react";

const PostsViewer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    let cancelled = false;
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setPosts(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE) || 1;
  const start = (page - 1) * PAGE_SIZE;
  const paginated = posts.slice(start, start + PAGE_SIZE);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          <span className="ml-4 text-gray-600">Loading posts...</span>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-md">
          <h3 className="text-red-700 font-medium">Error fetching posts</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                    Body
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{p.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {p.body}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages} | Total posts: {posts.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsViewer;
