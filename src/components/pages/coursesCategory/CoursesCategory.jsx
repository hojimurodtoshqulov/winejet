import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useJwtApi from "../../../utils/jwtApi";
import { useDispatch } from "react-redux";
import { constatns } from "../../../redux/constants";
import { changeFormType, setAbout } from "../../../redux/admin/adminSlice";

export default function CoursesCategory() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const { jwtApi } = useJwtApi();

  const handleDelete = (id) => {
    jwtApi.delete(`/about-us/${id}`).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setCount(count + 1);
      }
    });
  };

  const getItems = async () => {
    try {
      const res = await axios
        .get(`https://winejet-uz.herokuapp.com/api/about-us`)
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {}
  };

  console.log(data);

  useEffect(() => {
    getItems();
  }, [count]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">About us</h6>
              <div
                onClick={() => {
                  dispatch(changeFormType(constatns.form.creating));
                }}
              >
                <NavLink to="create" className="btn btn-dark rounded-pill ">
                  Create
                </NavLink>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data && (
                    <tr>
                      <th scope="row">{1}</th>
                      <td>{data?.titleUz}</td>
                      <td>
                        {" "}
                        <div
                          onClick={() => {
                            dispatch(setAbout(data));
                            dispatch(changeFormType(constatns.form.updating));
                          }}
                        >
                          <NavLink
                            to={`view/${data.id}`}
                            className="btn btn-info rounded-pill "
                          >
                            View
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
