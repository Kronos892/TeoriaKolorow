import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  Alert,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom } from "jotai";
import { palettesAtom } from "../paletteState";
import { savePalettesToLocalStorage } from "../paletteState";

interface Props {
  color: string;
}

export default function FormDialog({ color }: Props) {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState("");
  const [newPalette, setNewPalette] = useState("");
  const [openEmptyAlert, setOpenEmptyAlert] = useState(false);
  const [openExistAlert, setOpenExistAlert] = useState(false);
  const [palettes, setPalettes] = useAtom(palettesAtom);

  const handlePalette = (event: SelectChangeEvent) => {
    setPalette(event.target.value);
  };

  const handleNewPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPalette(event.target.value);
  };

  const handleSubmit = () => {
    if (palettes.some((p) => p.name === newPalette)) {
      setOpenExistAlert(true);
    } else if (newPalette === "" && palette === "") {
      setOpenEmptyAlert(true);
    } else if (newPalette !== "") {
      const newPaletteObj = { name: newPalette, colors: [color] };
      setPalettes((oldPalettes) => {
        const updatedPalettes = [...oldPalettes, newPaletteObj];
        savePalettesToLocalStorage(updatedPalettes); // Save to local storage
        return updatedPalettes;
      });
      setOpen(false);
      setNewPalette("");
      setPalette("");
    } else if (palette !== "" && color) {
      setPalettes((oldPalettes) => {
        const updatedPalettes = oldPalettes.map((p) => {
          if (p.name === palette) {
            return { ...p, colors: [...p.colors, color] };
          }
          return p;
        });
        savePalettesToLocalStorage(updatedPalettes); // Save to local storage
        return updatedPalettes;
      });
      setOpen(false);
      setPalette("");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add to palette
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to palette</DialogTitle>
        <DialogContent>
          <DialogContentText>Select or add color palette</DialogContentText>
          <FormControl sx={{ margin: "5px", width: "200px" }}>
            <InputLabel>Select color palette</InputLabel>
            <Select
              value={palette}
              label="Select color palette"
              variant="standard"
              onChange={handlePalette}
              disabled={newPalette.length > 0}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {palettes.map((palette) => (
                <MenuItem key={palette.name} value={palette.name}>
                  {palette.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ margin: "5px" }}
            margin="dense"
            label="Create palette"
            type="text"
            variant="standard"
            value={newPalette}
            onChange={handleNewPalette}
            disabled={palette.length > 0}
          />
          <Collapse in={openEmptyAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenEmptyAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              You have to select or create palette!
            </Alert>
          </Collapse>
          <Collapse in={openExistAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenExistAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              You can't create palette with this name - Palette with this name
              already Exist
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
