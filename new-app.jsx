import { useState, useMemo } from "react";
import products from "./data.json";

export default function App() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) return products;

    try {
      const regex = new RegExp(query, "i");

      return products.filter((item) => {
        return regex.test(item.code) || regex.test(item.name) || regex.test(item.name2);
      });
    } catch (err) {
      return [];
    }
  }, [query]);

  return (
    <div style={styles.container}>
      <h1>Product Price Search</h1>

      <input type="text" placeholder="Enter RegExp search..." value={query} onChange={(e) => setQuery(e.target.value)} style={styles.input} />

      <p>
        Example:
        <code> Bosch </code>,<code> 5.5x100 </code>,<code> ^6949 </code>
      </p>

      <div style={styles.resultInfo}>Found {results.length} item(s)</div>

      <div style={styles.grid}>
        {results.map((item, index) => (
          <div key={index} style={styles.card}>
            <h3>{item.name}</h3>

            <p>
              <strong>Code:</strong> {item.code}
            </p>

            <p>{item.name2}</p>

            <table style={styles.table}>
              <tbody>
                <tr>
                  <td>AA</td>
                  <td>{item.AA}</td>
                </tr>
                <tr>
                  <td>AB</td>
                  <td>{item.AB}</td>
                </tr>
                <tr>
                  <td>BA</td>
                  <td>{item.BA}</td>
                </tr>
                <tr>
                  <td>BB</td>
                  <td>{item.BB}</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>{item.cost}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {query && results.length === 0 && <div style={{ color: "red", marginTop: 20 }}>No results found or invalid RegExp</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
    maxWidth: 1200,
    margin: "0 auto",
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  resultInfo: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 15,
    background: "#fafafa",
  },
  table: {
    width: "100%",
    marginTop: 10,
  },
};
