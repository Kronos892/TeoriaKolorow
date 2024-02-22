import { useState, useEffect } from "react";
import { Box, TextField, Snackbar, Button } from "@mui/material";
import styled from "styled-components";
import chroma from "chroma-js";
import FormDialog from "./Dialog";
import React from "react";

interface Props {
  Hue: number;
  Saturation: number;
  Lightness: number;
}

const CustomButton = styled(Button)`
  display: inline-block;
  position: relative;
  transition: 0.5s;
  width: 150px;
  height: 75px;
  margin: 8px;
  border-radius: 5px;
  font-family: Helvetica;
  font-size: 12px;

  &:after {
    content: "";
    font-family: "Font Awesome 6 Free";
    font-size: 16px
    font-weight: 900;
    position: absolute;
    opacity: 0;
    top: 24px;
    right: 0;
    transition: 0.5s;
    transform: rotate(-45deg);
    z-index: 1;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover::after {
    opacity: 1;
    right: 30px;
    transform: rotate(0deg);
  }
`;

export default function AdditionalColorInputs({
  Hue,
  Saturation,
  Lightness,
}: Props) {
  const [open, setOpen] = useState(false);
  const [adjestedHue, setAdjustedHue] = useState(Hue);
  const [adjustedSaturation, setAdjustedSaturation] = useState(Saturation);
  const [adjustedLightness, setAdjustedLightness] = useState(Lightness);

  useEffect(() => {
    if (Hue > 360) {
      setAdjustedHue(Hue - 360);
    } else if (Hue < 0) {
      setAdjustedHue(Hue + 360);
    } else setAdjustedHue(Hue);
  }, [Hue]);

  useEffect(() => {
    if (Saturation > 100) {
      setAdjustedSaturation(Saturation - 100);
    } else if (Saturation < 0) {
      setAdjustedSaturation(Saturation + 100);
    } else setAdjustedSaturation(Saturation);
  }, [Saturation]);

  useEffect(() => {
    if (Lightness < 0) {
      setAdjustedLightness(Lightness + 100);
    } else if (Lightness > 100) {
      setAdjustedLightness(Lightness - 100);
    } else setAdjustedLightness(Lightness);
  }, [Lightness]);

  const handleCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(hslToHex);
  };

  const color =
    Lightness < 0
      ? "black"
      : Lightness <= 40 || adjustedLightness <= 40
      ? "white"
      : "black";
  const backgroundColor = `hsl(${Hue}, ${adjustedSaturation}%, ${adjustedLightness}%)`;
  const hslToHex = chroma
    .hsl(Hue, adjustedSaturation / 100, adjustedLightness / 100)
    .hex();

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "150px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="h"
          label="Hue"
          variant="filled"
          type="number"
          size="small"
          value={adjestedHue}
          disabled
        />
        <TextField
          name="s"
          label="Saturation"
          variant="filled"
          type="number"
          size="small"
          value={adjustedSaturation}
          disabled
        />
        <TextField
          name="l"
          label="Lightness"
          variant="filled"
          type="number"
          size="small"
          value={adjustedLightness}
          disabled
        />
        <CustomButton style={{ backgroundColor, color }} onClick={handleCopy}>
          {hslToHex}
        </CustomButton>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
          message="Copied to clipboard"
        />
        <FormDialog color={hslToHex} />
      </Box>
    </>
  );
}
