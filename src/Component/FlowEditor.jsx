import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function FlowEditorApp() {
  // reactflow managed state (recommended hooks)
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // UI state
  const [nextNodeIndex, setNextNodeIndex] = useState(1);
  const [nodeType, setNodeType] = useState("default");
  const [usePostsForLabels, setUsePostsForLabels] = useState(true);

  // read cached posts safely from localStorage (Task1/Task2 optional)
  const cachedPosts = useMemo(() => {
    try {
      const raw = localStorage.getItem("cachedPosts");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.data)) return parsed.data;
      return [];
    } catch (e) {
      console.warn("Failed to read cachedPosts from localStorage", e);
      return [];
    }
  }, []);

  const makeId = useCallback((i) => `node_${i}`, []);

 
  const onConnect = useCallback(
    (connection) => {
    
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );


  const addNode = useCallback(() => {
    const index = nextNodeIndex;
    const id = makeId(index);

   
    let label;
    if (usePostsForLabels && cachedPosts.length >= index) {
      const post = cachedPosts[index - 1]; // zero-based index
      label = `${post.id} — ${String(post.title).slice(0, 60)}`;
    } else {
      label = `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} ${index}`;
    }

  
    const position = {
      x: 40 + (index % 10) * 60,
      y: 40 + Math.floor(index / 10) * 60,
    };

    const newNode = {
      id,
      type: "default", 
      position,
      draggable: true,
      data: { label },
    };

    setNodes((nds) => nds.concat(newNode));
    setNextNodeIndex((n) => n + 1);
  }, [nextNodeIndex, makeId, cachedPosts, nodeType, usePostsForLabels, setNodes]);


  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setNextNodeIndex(1);
  }, [setNodes, setEdges]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow">
        
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">Task 4 — React Flow Editor</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={addNode}
                className="px-3 py-1 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700"
              >
                Add Node
              </button>

              <button
                onClick={clearCanvas}
                className="px-3 py-1 bg-red-500 text-white rounded shadow-sm hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </div>

        
          <div className="flex gap-4">
           
            <aside className="w-64 bg-gray-50 p-3 rounded border">
              <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">Node type</label>
                <select
                  value={nodeType}
                  onChange={(e) => setNodeType(e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="default">Default</option>
                  <option value="api">API</option>
                  <option value="process">Process</option>
                  <option value="decision">Decision</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={usePostsForLabels}
                    onChange={(e) => setUsePostsForLabels(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span>Use cached posts for labels</span>
                </label>
              </div>

              <div className="mb-2 text-xs text-gray-600">
                Cached posts: <strong>{cachedPosts.length}</strong>
              </div>

              <div className="text-xs text-gray-500">
                - Click &quot;Add Node&quot; to create a node. <br />
                - Drag from a node handle to another to create an edge. <br />
                - Drag nodes to reposition them.
              </div>
            </aside>

          
            <div className="flex-1 h-[640px] border rounded">
              <ReactFlowProvider>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitView
                  style={{ width: "100%", height: "100%" }}
                >
                  <Background gap={12} />
                  <Controls />
                  <MiniMap />
                </ReactFlow>
              </ReactFlowProvider>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600 flex items-center gap-6">
            <div>
              Nodes: <strong>{nodes.length}</strong>
            </div>
            <div>
              Edges: <strong>{edges.length}</strong>
            </div>
            <div>
              Next node ID: <strong>node_{nextNodeIndex}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}