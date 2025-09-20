import React, { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState([]);
  const [cachedData, setCachedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch data");

      const result = await res.json();
      setData(result);
      setCachedData(result); // cache
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run once
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh Data (clear cache)
  const refreshData = () => {
    setCachedData(null);
    fetchData();
  };

  // Filtered Data
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch Data
        </button>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Refresh Data
        </button>
        <input
          type="text"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
      </div>

      {loading && <p className="text-yellow-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {filteredData.slice(0, 10).map((item) => (
          <li
            key={item.id}
            className="border p-3 rounded shadow-sm bg-gray-50"
          >
            <h2 className="font-semibold">{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;
