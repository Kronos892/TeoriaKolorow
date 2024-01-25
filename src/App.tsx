import ColorFilter from "./components/Color selector/ColorFilter";
import "./app.css";
import { useEffect, useState } from "react";
import PaletesDisplay from "./components/Paletes/PalettesDisplay";

export default function App() {
  const tools = ["Color selection tool", "Your paletes"];

  const [selectedTool, setSelectedTool] = useState(
    localStorage.getItem("selectedTool") || "Color selection tool"
  );

  useEffect(() => {
    localStorage.setItem("selectedTool", selectedTool);
  });

  const renderPage = () => {
    switch (selectedTool) {
      case "Color selection tool":
        return <ColorFilter />;
      case "Your paletes":
        return <PaletesDisplay />;
    }
  };

  return (
    <>
      <>
        <div className="navbar">
          <div className="navbar-brand">
            <img
              src="/ColorCraftLogo.svg"
              alt="ColorCraft Logo"
              className="navbar-logo"
            />
            <span>ColorCraft</span>
          </div>
          <nav className="nav">
            {tools.map((tool) => (
              <a
                key={tool}
                className={
                  selectedTool === tool ? "nav-item active" : "nav-item"
                }
                onClick={() => {
                  setSelectedTool(tool);
                }}
              >
                {tool}
              </a>
            ))}
          </nav>
        </div>
      </>
      {renderPage()}
    </>
  );
}
