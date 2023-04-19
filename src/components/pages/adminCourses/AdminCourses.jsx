import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { constatns } from "../../../redux/constants";
import { changeFormType } from "../../../redux/admin/adminSlice";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

export default function AdminCourses() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete(
        `http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/courses/${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          setCount(count + 1);
          axios
            .get(
              `http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/courses`
            )
            .then((res) => {
              console.log(res);
              setData(res.data);
            });
          NotificationManager.success(
            "Course succussfully deleted",
            "Success!"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error("Something went wrong", "Error!");
      });
  };

  console.log(data);

  useEffect(() => {
    axios
      .get(
        `http://Sampleapp-env.eba-ywjefhpf.eu-west-2.elasticbeanstalk.com:8080/api/courses`
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  }, [count]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Coureses </h6>
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
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data.length ? (
                    data
                      ?.filter((item) => item?.title_ru !== "")
                      .map(function (item, index) {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.titleRu}</td>
                            <td>
                              <NavLink
                                to={`view/${item.id}`}
                                className="btn btn-info rounded-pill "
                              >
                                View
                              </NavLink>
                            </td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-danger rounded-pill "
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td>No data ...</td>
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
