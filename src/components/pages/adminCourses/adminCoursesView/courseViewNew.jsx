import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import style from "../adminCoursesCreate/style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import moment from "moment";
import { changeFormType, setCource } from "../../../../redux/admin/adminSlice";
import { constatns } from "../../../../redux/constants";

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

const TeacherViewNew = () => {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { i18n } = useTranslation();

  const imgRef = React.useRef(null);

  const { id } = useParams();

  const navigation = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const descLan =
    i18n.language === "uz"
      ? { title: "titleUz", desc: "descriptionUz" }
      : { title: "titleRu", desc: "descriptionRu" };

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses/${id}`)
      .then((res) => {
        console.log(res);
        const imageAttachment = res.data.attachmentContent;
        const base64Data = imageAttachment.data;
        const imageUrl = `data:image/png;base64,${base64Data}`;
        setImage(imageUrl);

        setData({
          titleUz: res.data.titleUz,
          titleRu: res.data.titleRu,
          descriptionUz: res.data.descriptionUz,
          descriptionRu: res.data.descriptionRu,
          date: res.data.date,
          price: res.data.price,
          attachmentId: res.data.attachment.id,
          id: res.data.id,
        });
      })
      .then((data) => setLoading(false));
  }, []);

  console.log(data);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box component="div">
        <div className={style.formWrap}>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className={style.teacherView}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isSmallScreen ? "column" : "row",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div className={style.imgBox}>
                  <img ref={imgRef} className={style.img} src={image} alt="" />
                </div>
                <div className={style.teacherNew}>
                  <h2 className={style.teacherName}>{data[descLan.title]}s</h2>
                  <p>{data[descLan.desc]}s</p>
                  <p>Date: {moment(data.date).format("DD.MM.YYYY, HH:mm")}</p>
                  <p>Price: {data.price}$</p>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Button
                  onClick={() => {
                    dispatch(changeFormType(constatns.form.updating));
                    dispatch(setCource(data));
                    navigation("/admin/courses/create", { replace: true });
                  }}
                  variant="contained"
                  type="submit"
                  color="secondary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
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
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default TeacherViewNew;
