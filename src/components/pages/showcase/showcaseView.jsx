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

import style from "./style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { constatns } from "../../../redux/constants";
import { useEffect } from "react";
import useJwtApi from "../../../utils/jwtApi";
import { useRef } from "react";
import Spinner from "../../spinner";
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
  const [
    {
      titleUz,
      titleRu,
      descriptionUz,
      descriptionRu,
      buttonTextUz,
      buttonTextRu,
      price,
      dateTime,
      location,
      attachmentContent,
      id,
    },
    setState,
  ] = useState({});

  const imageChanged = useRef(false);

  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const { formType } = useSelector((state) => state.admin);
  //   const { teacher } = useSelector((state) => state.admin);

  const { id: slug } = useParams();

  const { jwtApi } = useJwtApi();

  console.log(formType);

  const navigation = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const fetchItem = async () => {
    setPageLoading(true);
    try {
      const res = await axios
        .get(`https://winejet-uz.herokuapp.com/api/show-keys/${slug}`)
        .then((res) => {
          setState({
            ...res.data,
            dateTime: moment(res.data.dateTime).format("YYYY-MM-DDTHH:mm"),
          });
        });
    } catch (error) {
    } finally {
      setPageLoading(false);
    }
  };

  const clearValues = () => {
    setState({});
  };

  useEffect(() => {
    fetchItem();
  }, []);

  console.log({
    titleUz,
    titleRu,
    descriptionUz,
    descriptionRu,
    buttonTextUz,
    buttonTextRu,
    price,
    dateTime,
    location,
    attachmentContent,
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedFormats.includes(file.type)) {
      imageChanged.current = true;
      setImage(file);
    } else {
      alert("Please upload a file in PNG, JPG, or JPEG format.");
    }
  };

  const submitImage = async () => {
    try {
      if (!image) throw new Error("Uplad an image");
      const formData = new FormData();
      formData.append("file", image);
      const res = await jwtApi.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return res.data.message;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageId = attachmentContent.id;

    try {
      setLoading(true);

      console.log(imageChanged);
      if (imageChanged.current) {
        imageId = await submitImage();
      }

      const dataToSubmit = {
        id,
        titleUz,
        titleRu,
        descriptionUz,
        descriptionRu,
        buttonTextUz,
        buttonTextRu,
        price: +price,
        dateTime,
        location,
        attachmentContentId: +imageId,
      };
      const res = await jwtApi.post("/show-keys", dataToSubmit);
      console.log(res);
      NotificationManager.success("Showcase item created", "Success");
      navigation("/admin/showcase", { replace: true });
    } catch (error) {
      console.log(error);
      NotificationManager.error(error.message, "Error");
    } finally {
      setLoading(false);
    }
    // setLoading(true);

    return;

    // Image validation
    // if (!image) return alert("Insert image");

    /*   axios.post(`https://winejet-uz.herokuapp.com/apiteachers`, data).then((res) => {
        if (res.status === 200) {
          setCategoryId(res.data.id);
        }
      }); */
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    // setLoading(true);

    const updatedData = {
      //   fullName: fullName || teacher.fullName,
      //   infoUz: descriptionUZ || teacher.infoUz,
      //   infoRu: descriptionRU || teacher.infoRu,
      //   attachmentId: teacher.attachmentId,
      //   id: teacher.id,
    };

    try {
      // Image validation

      //   console.log(image);
      //   if (image) {
      //     console.log(image);
      //     const formdata = new FormData();
      //     formdata.append("file", image);

      //     updatedData.attachmentId = await axios
      //       .post(`https://winejet-uz.herokuapp.com/api/files`, formdata, {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      //         },
      //       })
      //       .then((res) => {
      //         return res.data.message;
      //       });
      //   }
      console.log(updatedData);
      await axios.post(
        `https://winejet-uz.herokuapp.com/api/showcase`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      clearValues();
      navigation("/admin/showcase", { replace: true });
      NotificationManager.success(
        "Showcase item succussfully created",
        "Success!"
      );
      //   setLoading(false);
    } catch (error) {
      NotificationManager.error("Something went wrong", "Error!");
      console.log(error);
      //   setLoading(false);
    }
  };

  return pageLoading ? (
    <Spinner />
  ) : (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={style.formWrap}>
          <Typography variant="h5" color="textPrimary" sx={{ marginBottom: 2 }}>
            {formType === constatns.form.creating
              ? "Add a new "
              : "Update the "}
            showcase item
          </Typography>
          <div className="row">
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Title in Russian"
                  value={titleRu}
                  onChange={handleChange}
                  fullWidth
                  required
                  name="titleRu"
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Title in Uzbek"
                  value={titleUz}
                  onChange={handleChange}
                  rows={4}
                  fullWidth
                  name="titleUz"
                  required
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Description in Russian"
                  value={descriptionRu}
                  onChange={handleChange}
                  multiline
                  name="descriptionRu"
                  rows={4}
                  fullWidth
                  required
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Description in Uzbek"
                  value={descriptionUz}
                  onChange={handleChange}
                  multiline
                  name="descriptionUz"
                  rows={4}
                  fullWidth
                  required
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Button text in Russian"
                  value={buttonTextRu}
                  onChange={handleChange}
                  fullWidth
                  name="buttonTextRu"
                  required
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Button text in Uzbek"
                  value={buttonTextUz}
                  onChange={handleChange}
                  rows={4}
                  name="buttonTextUz"
                  fullWidth
                  required
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Price"
                  value={price}
                  onChange={handleChange}
                  rows={4}
                  fullWidth
                  name="price"
                  required
                  type="number"
                  color="secondary"
                />
              </Box>
            </div>
            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <input
                  type="datetime-local"
                  onChange={handleChange}
                  value={dateTime}
                  name="dateTime"
                  required
                />
              </Box>
            </div>
            <div className="col-12">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Location"
                  value={location}
                  onChange={handleChange}
                  rows={4}
                  fullWidth
                  name="location"
                  required
                  color="secondary"
                />
              </Box>
            </div>

            <div className="col-md-6">
              <Box sx={{ marginBottom: 2 }}>
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    color="secondary"
                  >
                    Upload Image
                  </Button>
                </label>
              </Box>
            </div>
          </div>

          {image && (
            <Typography color="textPrimary" sx={{ marginBottom: 2 }}>
              Image uploaded:
              {image.name}
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
                navigation("/admin/showcase", { replace: true });
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
