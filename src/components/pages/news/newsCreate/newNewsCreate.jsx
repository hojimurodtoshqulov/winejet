import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { NotificationManager } from "react-notifications";

import style from "../../news/style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { constatns } from "../../../../redux/constants";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1f1f1f",
      paper: "#333333",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
});

const MyForm = () => {
  const [textUz, setTextUz] = React.useState("");
  const [textRu, setTextRu] = React.useState("");

  const { formType } = useSelector((state) => state.admin);
  const { news } = useSelector((state) => state.admin);

  console.log(formType);

  const navigation = useNavigate();

  const clearValues = () => {
    setTextRu("");
    setTextUz("");
  };

  useEffect(() => {
    if (formType === constatns.form.updating) {
      setTextRu(news.textUz);
      setTextUz(news.textRu);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");

    const newsData = {
      textUz,
      textRu,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/news`, newsData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        console.log(data);
        NotificationManager.success("News succussfully created", "Success!");
        clearValues();
        navigation("/admin/news", { replace: true });
      })
      .catch((err) => {
        NotificationManager.error("Something went wrong", "Error!");
        console.log(err);
      });

    /*   axios.post(`${process.env.REACT_APP_API_URL}teachers`, data).then((res) => {
        if (res.status === 200) {   
          setCategoryId(res.data.id);
        }
      }); */
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const updatedData = {
      //   fullName: fullName || teacher.fullName,
      //   infoUz: descriptionUZ || teacher.infoUz,
      //   infoRu: descriptionRU || teacher.infoRu,
      //   attachmentId: teacher.attachmentId,
      //   id: teacher.id,
      textUz: textUz || news.textUz,
      textRu: textRu || news.textRu,
      id: news.id,
    };

    try {
      // Image validation
      console.log(updatedData);
      await axios.post(`${process.env.REACT_APP_API_URL}/news`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      clearValues();
      navigation("/admin/news", { replace: true });
      NotificationManager.success("News succussfully created", "Success!");
      clearValues();
    } catch (error) {
      NotificationManager.error("Something went wrong", "Error!");
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="form"
        onSubmit={(e) => {
          formType === constatns.form.creating
            ? handleSubmit(e)
            : handleEdit(e);
        }}
      >
        <div className={style.formWrap}>
          <Typography variant="h5" color="textPrimary" sx={{ marginBottom: 2 }}>
            {formType === constatns.form.creating ? "Add a new" : "Update the "}
            News
          </Typography>
          <div className={style.courceFormWrap}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Description in Uzbek"
                // value={descriptionUz}
                onChange={(e) => {
                  // setDescriptionUz(e.target.value);
                }}
                multiline
                rows={4}
                fullWidth
                required
                color="secondary"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Description in Russian"
                // value={descriptionRu}
                onChange={(e) => {
                  // setDescriptionRu(e.target.value);
                }}
                multiline
                rows={4}
                fullWidth
                required
                color="secondary"
              />
            </Box>
          </div>

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" type="submit" color="secondary">
              Submit
            </Button>
            <Button
              onClick={() => {
                clearValues();
                navigation("/admin/courses", { replace: true });
              }}
              variant="contained"
              type="button"
              color="secondary"
            >
              Back
            </Button>
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default MyForm;
