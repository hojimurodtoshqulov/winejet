import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJwtApi from "../../../../utils/jwtApi";
import { NotificationManager } from "react-notifications";

export default function MenuCreate() {
  const [categoryId, setCategoryId] = useState(0);
  const [{ nameUz, nameRu, link }, setState] = useState({});
  const [{ page, api }, setLoading] = useState({});

  const { jwtApi } = useJwtApi();

  const [lang, setLang] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    axios.get(`https://winejet-uz.herokuapp.com/apilang/get`).then((res) => {
      setLang(res.data.data.result);
    });
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
      const dataToSubmit = { nameUz, nameRu, link };
      console.log(dataToSubmit);
      const res = await jwtApi.post("/pages", dataToSubmit);
      console.log(res);
      NotificationManager.success("Page link created", "Success");
      navigation("/admin/pages");
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
                        Name : ru
                      </label>
                      <input
                        type="text"
                        name="nameRu"
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
