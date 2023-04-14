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

import style from "./Teachers.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [fullName, setFullName] = React.useState("");
  const [descriptionUZ, setDescriptionUZ] = React.useState("");
  const [descriptionRU, setDescriptionRU] = React.useState("");
  const [image, setImage] = React.useState();

  const navigation = useNavigate();

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleDescriptionUZChange = (event) => {
    setDescriptionUZ(event.target.value);
  };

  const handleDescriptionRUChange = (event) => {
    setDescriptionRU(event.target.value);
  };

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

    // Image validation
    if (!image) alert("Insert image");
    const formdata = new FormData();
    formdata.append("file", image);
    console.log([...formdata]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/files`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        return res.data.message;
      })
      .then((imgId) => {
        const teacherData = {
          fullName: fullName,
          infoUz: descriptionUZ,
          infoRu: descriptionRU,
          attachmentId: imgId,
        };

        return axios.post(
          `${process.env.REACT_APP_API_URL}/teachers`,
          teacherData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
      })
      .then((data) => {
        NotificationManager.success("Teacher succussfully created", "Success!");
        navigation("/admin/teacher", { replace: true });
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

  return (
    <ThemeProvider theme={darkTheme}>
      <Box component="form" onSubmit={handleSubmit}>
        <div className={style.formWrap}>
          <Typography variant="h5" color="textPrimary" sx={{ marginBottom: 2 }}>
            Add a new teacher
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={handleFullNameChange}
              fullWidth
              required
              color="secondary"
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Description in Uzbek"
              value={descriptionUZ}
              onChange={handleDescriptionUZChange}
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
              value={descriptionRU}
              onChange={handleDescriptionRUChange}
              multiline
              rows={4}
              fullWidth
              required
              color="secondary"
            />
          </Box>
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
          <Box sx={{ marginTop: 2 }}>
            
            <Button variant="contained" type="submit" color="secondary">
              Submit
            </Button>
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default MyForm;
