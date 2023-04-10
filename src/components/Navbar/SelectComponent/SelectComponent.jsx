import "./SelectComponent.scss";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HiChevronDown } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SelectComponent = () => {
  const [language, setLanguage] = useState("uz");
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <Select
          value={language}
          sx={{
            fontSize: "1.8rem",
            fontFamily: "NextArt-regular, sans-serif",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #fff",
              borderRadius: "3rem",
              color: "#fff",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #fff",
              borderRadius: "3rem",
            },
            "& .MuiSelect-icon": {
              fontSize: "2.3rem",
              color: "#fff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #fff",
              borderRadius: "3rem",
            },
            "& .MuiInputBase-inputSizeSmall": {
              color: "#fff",
            },
          }}
          IconComponent={HiChevronDown}
          onChange={handleChange}
        >
          <MenuItem
            sx={{
              fontSize: "1.8rem",
              fontFamily: "NextArt-regular, sans-serif",
            }}
            value={"uz"}
          >
            Uz
          </MenuItem>
          <MenuItem
            defaultChecked
            sx={{
              fontSize: "1.8rem",
              fontFamily: "NextArt-regular, sans-serif",
            }}
            value={"ru"}
          >
            Ru
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
