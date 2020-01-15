import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as globals from "../Global";
import axios from "axios";

class EditUseer extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: false,
      email:'',
      password:''
    };
  }
  componentDidMount() {
    const url = globals.url;
    axios
      .get(`${url}/register/edit/` + this.props.match.params.id)
      .then(res => {
        this.setState({
          email: res.data.email,
          password: res.data.password
        });
      })
      .catch(error => {
        console.log(error);
      });
      
  } 

  render() {
    return (
      <div>
        <h2>Update</h2>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: this.state.email,
            password:this.state.password
            
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Please enter a valid email")
              .required("Email is required"),
            password: Yup.string().required("Password is required")
          })}
          onSubmit={(
            { email, password, message },
            { setStatus, setSubmitting }
          ) => {
            setStatus();
            const {id} = this.props.match.params
            const h = this.props.history;
          
               update(email,password,h,id)
            async function update(email, password, h,id) {
              const userObject = {
                email: email,
                password: password
              };
              const url = globals.url;
              await axios
                .post(`${url}/register/update/` + id, userObject)
                .then(res => {
                  const { status } = res.data;
                  setSubmitting(true);
                 setStatus(res.data);
                   if(status===1) {
                     setTimeout(()=>{
                      h.push('/');
                     },1000)
                    
                   }
                   else if (status === 0){
                     
                       setSubmitting(false);
                     
                   }
                })
                .catch(e => {
                  console.log(e);
                  setSubmitting(false);
                });
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
                <label htmlFor="email">Email</label>
                <Field
          
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
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
                  Update User
                </button>{" "}
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

export { EditUseer };
