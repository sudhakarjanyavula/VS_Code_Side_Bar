import { useState } from "react";

function Folder({ explorer }) {
  console.log(explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visibile: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visibile: true,
      isFolder,
    });
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      setShowInput({ ...showInput, visibile: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5, textAlign: "left" }}>
        <div>
          <span
            style={{ cursor: "pointer" }}
            className="folder"
            onClick={() => setExpand(!expand)}
          >
            📁 {explorer?.name}
            <button
              onClick={(e) => handleNewFolder(e, true)}
              style={{
                marginLeft: 14,
                width: "48px",
                backgroundColor: "lightgoldenrodyellow",
                cursor: "pointer",
              }}
            >
              📁+
            </button>
            <button
              onClick={(e) => handleNewFolder(e, false)}
              style={{
                marginLeft: 14,
                width: "48px",
                backgroundColor: "lightblue",
                cursor: "pointer",
              }}
            >
              {" "}
              📄+{" "}
            </button>
          </span>
        </div>
        <div style={{ display: expand ? "block" : "none", marginLeft: 22 }}>
          {showInput.visibile && (
            <div className="inputbox">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                onKeyDown={addFolder}
                className="input"
                type="text"
                onBlur={() => setShowInput({ ...showInput, visibile: false })}
                autoFocus
              />
            </div>
          )}
          {explorer?.items?.map((exp) => {
            return <Folder explorer={exp} key={exp?.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span
        className="file"
        style={{
          marginTop: 5,
          paddingLeft: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        📄 {explorer?.name}
      </span>
    );
  }
}

export default Folder;
