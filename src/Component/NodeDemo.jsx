import React, { useState } from "react";

function NodeDemo() {
  const [nodes, setNodes] = useState([]);

  const addNode = () => {
    const newNode = { id: nodes.length + 1, label: `Node ${nodes.length + 1}` };
    setNodes([...nodes, newNode]);
  };

  return (
    <div>
      <button
        onClick={addNode}
        className="px-4 py-2 bg-purple-500 text-white rounded mb-3"
      >
        Add Node
      </button>
      <div className="flex gap-3 flex-wrap">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="px-4 py-2 bg-purple-100 border rounded shadow"
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NodeDemo;
