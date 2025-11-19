import React, { useEffect, useState } from "react";
import PostsViewer from "./Component/PostsViewer";
import CachedPostsViewer from "./Component/CachedPostsViewer";
import SearchableCachedPostsViewer from "./Component/SearchableCachedPostsViewer";
import FlowEditorApp from "./Component/FlowEditor";
export default function App() {
  const [activeTask, setActiveTask] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {!activeTask ? (
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4">Data Fetching, Caching & Dynamic Flows</h1>
          <p className="text-sm text-gray-500 mb-6">
            Select a task to open the respective demo.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTask(1)}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
            >
              Task 1
            </button>
            <button
              onClick={() => setActiveTask(2)}
              className="px-5 py-3 bg-orange-950 hover:bg-pink-700 text-white rounded-lg shadow"
            >
              Task 2
            </button>
            <button
              onClick={() => setActiveTask(3)}
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
            >
              Task 3
            </button>
            <button
              onClick={() => setActiveTask(4)}
              className="px-5 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg shadow"
            >
              Task 4
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          {activeTask === 1 && <PostsViewer onClose={() => setActiveTask(null)} />}
          {activeTask === 2 && <CachedPostsViewer title="Task 2" onClose={() => setActiveTask(null)} />}
          {activeTask === 3 && <SearchableCachedPostsViewer title="Task 3" onClose={() => setActiveTask(null)} />}
           {activeTask === 4 && <FlowEditorApp title="Task 4" onClose={() => setActiveTask(null)} />} 
        </div>
      )}
    </div>
  );
}

function Placeholder({ title, onClose }) {
return (
<div className="bg-white shadow-lg rounded-2xl p-6">
<div className="flex items-center justify-between mb-4">
<h2 className="text-xl font-semibold">{title}</h2>
<button
onClick={onClose}
className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
>
Back
</button>
</div>
<p className="text-gray-600">{title} content will be implemented here.</p>
</div>
);
}