import React, { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import styles from "./style.module.css";

function DropDownList({ row, saveData, defaultValue = "" }) {
  const [dropDownValue, setDropDownValue] = useState(defaultValue);
  return (
    <Autocomplete
      className={styles.Autocomplete}
      id="dropDown"
      options={row.options}
      value={dropDownValue || " "}
      renderOption={(props, option) => <Box {...props}>{option || " "}</Box>}
      getOptionLabel={(option) => option || " "}
      onChange={(event, value) => {
        setDropDownValue(value);
        saveData(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={row.title}
          variant="standard"
          value={dropDownValue}
        />
      )}
    />
  );
}

export default DropDownList;
