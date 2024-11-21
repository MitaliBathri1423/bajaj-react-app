import { useState } from "react";
import axios from "axios";

// const res = await axios.post(
//   "https://bajaj-node-project.onrender.com",
//   parsedInput
// );

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filters, setFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://bajaj-node-project-1.onrender.com/bfhl",
        parsedInput
      );
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API Error");
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    let filteredData = {};
    if (filters.includes("Alphabets"))
      filteredData.alphabets = response.alphabets;
    if (filters.includes("Numbers")) filteredData.numbers = response.numbers;
    if (filters.includes("Highest Lowercase Alphabet"))
      filteredData.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet;
    return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>BFHL Challenge</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
        rows={5}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginBottom: "20px" }}>
        Submit
      </button>
      <div>
        <h3>Filters</h3>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={(e) =>
              setFilters((prev) =>
                e.target.checked
                  ? [...prev, e.target.value]
                  : prev.filter((f) => f !== e.target.value)
              )
            }
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={(e) =>
              setFilters((prev) =>
                e.target.checked
                  ? [...prev, e.target.value]
                  : prev.filter((f) => f !== e.target.value)
              )
            }
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest Lowercase Alphabet"
            onChange={(e) =>
              setFilters((prev) =>
                e.target.checked
                  ? [...prev, e.target.value]
                  : prev.filter((f) => f !== e.target.value)
              )
            }
          />
          Highest Lowercase Alphabet
        </label>
      </div>
      <h3>Response:</h3>
      {renderResponse()}
    </div>
  );
}

export default App;
