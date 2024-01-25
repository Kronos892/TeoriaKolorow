import { useAtom } from "jotai";
import { palettesAtom } from "../paletteState";

export default function PalettesDisplay() {
  const [palettes] = useAtom(palettesAtom);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Your paletes</h1>
        {palettes.length === 0 ? <h2>Curently you have no paletes</h2> : null}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {palettes.map((palette) => (
            <div
              key={palette.name}
              style={{
                backgroundColor: "#fefffe",
                width: "#0caba8",
                margin: "10px",
                padding: "15px",
                fontSize: "#0caba8",
                color: "#b2b7bf",
                borderRadius: "5px",
                textAlign: "left",
                WebkitBoxShadow: "-10px 10px 50px 0px rgba(66, 68, 90, 0.39)",
                MozBoxShadow: "-10px 10px 50px 0px rgba(66, 68, 90, 0.39)",
                boxShadow: "-10px 10px 50px 0px rgba(66, 68, 90, 0.39)",
              }}
            >
              <div>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {palette.colors.map((color) => (
                    <div
                      key={color}
                      style={{
                        width: "1fr",
                        height: "100%",
                        backgroundColor: color,
                      }}
                    ></div>
                  ))}
                </div>
                <div style={{ paddingTop: "5px" }}>{palette.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
