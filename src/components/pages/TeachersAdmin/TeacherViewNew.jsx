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

import style from "./Teachers.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeFormType, setTeacher } from "../../../redux/admin/adminSlice";
import { constatns } from "../../../redux/constants";

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

  const descLan = i18n.language === "uz" ? "infoUz" : "infoRu";

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(`https://winejet-uz.herokuapp.com/api/teachers/${id}`)
      .then((res) => {
        console.log(res);
        const imageAttachment = res.data.attachmentContent;
        const base64Data = imageAttachment.data;
        const imageUrl = `data:image/png;base64,${base64Data}`;
        setImage(imageUrl);
        setData({
          fullName: res.data.fullName,
          infoRu: res.data.infoRu,
          infoUz: res.data.infoUz,
          attachmentId: res.data.attachment.id,
          id: res.data.id,
        });
      })
      .then((data) => setLoading(false));
  }, []);

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
                  <h2 className={style.teacherName}>{data.fullName}</h2>
                  <p>{data[descLan]}</p>
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
                    dispatch(setTeacher(data));
                    navigation("/admin/teacher/create", { replace: true });
                  }}
                  variant="contained"
                  type="submit"
                  color="secondary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
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
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default TeacherViewNew;
