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
import useJwtApi from "../../../../utils/jwtApi";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import UploadComponent from "../../../imageUploader/imageUploader";

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
  const [textUz, setTextUz] = useState("");
  const [textRu, setTextRu] = useState("");
  const [
    {
      defaultImages = [],
      pictures = [],
      imgUploadText = "Upload images",
      isTouched,
    },
    setPictureSate,
  ] = useState({});

  const [loading, setLoading] = useState(false);
  const { formType } = useSelector((state) => state.admin);
  const { news } = useSelector((state) => state.admin);

  const { jwtApi } = useJwtApi();

  console.log(formType);

  const navigation = useNavigate();

  const clearValues = () => {
    setTextRu("");
    setTextUz("");
  };

  const handleImageUpload = (pictureFiles, pictureDataURLs) => {
    console.log(pictureFiles, pictureDataURLs);

    if (formType === constatns.form.updating) {
      if (!isTouched) {
        console.log("cleared");
        setPictureSate((prev) => ({
          ...prev,
          defaultImages: [pictureDataURLs[pictureDataURLs.length - 1]],
          pictures: [...pictureFiles],
          isTouched: true,
        }));
      } else {
        setPictureSate((prev) => ({
          ...prev,
          defaultImages: [...pictureDataURLs],
          pictures: [...pictureFiles],
        }));
      }
    } else {
      console.log("submity");
      setPictureSate((prev) => ({
        ...prev,
        defaultImages: [...pictureDataURLs],
        pictures: [...pictureFiles],
      }));
    }
  };

  console.log(pictures);

  useEffect(() => {
    setLoading(false);
    if (formType === constatns.form.updating) {
      setTextRu(news.textUz);
      setTextUz(news.textRu);
      setPictureSate((prev) => ({ ...prev, imgUploadText: "Update images" }));
      setPictureSate((prev) => ({
        ...prev,
        defaultImages: [
          ...news.attachmentContents.map(
            (item) => `data:image/png;base64,${item.data}`
          ),
        ],
      }));
    }
  }, []);

  const submitImages = async () => {
    console.log("pics=>", pictures);
    try {
      if (pictures.length !== 2) throw new Error("Upload 2 images");
      const imagesFormData = pictures.map((image) => {
        const formData = new FormData();
        formData.append("file", image);
        return formData;
      });
      const promises = imagesFormData.map((formData) =>
        jwtApi.post("/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
      );

      const res = await Promise.all(promises);
      return res.map((item) => parseInt(item.data.message));
      // console.log(res);
      // const res = ;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("submit");
      setLoading(true);

      const attachmentContentIds = await submitImages();
      const newsData = {
        textUz,
        textRu,
        attachmentContentIds,
      };

      const res = await jwtApi.post(
        `https://winejet-uz.herokuapp.com/api/news`,
        newsData
      );

      NotificationManager.success("News succussfully created", "Success!");
      clearValues();
      navigation("/admin/news", { replace: true });
    } catch (error) {
      NotificationManager.error(error.message, "Error!");
      console.log(error);
    } finally {
      setLoading(false);
    }

    // https://winejet-uz.herokuapp.com/api

    /*   axios.post(`https://winejet-uz.herokuapp.com/apiteachers`, data).then((res) => {
        if (res.status === 200) {   
          setCategoryId(res.data.id);
        }
      }); */
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let attachmentContentIds;

    if (isTouched) {
      attachmentContentIds = await submitImages();
    }

    const updatedData = {
      textUz: textUz || news.textUz,
      textRu: textRu || news.textRu,
      attachmentContentIds:
        attachmentContentIds || news.attachmentContents.map((item) => item.id),
      id: news.id,
    };

    console.log(pictures);

    try {
      // Image validation
      console.log(updatedData);
      await axios.post(
        `https://winejet-uz.herokuapp.com/api/news`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      clearValues();
      navigation("/admin/news", { replace: true });
      NotificationManager.success("News succussfully created", "Success!");
      clearValues();
    } catch (error) {
      NotificationManager.error("Something went wrong", "Error!");
      console.log(error);
    } finally {
      setLoading(false);
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
            {formType === constatns.form.creating ? "Add a " : "Update the "}
            News
          </Typography>
          <div className={style.courceFormWrap}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Text in Uzbek"
                value={textUz}
                onChange={(e) => {
                  setTextUz(e.target.value);
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
                label="Text in Russian"
                value={textRu}
                onChange={(e) => {
                  setTextRu(e.target.value);
                }}
                multiline
                rows={4}
                fullWidth
                required
                color="secondary"
              />
            </Box>
          </div>
          <div className={!isTouched && style.uploadWrapper}>
            <UploadComponent
              defaultImages={defaultImages}
              btnText={imgUploadText}
              handleChange={handleImageUpload}
            />
          </div>

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
                navigation("/admin/news", { replace: true });
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
