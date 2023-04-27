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
import { constatns } from "../../../redux/constants";
import { useEffect } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useRef } from "react";

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
  const [image, setImage] = React.useState(null);
  const [itemId, setItemId] = React.useState();
  const [attachmentContent, setAttachmentContent] = useState();

  const [loading, setLoading] = useState(false);

  const { formType } = useSelector((state) => state.admin);
  const { course } = useSelector((state) => state.admin);

  const imageUpdated = useRef(false);

  console.log(formType);

  const navigation = useNavigate();

  const clearValues = () => {
    setTitleUz("");
    setTitleRu("");
    setDescriptionUz("");
    setDescriptionRu("");
    setImage(null);
    setAttachmentContent(null);
    setItemId(null);
  };

  const getItem = async () => {
    try {
      const res = await axios.get(
        `https://winejet-uz.herokuapp.com/api/courses-showcase`
      );

      console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);

      throw new Error(error.message);
    }
  };

  useEffect(() => {
    setLoading(false);

    getItem().then((res) => {
      setTitleRu(res.titleRu);
      setTitleUz(res.titleUz);
      setDescriptionRu(res.descriptionRu);
      setDescriptionUz(res.descriptionUz);
      setAttachmentContent(res.attachmentContent.id);
      setItemId(res.id);
    });

    /*  setTitleUz(course.titleUz);
    setTitleRu(course.titleRu);
    setDescriptionUz(course.descriptionUz);
    setDescriptionRu(course.descriptionRu); */
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedFormats.includes(file.type)) {
      imageUpdated.current = true;
      setImage(file);
    } else {
      alert("Please upload a file in PNG, JPG, or JPEG format.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    setLoading(true);

    let newImgId = attachmentContent;

    // Image validation
    if (imageUpdated.current) {
      const formdata = new FormData();
      formdata.append("file", image);
      const res = await axios.post(
        `https://winejet-uz.herokuapp.com/api/files`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      newImgId = res.data.message;
    }

    const dataToSubmit = {
      id: itemId,
      titleUz,
      titleRu,
      descriptionUz,
      descriptionRu,
      attachmentContentId: newImgId,
    };

    console.log(dataToSubmit);

    axios
      .post(
        `https://winejet-uz.herokuapp.com/api/courses-showcase`,
        dataToSubmit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        NotificationManager.success("About text created", "Success!");
        clearValues();
        navigation("/admin/courses-showcase", { replace: true });
      })
      .catch((err) => {
        NotificationManager.error("Something went wrong", "Error!");
        console.log(err);
      })
      .finally(() => setLoading(false));

    /*   axios.post(`https://winejet-uz.herokuapp.com/apiteachers`, data).then((res) => {
        if (res.status === 200) {   
          setCategoryId(res.data.id);
        }
      }); */
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={style.formWrap}>
          <Typography variant="h5" color="textPrimary" sx={{ marginBottom: 2 }}>
            Update courses banner
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
            <Button
              disabled={loading}
              variant="contained"
              type="submit"
              color="secondary"
            >
              {loading ? "Loading" : "Submit"}
            </Button>
            <Button
              onClick={() => {
                clearValues();
                navigation("/admin/courses-showcase", { replace: true });
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
