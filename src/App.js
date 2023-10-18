import { useState } from "react";

import "./App.css";
import data from "./data.json";

function App() {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="App">
      <div className="search-bar">
        <h1>ค้นหาราคาสินค้า</h1>
        <h3>อัพเดท 18/10/66</h3>
        <input
          type="text"
          class="searchbox"
          placeholder="พิมพ์รหัสสินค้า หรือ ชื่อสินค้า"
          onChange={(event) => {
            setKeyword(event.target.value.replaceAll(" ", ".*"));
          }}
        />
      </div>
      <div className="result">
        {data
          .filter((d) => keyword.length > 1 && (d.name.search(keyword) >= 0 || d.code === keyword))
          .map((d, index) => {
            return (
              <div key={`${d.code}-${d.unit}-${d.price}-${index}`} className="result-card">
                <h3 className="result-card-code">{d.code}</h3>
                <h2 className="result-card-name">{d.name}</h2>
                <h2 className="result-card-price">สด รับเอง {parseFloat(d.AA).toLocaleString()}</h2>
                <h2 className="result-card-price">สด ส่งให้ {parseFloat(d.AB).toLocaleString()}</h2>
                <h2 className="result-card-price">เชื่อ รับเอง {parseFloat(d.BA).toLocaleString()}</h2>
                <h2 className="result-card-price">เชื่อ ส่งให้ {parseFloat(d.BB).toLocaleString()}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
