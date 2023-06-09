import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { constatns } from "../../../redux/constants";
import { changeFormType } from "../../../redux/admin/adminSlice";
export default function Showcase() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const { i18n } = useTranslation();

  const dipatch = useDispatch();
  console.log(data);

  const handleDelete = (id) => {
    axios
      .delete(`https://winejet-uz.herokuapp.com/api/show-keys/${id}`)
      .then((res) => {
        if (res.status == 200) {
          getItems();
          setCount(count + 1);
        }
      });
  };

  const descLan = i18n.language === "uz" ? "titleUz" : "titleRu";

  const getItems = () => {
    axios.get(`https://winejet-uz.herokuapp.com/api/show-keys`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getItems();
  }, [count]);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Showcase</h6>
              <div
                onClick={() => {
                  dipatch(changeFormType(constatns.form.creating));
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
                    data.map(function (item, index) {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item[descLan]}</td>
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
