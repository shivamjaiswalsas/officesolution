import React, { useState, useEffect } from "react";

function CachedPostsViewer({ onClose }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const cached = localStorage.getItem("cachedPosts");
    if (cached) {
      setPosts(JSON.parse(cached));
    } else {
      fetchPosts();
    }
  }, []);

  async function fetchPosts(force = false) {
    if (!force && posts.length > 0) return; 

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setPosts(data);
      localStorage.setItem("cachedPosts", JSON.stringify(data));
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Task 2 — Cached Posts</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          >
            Back
          </button>
          <button
            onClick={() => fetchPosts(true)}
            className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-md text-sm"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-600"></div>
          <span className="ml-4 text-gray-600">Loading posts...</span>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-md">
          <h3 className="text-red-700 font-medium">Error fetching posts</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Body</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{p.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CachedPostsViewer;
