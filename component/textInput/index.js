import React, { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import styles from "./style.module.css";

function TextInput({ row, saveData, defaultValue = "", ...props }) {
  const [dropDownValue, setDropDownValue] = useState(defaultValue || 0);
  return (
    <TextField
      {...props}
      label={row.title}
      variant="standard"
      value={dropDownValue}
      onChange={(e) => {
        saveData(e.target.value);
        setDropDownValue(e.target.value);
      }}
    />
  );
}

export default TextInput;
