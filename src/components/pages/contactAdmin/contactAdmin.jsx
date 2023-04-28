import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useJwtApi from "../../../utils/jwtApi";

import Spinner from "../../spinner";

export default function ContactAdmin() {
  const { t, i18n } = useTranslation();
  const [{ page, api }, setLoading] = useState({});

  const translatedName = i18n.language === "uz" ? "nameUz" : "nameRu";

  const { jwtApi } = useJwtApi();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const handleDelete = (id) => {
    setLoading((prev) => ({ ...prev, page: true }));
    jwtApi
      .delete(`/pages/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
        }
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, page: false }));
      });
  };

  const getPages = async () => {
    setLoading((prev) => ({ ...prev, page: true }));
    try {
      const res = await axios.get(
        `https://winejet-uz.herokuapp.com/api/contact`
      );
      setData([res?.data]);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  };
  useEffect(() => {
    getPages();
  }, [count]);

  return page ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Pages </h6>
             {/*  <NavLink to="create" className="btn btn-dark rounded-pill ">
                Create
              </NavLink> */}
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data ? (
                    data.map(function (item, index) {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>Social info</td>
                          <td></td>
                          <td>
                            <NavLink
                              to={`create`}
                              className="btn btn-info rounded-pill "
                            >
                              View
                            </NavLink>
                          </td>
                          {/* <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-danger rounded-pill "
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td> */}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Not found</td>
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
