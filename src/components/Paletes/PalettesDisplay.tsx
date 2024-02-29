import { useAtom } from "jotai";
import { palettesAtom } from "../paletteState";
import React, { useRef, MutableRefObject, useState } from "react";
import html2canvas from "html2canvas";

type PaletteDisplayProps = {};

export default function PalettesDisplay({ }: PaletteDisplayProps) {
  const [palettes] = useAtom(palettesAtom);
  const paletteContainerRef = useRef<(HTMLDivElement | null)[]>([]);
  const [exporting, setExporting] = useState(false);

  const handleExportClick = async (paletteIndex: number) => {
    const paletteToExport = palettes[paletteIndex];

    if (paletteContainerRef.current[paletteIndex] && paletteToExport && !exporting) {
      const paletteElement = paletteContainerRef.current[paletteIndex];
      const exportButton = paletteElement?.querySelector("button");

      if (exportButton) {
        exportButton.style.display = "none";
        setExporting(true);
        if (paletteElement){
          const canvas = await html2canvas(paletteElement);
          canvas.toBlob((blob) => {
            if (blob) {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = `${paletteToExport.name}_palette.png`;
              link.click();
              URL.revokeObjectURL(link.href);
            }
            exportButton.style.display = "block";
            setExporting(false);
          }, 'image/png');
        }
      }
    }
  };

  return (
    <>
      <div
        ref={(el) => {
          if (el) paletteContainerRef.current[palettes.length] = el;
        }}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Your palettes</h1>
        {palettes.length === 0 ? (
          <h2>Currently you have no palettes</h2>
        ) : null}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {palettes.map((palette, index) => (
            <div
              key={palette.name}
              style={{
                backgroundColor: "#fefffe",
                width: "200px",
                margin: "10px",
                padding: "15px",
                fontSize: "16px",
                color: "#b2b7bf",
                borderRadius: "5px",
                textAlign: "left",
                WebkitBoxShadow: "-10px 10px 50px 0px rgba(66, 68, 90, 0.39)",
                MozBoxShadow: "-10px 10px 50px 0px rgba(66, 68, 90, 0.39)",
                boxShadow: "-10px 10px 50px 0px rgba(66, 68, 90, 0.39)",
              }}
              ref={(el) => (paletteContainerRef.current[index] = el)}
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
              <button
                style={{
                  margin: "5px",
                }}
                onClick={() => handleExportClick(index)}
              >
                Export to PNG
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}