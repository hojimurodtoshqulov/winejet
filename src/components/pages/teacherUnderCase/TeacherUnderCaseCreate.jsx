import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJwtApi from "../../../utils/jwtApi";
import { NotificationManager } from "react-notifications";

export default function ContactAdminCreate() {
  const [
    {
      titleUz,
      titleRu,
      descriptionUz1,
      descriptionUz2,
      descriptionRu1,
      descriptionRu2,
    },
    setState,
  ] = useState({});
  const [{ page, api }, setLoading] = useState({});

  const { jwtApi } = useJwtApi();

  const [lang, setLang] = useState([]);
  const navigation = useNavigate();

  const getItems = async () => {
    try {
      axios
        .get(`https://winejet-uz.herokuapp.com/api/teacher-under-case`)
        .then((res) => {
          console.log(res);
          setState(res.data);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getItems();
  }, [0]);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const lang = event.target.lang;
    setState((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading((prev) => ({ ...prev, api: true }));

    try {
      const dataToSubmit = {
        titleUz,
        titleRu,
        descriptionUz1,
        descriptionUz2,
        descriptionRu1,
        descriptionRu2,
        id: 1,
      };
      console.log(dataToSubmit);

      const res = await jwtApi.post("/teacher-under-case", dataToSubmit);
      console.log(res);
      NotificationManager.success("Contact info updated", "Success");
      navigation("/admin/teacher-under-case");
    } catch (error) {
      console.log(error);
      NotificationManager.success("Whoops, something went wrong", "Error");
    } finally {
      setLoading((prev) => ({ ...prev, api: false }));
    }

    // if (data.title_ru.length > 0) {
    //   data.created_on = Math.floor(data.created_on.getTime() / 1000);

    //   axios
    //     .put(
    //       `https://winejet-uz.herokuapp.com/apimenu/update/${categoryId}`,
    //       data
    //     )
    //     .then((res) => {
    //       if (res.status == 200) {
    //         navigation("/admin/menu", { replace: true });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   NotificationManager.warning(
    //     "Please fill in the fields",
    //     "Form validation",
    //     3000
    //   );
    // }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Create a page link</h6>
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
                        Title in Uzbek
                      </label>
                      <input
                        type="text"
                        name="titleUz"
                        value={titleUz}
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
                        Title in Russian
                      </label>

                      <input
                        type="text"
                        name="titleRu"
                        onChange={handleChange}
                        className="form-control"
                        id="title_uz"
                        value={titleRu}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="options" className="form-label">
                        1-description in Uzbek
                      </label>
                      <textarea
                        type="text"
                        name="descriptionUz1"
                        onChange={handleChange}
                        className="form-control"
                        id="options"
                        value={descriptionUz1}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="options1" className="form-label">
                        1-description in Russian
                      </label>
                      <textarea
                        type="text"
                        name="descriptionRu1"
                        onChange={handleChange}
                        className="form-control"
                        id="options1"
                        value={descriptionRu1}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="options2" className="form-label">
                        2-description in Uzbek
                      </label>
                      <textarea
                        type="text"
                        name="descriptionUz2"
                        onChange={handleChange}
                        className="form-control"
                        id="options2"
                        value={descriptionUz2}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="options3" className="form-label">
                        2-description in Russian
                      </label>
                      <textarea
                        type="text"
                        name="descriptionRu2"
                        onChange={handleChange}
                        className="form-control"
                        id="options3"
                        value={descriptionRu2}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigation("/admin/teacher-under-case");
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
                  {api ? "Loading..." : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
