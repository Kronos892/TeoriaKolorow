import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import calculationHSL from "./CalculationHSL.ts";
import calculationRGB from "./CalculationRGB.ts";
import calculationCMY from "./CalculationCMY.ts";
import React from 'react';


interface Props {
  hue: number;
  saturation: number;
  lightness: number;
  main?: boolean;
  selectedModel?: string;
}

export default function Selector({ hue, saturation, lightness, main, selectedModel }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [adjustedSaturation, setAdjustedSaturation] = useState(saturation);

  useEffect(() => {
    if (saturation > 100) {
      setAdjustedSaturation(saturation - 100);
    } else if (saturation < 0) {
      setAdjustedSaturation(saturation + 100);
    } else {
      setAdjustedSaturation(saturation);
    }
  }, [saturation]);

  const radius = 170;

  // Przekształcanie HSL na współrzędne x, y
  useEffect(() => {
    let newPosition;

    switch (selectedModel) {
      case 'HSL':
        newPosition = calculationHSL(hue, adjustedSaturation, radius);
        console.log(calculationHSL);
        break;
      case 'RGB':
        newPosition = calculationRGB({ red: hue, green: saturation, blue: lightness });
        console.log(calculationRGB);
        break;
      case "CMY":
        newPosition = calculationCMY( {cyan:hue, magenta: saturation, yellow:lightness});
        console.log(calculationCMY);
        break;
      default:
        newPosition = calculationHSL(hue, adjustedSaturation, radius);
        console.log(selectedModel);
    }

    console.log(newPosition);
    setPosition(newPosition);
  }, [hue, saturation, lightness, selectedModel, adjustedSaturation, radius]);

  const backgroundColor = `hsl(${hue}, ${adjustedSaturation}%, ${lightness}%)`;
  const border = `${main === true ? "3px" : "2px"} solid ${lightness > 75 ? "black" : "white"
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