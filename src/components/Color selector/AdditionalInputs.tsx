import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, FormEvent, useEffect } from "react";
import React from "react";

interface Props {
  scheme: string;
  onValuesChange: (distance: number, complement: boolean) => void;
  selectedModel: string; 
}

export default function AdditionalInputs({ scheme, onValuesChange, selectedModel }: Props) {
  const [distance, setDistance] = useState<number>(90);
  const [complement, setComplement] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedDistance = parseInt(event.target.value);
    if (
      ["Light contrast", "Analogic"].includes(scheme) &&
      updatedDistance > 60
    ) {
      updatedDistance = 60;
    } else if (updatedDistance > 90) {
      updatedDistance = 90;  
    } else if (updatedDistance < 0) {
      updatedDistance = 0;
    }
    setDistance(updatedDistance);
    onValuesChange(updatedDistance, complement);
  };

  const handleComplementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedComplement = event.target.checked;
    setComplement(updatedComplement);
    onValuesChange(distance, updatedComplement);
  };

  useEffect(() => {
    if (["Light contrast", "Analogic", "Double contrast"].includes(scheme)) {
      const mockEvent = { target: { value: distance.toString() } };
      handleDistanceChange(
        mockEvent as unknown as React.ChangeEvent<HTMLInputElement>
      );
    }
  }, [scheme, distance]);

  const RenderAdditionalInputs = () => {
    switch (scheme) {
      case "Light contrast":
        return (
          <>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-basic"
                label="Distance (0-60)"
                variant="outlined"
                type="number"
                size="small"
                sx={{ m: 1, minWidth: 150, fontSize: 16 }}
                InputProps={{ inputProps: { min: 0, max: 60 } }}
                value={distance}
                onChange={handleDistanceChange}
              />
            </Box>
          </>
        );
      case "Double contrast":
        return (
          <>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-basic"
                label="Distance (0-90)"
                variant="outlined"
                type="number"
                size="small"
                sx={{ m: 1, minWidth: 150, fontSize: 16 }}
                InputProps={{ inputProps: { min: 0, max: 90 } }}
                value={distance}
                onChange={handleDistanceChange}
              />
            </Box>
          </>
        );
        case "Analogic":
          return (
            <>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  id="outlined-basic"
                  label="Distance (0-60)"
                  variant="outlined"
                  type="number"
                  size="small"
                  sx={{ m: 1, minWidth: 150, fontSize: 16 }}
                  InputProps={{ inputProps: { min: 0, max: 60 } }}
                  value={distance}
                  onChange={handleDistanceChange}
                />
                {selectedModel === "RGB" && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={complement}
                        onChange={handleComplementChange}
                      />
                    }
                    label="Add the complement"
                  />
                )}
              </Box>
            </>
          );
        default:
    }
  };

  return <>{RenderAdditionalInputs()}</>;
}
