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
import { useSelector } from "react-redux";
import { constatns } from "../../../redux/constants";
import { useEffect } from "react";

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
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const { formType } = useSelector((state) => state.admin);
  const { teacher } = useSelector((state) => state.admin);

  console.log(formType);

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

  const clearValues = () => {
    setFullName("");
    setDescriptionUZ("");
    setDescriptionRU("");
    setImage(null);
  };

  useEffect(() => {
    setLoading(false);
    if (formType === constatns.form.updating) {
      setFullName(teacher.fullName);
      setDescriptionUZ(teacher.infoUz);
      setDescriptionRU(teacher.infoRu);
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
    setLoading(true);

    // Image validation
    if (!image) return alert("Insert image");
    const formdata = new FormData();
    formdata.append("file", image);

    axios
      .post(`http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/files`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
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
          `http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/teachers`,
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
        clearValues();
        setLoading(false);
        navigation("/admin/teacher", { replace: true });
      })
      .catch((err) => {
        NotificationManager.error("Something went wrong", "Error!");
        setLoading(false);
        console.log(err);
      });

    /*   axios.post(`http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/apiteachers`, data).then((res) => {
        if (res.status === 200) {
          setCategoryId(res.data.id);
        }
      }); */
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const updatedData = {
      fullName: fullName || teacher.fullName,
      infoUz: descriptionUZ || teacher.infoUz,
      infoRu: descriptionRU || teacher.infoRu,
      attachmentId: teacher.attachmentId,
      id: teacher.id,
    };

    try {
      // Image validation

      console.log(image);
      if (image) {
        console.log(image);
        const formdata = new FormData();
        formdata.append("file", image);

        updatedData.attachmentId = await axios
          .post(`http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/files`, formdata, {
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
        `http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/teachers`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      clearValues();
      navigation("/admin/teacher", { replace: true });
      NotificationManager.success("Teacher succussfully created", "Success!");
      setLoading(false);
    } catch (error) {
      NotificationManager.error("Something went wrong", "Error!");
      console.log(error);
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
            {formType === constatns.form.creating ? "Add a new" : "Update the "}
            teacher
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
                navigation("/admin/teacher", { replace: true });
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
