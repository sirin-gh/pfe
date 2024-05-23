import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Form,
  Alert,
  Input,
  FormFeedback,
} from "reactstrap"

import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import PropTypes from "prop-types"
import axios from "axios"
// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"
import withRouter from "../../components/Common/withRouter"
import { useNavigate } from "react-router-dom"
import Navbar from "components/partieHome/Navbar/Navbar"

const Login = props => {
  document.title = "Login | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const validation = useFormik({
    enableReinitialize: true,

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      userType: Yup.string().required("Please Select User Type"),
      //  subject: userType === 'teacher' ? Yup.string().required("Subject is required for Teachers") : Yup.string(), // Conditional validation
    }),
  })

  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "", // Valeur par défaut du type d'utilisateur
  })
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/login", formData)
      // Traitez la réponse ici (par exemple, stockez le jeton d'authentification)
      const userType = response.data.user.userType // Supposons que la réponse contient le type d'utilisateur
      console.log("usertype", userType)

      if (userType === "admin") {
        // Redirigez vers le tableau de bord de l'administrateur
        navigate("/dashboard")
      } else if (userType === "docteur") {
        // Redirigez vers le tableau de bord du docteur
        navigate("/VoirDonneur-Docteur")
      } else if (userType === "donateur") {
        localStorage.setItem("idDonneur", response.data.user._id)
        // Redirigez vers le tableau de bord du donateur
        navigate("/voir-StockDeSang-Donneur")
      } else if (userType === "staff") {
        // Redirigez vers le tableau de bord du staff
        navigate("/VoirDonneur-Staff")
      } else {
        // Type d'utilisateur inconnu, gérer en conséquence
        setError("Type d'utilisateur inconnu.")
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.") // Gestion des erreurs éventuelles
    }
  }
  return (
    <React.Fragment>
      <Navbar/>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4"></h3>

                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Content de te revoir !
                    </h4>
                    <Form
                      className="form-horizontal mt-4"
                      //onSubmit={handleSubmit}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <div className="mb-3">
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="userpassword">Mot de passe</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
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
                            checked={formData.userType === "admin"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="userTypeAdmin"
                          >
                            Admin
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeDocteur"
                            name="userType"
                            value="docteur"
                            checked={formData.userType === "docteur"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="userTypeDocteur"
                          >
                            Docteur
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeDonateur"
                            name="userType"
                            value="donateur"
                            checked={formData.userType === "donateur"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="userTypeDonateur"
                          >
                            Donneur
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeStaff"
                            name="userType"
                            value="staff"
                            checked={formData.userType === "staff"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="userTypeLibrary"
                          >
                            Staff
                          </label>
                        </div>
                      </div>

                      <Row className="mb-3 mt-4">
                        <div className="col-6">
                          
                        </div>
                        <div className="col-6 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect"
                            onClick={handleSubmit}
                          >
                            Se Connecter
                          </button>
                        </div>
                      </Row>
                      
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
