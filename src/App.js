import { useState } from "react";

import "./App.css";
import data from "./data.json";
function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="App">
      <div className="header">
        <h1>ค้นหาราคาสินค้า</h1>
        <h3>อัพเดท 29/06/67</h3>
        <div className="searchbar">
          <button className="clearButton" type="button" onClick={() => setKeyword("")}>
            ลบ
          </button>
          <input
            type="text"
            className="searchbox"
            placeholder="พิมพ์รหัสสินค้า หรือ ชื่อสินค้า"
            onFocus={() => setKeyword("")}
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value.replaceAll(" ", ".*"));
            }}
          />
        </div>
      </div>
      <div className="result">
        {data
          .filter((d) => {
            return keyword.length > 2 && (d.name2.toLowerCase().search(keyword.toLowerCase()) >= 0 || d.code === keyword);
          })
          .map((d, index) => {
            return (
              <div key={`${d.code}-${d.unit}-${d.price}-${index}`} className="result-card">
                <h3 className="result-card-code">{d.code}</h3>
                <h2 className="result-card-name">{d.name2}</h2>
                <h5 className="result-card-name">{d.name}</h5>
                <h2 className="result-card-price">
                  สด รับเอง {parseFloat(d.AA).toLocaleString()} / {parseFloat(d.AA2).toLocaleString()} ({d.unit})
                </h2>
                <h2 className="result-card-price">
                  สด ส่งให้ {parseFloat(d.AB).toLocaleString()} / {parseFloat(d.AB2).toLocaleString()} ({d.unit})
                </h2>
                <h2 className="result-card-price">
                  เชื่อ รับเอง {parseFloat(d.BA).toLocaleString()} / {parseFloat(d.BA2).toLocaleString()} ({d.unit})
                </h2>
                <h2 className="result-card-price">
                  เชื่อ ส่งให้ {parseFloat(d.BB).toLocaleString()} / {parseFloat(d.BB2).toLocaleString()} ({d.unit})
                </h2>
                {/* <h3>ทุน {parseFloat(d.cost).toLocaleString()}</h3> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
