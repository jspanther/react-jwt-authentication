import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import * as globals from "../Global";
import axios from "axios";

class RegisterationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: false
    };
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .email("Please enter a valid email")
              .required("Email is required"),
            password: Yup.string().required("Password is required")
          })}
          onSubmit={(
            { username, password, message },
            { setStatus, setSubmitting }
          ) => {
            setStatus();
            const h = this.props.history;
            register(username, password, h);

            async function register(email, password, h) {
              const requestOptions = {
                email: email,
                password: password
              };
              const url = globals.url;
              await axios
                .post(`${url}/register/add`, requestOptions)
                .then(res => {
                  // const { status, msg } = res.data;
                  setSubmitting(true);
                 setStatus(res.data);
                   if(res.data.status===1) {
                     setTimeout(()=>{
                      h.push('/');
                     },1000)
                    
                   }
                   else if (res.data.status === 0){
                     
                       setSubmitting(false);
                     
                   }

                  // h.push('/');
                })
                .catch(e => {
                  console.log(e);
                  setSubmitting(false);
                });

              // h.push("/");
            }
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              {status && (
                <div
                  className={
                    status.status ? "alert alert-success" : "alert alert-danger"
                  }
                >
                  {status.msg}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <Field
                  name="username"
                  type="text"
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>{" "}
                {"      "}
                <Link to="/login">
                  {<button className="btn btn-primary">Back to Login</button>}
                </Link>
                {"   "}
                {isSubmitting && (
                  <img
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    alt="lodader"
                  />
                )}
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export { RegisterationForm };
