import { useState, useEffect } from "react";
import ColorWheel from "./ColorWheel";
import ColorInput from "./ColorInput";
import AdditionalColorInputs from "./AdditionalColorInput";

interface Props {
  scheme: string;
  model: string;
  distance: number;
  complement: boolean;
}

type HSL = {
  Hue: number;
  Saturation: number;
  Lightness: number;
};

export default function ColorsLayout({
  scheme,
  model,
  distance,
  complement,
}: Props) {
  const [HSL, setHSl] = useState<HSL>({
    Hue: parseInt(localStorage.getItem("HSL.Hue") || "180"),
    Saturation: parseInt(localStorage.getItem("HSL.Saturation") || "50"),
    Lightness: parseInt(localStorage.getItem("HSL.Lightness") || "50"),
  });

  useEffect(() => {
    localStorage.setItem("HSL.Hue", HSL.Hue.toString());
    localStorage.setItem("HSL.Saturation", HSL.Saturation.toString());
    localStorage.setItem("HSL.Lightness", HSL.Lightness.toString());
  }, [HSL]);

  const handleHSL = (newHSL: HSL) => {
    setHSl(newHSL);
  };

  const renderAdditionalColors = () => {
    switch (scheme) {
      case "Monochromatic":
        return (
          <>
            <AdditionalColorInputs
              Hue={HSL.Hue}
              Saturation={HSL.Saturation - 40}
              Lightness={HSL.Lightness}
            />
            <AdditionalColorInputs
              Hue={HSL.Hue}
              Saturation={HSL.Saturation - 20}
              Lightness={HSL.Lightness}
            />
            <ColorInput onHSLChange={handleHSL} />
            <AdditionalColorInputs
              Hue={HSL.Hue}
              Saturation={HSL.Saturation + 20}
              Lightness={HSL.Lightness}
            />
            <AdditionalColorInputs
              Hue={HSL.Hue}
              Saturation={HSL.Saturation + 40}
              Lightness={HSL.Lightness}
            />
          </>
        );
      case "Contrast":
        return (
          <>
            <ColorInput onHSLChange={handleHSL} />
            <AdditionalColorInputs
              Hue={HSL.Hue + 180}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
          </>
        );
      case "Light contrast":
        return (
          <>
            <AdditionalColorInputs
              Hue={HSL.Hue + 180 - distance}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
            <ColorInput onHSLChange={handleHSL} />
            <AdditionalColorInputs
              Hue={HSL.Hue + 180 + distance}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
          </>
        );
      case "Double contrast":
        return (
          <>
            <AdditionalColorInputs
              Hue={HSL.Hue + 180}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
            <ColorInput onHSLChange={handleHSL} />
            <AdditionalColorInputs
              Hue={HSL.Hue + distance}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
            <AdditionalColorInputs
              Hue={HSL.Hue + 180 + distance}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
          </>
        );
      case "Analogic":
        return (
          <>
            <AdditionalColorInputs
              Hue={HSL.Hue - distance}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />
            <ColorInput onHSLChange={handleHSL} />
            <AdditionalColorInputs
              Hue={HSL.Hue + distance}
              Saturation={HSL.Saturation}
              Lightness={HSL.Lightness}
            />

            {complement ? (
              <AdditionalColorInputs
                Hue={HSL.Hue + 180}
                Saturation={HSL.Saturation}
                Lightness={HSL.Lightness}
              />
            ) : null}
          </>
        );
    }
  };

  const marginTop =
    scheme === "Light contrast" ||
    scheme === "Double contrast" ||
    scheme === "Analogic"
      ? "-68px"
      : "-12px";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop,
        }}
      >
        <ColorWheel
          hue={HSL.Hue}
          saturation={HSL.Saturation}
          lightness={HSL.Lightness}
          scheme={scheme}
          model={model}
          distance={distance}
          complement={complement}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {renderAdditionalColors()}
      </div>
    </>
  );
}
