import "./App.scss";
import "./assets/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Pages from "./components/pages/Pages";
import Users from "./components/pages/users/Users";
import UserCreate from "./components/pages/users/userCreate/UserCreate";
import UserView from "./components/pages/users/userView/UserView";
import Menu from "./components/pages/menu/Menu";
import MenuCreate from "./components/pages/menu/menuCreate/MenuCreate";
import MenuView from "./components/pages/menu/menuView/MenuView";
import LangSetting from "./components/pages/langSetting/LangSetting";
import LangSettingCreate from "./components/pages/langSetting/langSettingCreate/LangSettingCreate";
import LangSettingView from "./components/pages/langSetting/langSettingView/LangSettingView";
import News from "./components/pages/news/News";
import AdminCourses from "./components/pages/adminCourses/AdminCourses";
import AdminCoursesCreate from "./components/pages/adminCourses/adminCoursesCreate/CourseCreate";
import AdminCoursesView from "./components/pages/adminCourses/adminCoursesView/courseViewNew";
import Site from "./components/site/Site";
import NewsCreate from "./components/pages/news/newsCreate/newNewsCreate";
import NewsView from "./components/pages/news/newsView/NewsView";
import CoursesCategoryView from "./components/pages/coursesCategory/coursesCategoryView/CoursesCategoryView";
import CoursesCategory from "./components/pages/coursesCategory/CoursesCategory";
import CoursesCategoryCreate from "./components/pages/coursesCategory/coursesCategoryCreate/CoursesCategoryCreate";

import {
  Courses,
  Course,
  Home,
  About,
  Contact,
  CalendarPage,
} from "./components/pages";
import $ from "jquery";
import { NotificationContainer } from "react-notifications";

import { ScrollTop } from "./components";
import TeachersAdmin from "./components/pages/TeachersAdmin/TeachersAdmin";
import TeacherCreate from "./components/pages/TeachersAdmin/TeacherCreateNew";
import TeacherView from "./components/pages/TeachersAdmin/TeacherViewNew";
import { useEffect } from "react";

import "aos/dist/aos.css";
import AOS from "aos";
import Showcase from "./components/pages/showcase/showcase";
import ShowcaseCreate from "./components/pages/showcase/showcaseCreate";
import ShowcaseView from "./components/pages/showcase/showcaseView";
import Order from "./components/pages/order/order";
import OrderView from "./components/pages/order/orderView";
import CoursesShowcase from "./components/pages/coursesShowcase/coursesShowcase";
import CoursesShowcaseView from "./components/pages/coursesShowcase/coursesShowcaseView";

function App() {
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 1);
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      easing: "ease-in-out", // animation timing function
      once: true, // animation only happens once
    });
  }, []);

  return (
    <div className="wrapper">
      <ScrollTop />

      <Routes>
        <Route path="/" element={<Site />}>
          <Route index element={<Home />} />
          <Route path="courses/:slug" element={<Course />} />
          <Route path="courses" element={<Courses />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/admin/" element={<Pages />}>
          {/* <Route index element={<Home />} /> */}

          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/view/:id" element={<UserView />} />

          <Route path="pages" element={<Menu />} />
          <Route path="pages/create" element={<MenuCreate />} />
          <Route path="pages/view/:id" element={<MenuView />} />

          <Route path="teacher" element={<TeachersAdmin />} />
          <Route path="teacher/create" element={<TeacherCreate />} />
          <Route path="teacher/view/:id" element={<TeacherView />} />

          <Route path="setting" element={<LangSetting />} />
          <Route path="setting/create" element={<LangSettingCreate />} />
          <Route path="setting/view/:id" element={<LangSettingView />} />

          <Route path="news" element={<News />} />
          <Route path="news/create" element={<NewsCreate />} />
          <Route path="news/view/:id" element={<NewsView />} />

          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/create" element={<AdminCoursesCreate />} />
          <Route path="courses/view/:id" element={<AdminCoursesView />} />

          <Route path="about" element={<CoursesCategory />} />
          <Route path="about/create" element={<CoursesCategoryCreate />} />
          <Route path="about/view/:id" element={<CoursesCategoryView />} />

          <Route path="showcase" element={<Showcase />} />
          <Route path="showcase/create" element={<ShowcaseCreate />} />
          <Route path="showcase/view/:id" element={<ShowcaseView />} />

          <Route path="order" element={<Order />} />
          <Route path="order/view/:id" element={<OrderView />} />

          <Route path="courses-showcase" element={<CoursesShowcase />} />
          <Route
            path="courses-showcase/view/:id"
            element={<CoursesShowcaseView />}
          />
        </Route>
      </Routes>

      <NotificationContainer />
    </div>
  );
}

export default App;
