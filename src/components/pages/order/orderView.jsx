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

import style from "./style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeFormType, setTeacher } from "../../../redux/admin/adminSlice";
import { constatns } from "../../../redux/constants";
import moment from "moment";
import useJwtApi from "../../../utils/jwtApi";
import { NotificationManager } from "react-notifications";

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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { i18n } = useTranslation();

  const { jwtApi } = useJwtApi();

  const imgRef = React.useRef(null);

  const { id } = useParams();

  const navigation = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const descLan = i18n.language === "uz" ? "infoUz" : "infoRu";

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    try {
      const res = await jwtApi.delete(`/order/${id}`);
      console.log(res);
      NotificationManager.success("Order deleted", "Success");
      navigation("/admin/order", { replace: true });
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    }
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://winejet-uz.herokuapp.com/api/order/${id}`)
      .then((res) => {
        console.log(res);
        const imageAttachment = res.data.course.attachmentContentId;
        const imageUrl = `https://winejet-uz.herokuapp.com/api/files/${imageAttachment}`;
        setImage(imageUrl);
        setData({
          fullName: `${res.data.name} ${res.data.surname}`,
          orderedTime: res.data.orderedTime,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          courseTitle: {
            infoUz: res.data?.course?.titleUz,
            infoRu: res.data?.course?.titleRu,
          },
        });
      })
      .finally(() => setLoading(false));
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
                  <p>
                    <span>Name:</span> {data.fullName}
                  </p>
                  <p>
                    <span>Order time:</span>{" "}
                    {moment(data.orderedTime).format(`HH:mm | DD.MM.YYYY`)}
                  </p>
                  <p>
                    <span>Email:</span> {data.email}
                  </p>
                  <p>
                    <span>Phone number:</span>
                    <a href={`tel:+${data.phoneNumber}`}> {data.phoneNumber}</a>
                  </p>
                  <p>
                    <span>Course title: </span> {data.courseTitle?.[descLan]}
                  </p>
                  {/* <p>{data[descLan]}</p> */}
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
                    navigation("/admin/order", { replace: true });
                  }}
                  variant="contained"
                  type="button"
                  color="secondary"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    deleteHandler(id);
                  }}
                  variant="contained"
                  type="button"
                  color="secondary"
                >
                  Delete
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
