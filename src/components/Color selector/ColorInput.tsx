import React, { FormEvent, useState, useEffect } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import styled from "styled-components";
import chroma from "chroma-js";
import FormDialog from "./Dialog";

type HSL = {
  h: number;
  s: number;
  l: number;
};

interface Props {
  onHSLChange: (HSL: {
    Hue: number;
    Saturation: number;
    Lightness: number;
  }) => void;
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

export default function ColorInput({ onHSLChange }: Props) {
  const [open, setOpen] = useState(false);
  const [hsl, setHsl] = useState<HSL>({
    h: parseInt(localStorage.getItem("hsl.h") || "180"),
    s: parseInt(localStorage.getItem("hsl.s") || "50"),
    l: parseInt(localStorage.getItem("hsl.l") || "50"),
  });

  useEffect(() => {
    localStorage.setItem("hsl.h", hsl.h.toString());
    localStorage.setItem("hsl.s", hsl.s.toString());
    localStorage.setItem("hsl.l", hsl.l.toString());
  }, [hsl]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(hslToHex);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numValue = Number(value);

    if (name === "h") {
      numValue = ((numValue % 360) + 360) % 360;
    } else {
      numValue = Math.max(0, Math.min(numValue, 100));
    }

    setHsl((prevValues) => {
      const newValues = {
        ...prevValues,
        [name as keyof HSL]: numValue,
      };

      updateHSL(newValues);
      return newValues;
    });
  };

  const color = hsl.l <= 40 ? "white" : "black";
  const backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hslToHex = chroma.hsl(hsl.h, hsl.s / 100, hsl.l / 100).hex();

  const updateHSL = (newHSL: HSL) => {
    onHSLChange({
      Hue: newHSL.h,
      Saturation: newHSL.s,
      Lightness: newHSL.l,
    });
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "150px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="box"
      noValidate
      autoComplete="off"
    >
      <TextField
        name="h"
        label="Hue"
        variant="filled"
        type="number"
        size="small"
        value={hsl.h}
        onChange={handleInputChange}
      />
      <TextField
        name="s"
        label="Saturation"
        variant="filled"
        type="number"
        size="small"
        value={hsl.s}
        onChange={handleInputChange}
        InputProps={{ inputProps: { min: 0, max: 100 } }}
      />
      <TextField
        name="l"
        label="Lightness"
        variant="filled"
        type="number"
        size="small"
        value={hsl.l}
        onChange={handleInputChange}
        InputProps={{ inputProps: { min: 0, max: 100 } }}
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
  );
}
