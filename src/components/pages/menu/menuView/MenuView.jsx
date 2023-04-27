import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useJwtApi from "../../../../utils/jwtApi";
import { NotificationManager } from "react-notifications";
import Spinner from "../../../spinner";
import { data, error } from "jquery";

export default function MenuCreate() {
  const [categoryId, setCategoryId] = useState(0);
  const [{ nameUz, nameRu, link, id }, setState] = useState({});
  const [{ page, api }, setLoading] = useState({});

  const { id: slug } = useParams();

  const { jwtApi } = useJwtApi();

  const navigation = useNavigate();
  useEffect(() => {
    getDataItem();
  }, [0]);

  console.log({ nameUz, nameRu, link, id });

  const getDataItem = async () => {
    setLoading((prev) => ({ ...prev, page: true }));
    try {
      const res = await axios.get(
        `https://winejet-uz.herokuapp.com/api/pages/${slug}`
      );

      setState({ ...res.data });

      console.log(res);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setState((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading((prev) => ({ ...prev, api: true }));

    try {
      const dataToSubmit = { nameUz, nameRu, link, id };
      console.log(dataToSubmit);
      const res = await jwtApi.post("/pages", dataToSubmit);
      console.log(res);
      NotificationManager.success("Page link edited", "Success");
      navigation("/admin/pages");
    } catch (error) {
      console.log(error);
      NotificationManager.success("Whoops, something went wrong", "Error");
    } finally {
      setLoading((prev) => ({ ...prev, api: false }));
    }
  };

  return page ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Edit the page link</h6>
            <ul
              className="nav nav-pills mb-3"
              id="pills-tab"
              role="tablist"
            ></ul>
            <div className="tab-content" id="pills-tabContent">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title_ru" className="form-label">
                        Name : ru
                      </label>
                      <input
                        type="text"
                        name="nameRu"
                        value={nameRu}
                        // lang={item.key}

                        onChange={handleChange}
                        className="form-control"
                        id="title_ru"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title_uz" className="form-label">
                        Name : uz
                      </label>

                      <input
                        value={nameUz}
                        type="text"
                        name="nameUz"
                        onChange={handleChange}
                        className="form-control"
                        id="title_uz"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="options" className="form-label">
                        Href
                      </label>
                      <input
                        value={link}
                        type="text"
                        name="link"
                        onChange={handleChange}
                        className="form-control"
                        id="options"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigation("/admin/pages");
                  }}
                  className="btn btn-warning me-3"
                >
                  Back
                </button>
                <button
                  disabled={api}
                  type="submit"
                  className="btn btn-primary"
                >
                  {api ? "Loading..." : "Edit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
