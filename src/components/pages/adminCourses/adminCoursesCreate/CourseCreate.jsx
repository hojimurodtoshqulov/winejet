import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DatePicker from "react-datepicker";

import { NotificationManager } from "react-notifications";

import style from "./style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { constatns } from "../../../../redux/constants";
import { useEffect } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  const [titleUz, setTitleUz] = React.useState("");
  const [titleRu, setTitleRu] = React.useState("");
  const [descriptionUz, setDescriptionUz] = React.useState("");
  const [descriptionRu, setDescriptionRu] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState(null);

  const { formType } = useSelector((state) => state.admin);
  const { course } = useSelector((state) => state.admin);

  console.log(formType);

  const navigation = useNavigate();

  const clearValues = () => {
    setTitleUz("");
    setTitleRu("");
    setDescriptionUz("");
    setDescriptionRu("");
    setDate(new Date());
    setPrice(0);
    setImage(null);
  };

  useEffect(() => {
    if (formType === constatns.form.updating) {
      setTitleUz(course.titleUz);
      setTitleRu(course.titleRu);
      setDescriptionUz(course.descriptionUz);
      setDescriptionRu(course.descriptionRu);
      setDate(moment(course.date).format("YYYY-MM-DDTHH:mm"));
      setPrice(course.price);
    }
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedFormats.includes(file.type)) {
      setImage(file);
    } else {
      alert("Please upload a file in PNG, JPG, or JPEG format.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");

    // Image validation
    if (!image) return alert("Insert image");
    const formdata = new FormData();
    formdata.append("file", image);

    axios
      .post(`${process.env.REACT_APP_API_URL}/files`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        return res.data.message;
      })
      .then((imgId) => {
        const courceData = {
          titleUz,
          titleRu,
          descriptionUz,
          descriptionRu,
          date,
          price,
          attachmentId: imgId,
        };

        console.log(courceData);

        return axios.post(
          `${process.env.REACT_APP_API_URL}/courses`,
          courceData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
      })
      .then((data) => {
        console.log(data);
        NotificationManager.success("Teacher succussfully created", "Success!");
        clearValues();
        navigation("/admin/courses", { replace: true });
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
    };

    try {
      // Image validation

      console.log(image);
      if (image) {
        console.log(image);
        const formdata = new FormData();
        formdata.append("file", image);

        updatedData.attachmentId = await axios
          .post(`${process.env.REACT_APP_API_URL}/files`, formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            return res.data.message;
          });
      }
      console.log(updatedData);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/teachers`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      clearValues();
      navigation("/admin/courses", { replace: true });
      NotificationManager.success("Teacher succussfully created", "Success!");
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
            {/* {formType === constatns.form.creating ? "Add a new" : "Update the "} */}
            Course
          </Typography>
          <div className={style.courceFormWrap}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Title in Uzbek"
                value={titleUz}
                onChange={(e) => {
                  setTitleUz(e.target.value);
                }}
                fullWidth
                required
                color="secondary"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Title in Russian"
                value={titleRu}
                onChange={(e) => {
                  setTitleRu(e.target.value);
                }}
                fullWidth
                required
                color="secondary"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Description in Uzbek"
                value={descriptionUz}
                onChange={(e) => {
                  setDescriptionUz(e.target.value);
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
                value={descriptionRu}
                onChange={(e) => {
                  setDescriptionRu(e.target.value);
                }}
                multiline
                rows={4}
                fullWidth
                required
                color="secondary"
              />
            </Box>
            <Box sx={{ zIndex: "10", position: "relative" }}>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => {
                  setPrice(+e.target.value);
                }}
                required
                color="secondary"
              />
            </Box>
          </div>
          <Box sx={{ marginBottom: 2 }}>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span" color="secondary">
                Upload Image
              </Button>
            </label>
          </Box>
          {image && (
            <Typography color="textPrimary" sx={{ marginBottom: 2 }}>
              Image uploaded: {image.name}
            </Typography>
          )}
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
