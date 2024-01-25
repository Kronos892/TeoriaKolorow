import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import calculationHSL from "./Calculation.tsx";

interface Props {
  hue: number;
  saturation: number;
  lightness: number;
  main?: boolean;
}

export default function Selector({ hue, saturation, lightness, main }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [adjustedSaturation, setAdjustedSaturation] = useState(saturation);

  useEffect(() => {
    if (saturation > 100) {
      setAdjustedSaturation(saturation - 100);
    } else if (saturation < 0) {
      setAdjustedSaturation(saturation + 100);
    } else setAdjustedSaturation(saturation);
  }, [saturation]);

  const radius = 170;

  // Przekształcanie HSL na współrzędne x, y
  useEffect(() => {
    const position = calculationHSL(hue, adjustedSaturation, radius);
    setPosition(position);
  }, [hue, adjustedSaturation, radius]);

  const backgroundColor = `hsl(${hue}, ${adjustedSaturation}%, ${lightness}%)`;
  const border = `${main === true ? "3px" : "2px"} solid ${
    lightness > 75 ? "black" : "white"
  }`;

  const selectorStyle = {
    position: "absolute" as const,
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    backgroundColor,
    border,
    transform: "translate(-50%, -50%)",
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: "pointer",
    pointerEvents: "none",
  };

  return <Box sx={selectorStyle} />;
}