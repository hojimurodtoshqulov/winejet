import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

function Users({ usersState, updateUsers }) {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const handleDelete = (user_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}user/delete/${user_id}`)
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
          // navigation("/admin/users", { replace: true } )
        }
      });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}user/get`).then((res) => {
      setData(res.data.data.result);
    });
  }, [count]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Users </h6>
              <NavLink to="create" className="btn btn-dark rounded-pill ">
                Create
              </NavLink>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ?.filter((item) => item?.username !== "")
                    .map(function (item, index) {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.username}</td>
                          <td>
                            <NavLink
                              to={`view/${item.user_id}`}
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
                              onClick={() => handleDelete(item.user_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
