import { Box } from "@mui/material";
import Selector from "./Selector";

interface Props {
  hue: number;
  saturation: number;
  lightness: number;
  scheme: string;
  model: string;
  distance: number;
  complement: boolean;
}

export default function ColorWheel({
  hue,
  saturation,
  lightness,
  scheme,
  model,
  distance,
  complement,
}: Props) {
  const renderSelectors = () => {
    switch (scheme) {
      case "Monochromatic":
        return (
          <>
            <Selector
              hue={hue}
              saturation={saturation - 40}
              lightness={lightness}
            />
            <Selector
              hue={hue}
              saturation={saturation - 20}
              lightness={lightness}
            />
            <Selector
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              main={true}
            />
            <Selector
              hue={hue}
              saturation={saturation + 20}
              lightness={lightness}
            />
            <Selector
              hue={hue}
              saturation={saturation + 40}
              lightness={lightness}
            />
          </>
        );
      case "Contrast":
        return (
          <>
            <Selector
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              main={true}
            />
            <Selector
              hue={hue + 180}
              saturation={saturation}
              lightness={lightness}
            />
          </>
        );
      case "Light contrast":
        return (
          <>
            <Selector
              hue={hue + 180 - distance}
              saturation={saturation}
              lightness={lightness}
            />
            <Selector
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              main={true}
            />
            <Selector
              hue={hue + 180 + distance}
              saturation={saturation}
              lightness={lightness}
            />
          </>
        );
      case "Double contrast":
        return (
          <>
            <Selector
              hue={hue + 180}
              saturation={saturation}
              lightness={lightness}
            />
            <Selector
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              main={true}
            />
            <Selector
              hue={hue + distance}
              saturation={saturation}
              lightness={lightness}
            />
            <Selector
              hue={hue + 180 + distance}
              saturation={saturation}
              lightness={lightness}
            />
          </>
        );
      case "Analogic":
        return (
          <>
            <Selector
              hue={hue - distance}
              saturation={saturation}
              lightness={lightness}
            />
            <Selector
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              main={true}
            />
            <Selector
              hue={hue + distance}
              saturation={saturation}
              lightness={lightness}
            />
            {complement ? (
              <Selector
                hue={hue + 180}
                saturation={saturation}
                lightness={lightness}
              />
            ) : null}
          </>
        );
    }
  };

  const calculateColor = (lightness: number): string => {
    if (lightness === 50) {
      return "transparent";
    } else if (lightness < 50) {
      const alpha = (0.01 + (50 - lightness) * 0.0198).toFixed(2);
      return `rgba(0, 0, 0, ${Math.min(1, Number(alpha))})`;
    } else {
      const alpha = (0.01 + (lightness - 50) * 0.0198).toFixed(2);
      return `rgba(255, 255, 255, ${Math.min(1, Number(alpha))})`;
    }
  };

  const backgroundColor = calculateColor(lightness);

  return (
    <Box position="relative">
      <img
        src={`/${model}ColorWheel.png`}
        alt="Color Wheel"
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          position: "absolute",
          top: "0",
          backgroundColor,
        }}
      ></div>
      {renderSelectors()}
    </Box>
  );
}
