import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Label, Form, Alert, Input, FormFeedback } from 'reactstrap';
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-dark.png";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import PropTypes from "prop-types";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from '../../components/Common/withRouter';

// actions
import { loginUser } from "../../store/actions";

const Login = (props) => {
  document.title = "Login | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  const dispatch = useDispatch();

  const [userType, setUserType] = useState('student'); // Initial user type

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "admin@themesbrand.com" || '',
      password: "123456" || '',
      userType: userType,
      //subject: '', // Additional field for teacher
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      userType: Yup.string().required("Please Select User Type"),
      //  subject: userType === 'teacher' ? Yup.string().required("Subject is required for Teachers") : Yup.string(), // Conditional validation
    }),
    onSubmit: (values) => {
      let path;
      switch (values.userType) {
        case 'docteur':
          path = '/docteur-dashboard';
          break;

        case 'admin':
          path = '/dashboard';
          break;
        case 'Staff':
          path = '/Staff-dashboard';
          break;
        case 'Receptionist':
          path = '/Receptionist-dashboard';
          break;
        case 'superadmin':
          path = '/dashboard';
          break;
        case 'Donateur':
          path = '/Donateur-dashboard';
          break;
        case 'parent':
          path = '/student-dashboard';
          break;

        default:
          path = '/';
      }
      dispatch(loginUser(values, () => props.router.navigate(path)));
    }
  });


  const selectLoginState = (state) => state.Login;
  const LoginProperties = createSelector(
    selectLoginState,
    (login) => ({
      error: login.error
    })
  );

  const {
    error
  } = useSelector(LoginProperties);

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">

                  <h3 className="text-center mt-5 mb-4">

                  </h3>

                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">Content de te revoir !</h4>
                    <Form
                      className="form-horizontal mt-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <div className="mb-3">
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="userpassword">Mot de passe</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label></Label>
                        
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeAdmin"
                            name="userType"
                            value="admin"
                            checked={userType === 'admin'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeAdmin">Admin</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeDocteur"
                            name="userType"
                            value="docteur"
                            checked={userType === 'docteur'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeDocteur">Docteur</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeDonateur"
                            name="userType"
                            value="Donateur"
                            checked={userType === 'Donateur'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeDonateur">Donneur</label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeLibrary"
                            name="userType"
                            value="Staff"
                            checked={userType === 'Staff'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeLibrary">Staff</label>
                        </div>
                       
                       
                      </div>

                      <Row className="mb-3 mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline">Mémoriser
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-primary w-md waves-effect ">Se Connecter</button>
                        </div>
                      </Row>
                      <Row className="form-group mb-0">
                        <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock"></i> Mot de passe oublié?</Link>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};