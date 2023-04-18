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

import style from "../style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import moment from "moment";
import {
  changeFormType,
  setCource,
  setNews,
} from "../../../../redux/admin/adminSlice";
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { i18n } = useTranslation();

  const { id } = useParams();

  const activeLang = i18n.language === "uz" ? "textUz" : "textRu";

  const navigation = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(`http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/news/${id}`)
      .then((res) => {
        setData({
          textUz: res.data.textUz,
          textRu: res.data.textRu,
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
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div className={style.teacherNew}>
                  <p>{data[activeLang]}</p>
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
                    console.log(data);
                    dispatch(changeFormType(constatns.form.updating));
                    dispatch(setNews(data));
                    navigation("/admin/news/create", { replace: true });
                  }}
                  variant="contained"
                  type="submit"
                  color="secondary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
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
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default TeacherViewNew;
