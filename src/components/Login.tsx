import { ChangeEvent, useState } from "react";
import "./Login.css";
import { signIn } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogIn } from "../auth/index";

const Login = () => {
  let [authMode, setAuthMode] = useState("signin");

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    field: any
  ) => {
    let actualValue = event.target.value;
    setLoginDetail({ ...loginDetail, [field]: actualValue });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    signIn(loginDetail)
      .then((data: string) => {
        console.log(data);
        doLogIn(data, () => {
          console.log("Log In details save to local storage");
          window.location.replace("/home");
        });
        toast.success("Logged In");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <>
        <section className="vb-100">
          <div>
            <nav className="navbar" style={{ backgroundColor: "#0478c2" }}>
              <div className="container justify-content-center ">
                <a
                  className="navbar-brand text-center fw-bold"
                  href="#"
                  style={{ color: "white" }}
                >
                  <h1>Smart Contact Manager</h1>
                </a>
              </div>
            </nav>
          </div>
          <div className="container h-100 ">
            <div className="row d-flex justify-content-center align-itmes-center h-100">
              <div className="card text-black mt-3  border-0" id="card">
                <div className="card-body p-md-3">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 col-xl-6">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign In
                      </p>
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-outline mb-3">
                          <label className="form-label h5">Email address</label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter a valid email address"
                            value={loginDetail.username}
                            onChange={(e) => handleChange(e, "username")}
                            required
                          />
                        </div>

                        <div className="form-outline mb-3">
                          <label className="form-label h5">Password</label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter password"
                            value={loginDetail.password}
                            onChange={(e) => handleChange(e, "password")}
                            required
                          />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3"
                            />
                            <label className="form-check-label h5">
                              Remember me
                            </label>
                          </div>
                          <a href="#!" className="text-body h5">
                            Forgot password?
                          </a>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            id="loginBtn"
                          >
                            Login
                          </button>
                          <p className="medium fw-bold mt-2 pt-1 mb-0">
                            Don't have an account?{" "}
                            <a href="/register" className="link-danger h5">
                              Register
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return null;
  }
};
export default Login;