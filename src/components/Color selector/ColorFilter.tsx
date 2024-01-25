import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ColorsLayout from "./ColorsLayout";
import AdditionalInputs from "./AdditionalInputs";

export default function ColorFilter() {
  const [additionalInputs, setAdditionalInputs] = React.useState<{
    distance: number;
    complement: boolean;
  }>({
    distance: 0,
    complement: false,
  });

  const [selectedScheme, setSelectedScheme] = React.useState("Monochromatic");

  const [selectedModel, setSelectedModel] = React.useState("HSL");

  const handleSchemeChange = (event: SelectChangeEvent) => {
    setSelectedScheme(event.target.value as string);
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value as string);
  };

  const handleAdditionalInputs = (distance: number, complement: boolean) => {
    setAdditionalInputs({ distance, complement });
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120, fontSize: 16 }} size="small">
        <InputLabel id="demo-select-small-label">Scheme</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedScheme}
          label="Scheme"
          onChange={handleSchemeChange}
        >
          <MenuItem value={"Monochromatic"}>Monochromatic</MenuItem>
          <MenuItem value={"Contrast"}>Contrast</MenuItem>
          <MenuItem value={"Light contrast"}>Light contrast</MenuItem>
          <MenuItem value={"Double contrast"}>Double contrast</MenuItem>
          <MenuItem value={"Analogic"}>Analogic</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120, fontSize: 16 }} size="small">
        <InputLabel id="demo-select-small-label">Color</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedModel}
          label="Color"
          onChange={handleModelChange}
        >
          <MenuItem value="HSL">HSL</MenuItem>
          <MenuItem value="RGB">RGB</MenuItem>
          <MenuItem value="CMY">CMY</MenuItem>
          <MenuItem value="CMYK">CMYK</MenuItem>
          <MenuItem value="YUV">YUV</MenuItem>
          <MenuItem value="YIQ">YIQ</MenuItem>
          <MenuItem value="NCS">NCS</MenuItem>
        </Select>
      </FormControl>
      <AdditionalInputs
        scheme={selectedScheme}
        onValuesChange={handleAdditionalInputs}
      />

      <ColorsLayout
        scheme={selectedScheme}
        model={selectedModel}
        distance={additionalInputs.distance}
        complement={additionalInputs.complement}
      />
    </>
  );
}
