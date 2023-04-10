import "./AsideFilter.scss";
import { IoIosClose } from "react-icons/io";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import { useEffect } from "react";
import { FilterWrapper } from "../pages/CalendarPage/CalendarPage";

const DayHour = ({ label, value }) => {
  return (
    <div className="asideFilter__hours-wrapper">
      <h1 className="asideFilter__titles">{label} </h1>
      <input type="text" value={value} />
    </div>
  );
};

const AsideFilter = ({ isActive, setIsActive }) => {
  useEffect(() => {
    if (isActive) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [isActive]);

  return (
    <aside
      className={`asideFilter__side-container ${
        isActive ? "asideFilter__side-active" : ""
      }`}
    >
      <div
        style={{
          textAlign: "end",
        }}
      >
        <span
          className="asideFilter__close-icons"
          onClick={() => setIsActive(false)}
        >
          <IoIosClose />
        </span>
      </div>
      <div
        style={{
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FilterWrapper />
        </div>
        <div className="asideFilter__checkbox-wrapper">
          {[1, 2, 3, 4, 5].map((item) => (
            <FormGroup
              key={item}
              sx={{
                mb: "3rem",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      fontSize: "24rem",
                      color: "white",
                      transform: "scale(1.5)",
                    }}
                  />
                }
                label={
                  <p
                    style={{
                      fontSize: "2.4rem",
                      color: "white",
                      marginLeft: "5rem",
                    }}
                  >
                    Worem ipsum
                  </p>
                }
                sx={{ fontSize: "24rem", color: "white" }}
              />
            </FormGroup>
          ))}
          <DayHour value="22.00" label="время" />
          {[1, 2, 3, 4].map((item) => (
            <FormGroup
              key={item}
              sx={{
                mb: "3rem",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      fontSize: "24rem",
                      color: "white",
                      transform: "scale(1.5)",
                    }}
                  />
                }
                label={
                  <p
                    style={{
                      fontSize: "2.4rem",
                      color: "white",
                      marginLeft: "5rem",
                    }}
                  >
                    Worem ipsum
                  </p>
                }
                sx={{ fontSize: "24rem", color: "white" }}
              />
            </FormGroup>
          ))}
          <DayHour value="12.12.12" label="день" />
        </div>
      </div>
    </aside>
  );
};

export default AsideFilter;
