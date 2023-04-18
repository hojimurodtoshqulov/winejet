import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { changeFormType } from "../../../redux/admin/adminSlice";
import { constatns } from "../../../redux/constants";
import { NotificationManager } from "react-notifications";

function TeachersAdmin({ usersState, updateUsers }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/teachers/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
          NotificationManager.success("Teacher deleted", "Success!");
          // navigation("/admin/users", { replace: true } )
        }
      })
      .catch((err) => {
        NotificationManager.error("Something went wrong", "Error!");
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/teachers`).then((res) => {
      setData(res.data);
    });
  }, [count]);

  console.log(data);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Teachers </h6>
              <NavLink
                onClick={() => {
                  dispatch(changeFormType(constatns.form.creating));
                }}
                to="create"
                className="btn btn-dark rounded-pill "
              >
                Create
              </NavLink>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    data
                      ?.filter((item) => item?.name_ru !== "")
                      .map(function (item, index) {
                        console.log(item);
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item?.fullName}</td>
                            <td>
                              <NavLink
                                to={`view/${item?.id}`}
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
                                onClick={() => handleDelete(item?.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <h4>No data</h4>
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

export default TeachersAdmin;
