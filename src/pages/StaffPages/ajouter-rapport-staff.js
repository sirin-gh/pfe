import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import axios from "axios"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const FormValidations = props => {
  document.title =
    "Ajouter rapport | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Ajouter rapport", link: "#" },
    { title: "Formulaire", link: "#" },
    { title: "Formulaire rapport", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Ajouter rapport", breadcrumbItems)
  })
  const [titre, setTitre] = useState("")
  const [description, setdescription] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/create-rapport",
        {
          titre,
          description,
        },
      )
      console.log("rapport créé avec succès:", response.data)
      toast.success("rapport créé avec succès")

      // Réinitialiser les champs
      setTitre("")
      setdescription("")
    } catch (error) {
      console.error("Erreur lors de la création du rapport:", error)
      toast.error(
        `Erreur lors de la création du rapport: ${error.response.data.errorMessage}`,
      )
    }
  }
  return (
    <React.Fragment>
      <Row>
        <Col xl={8}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Ajouter rapport</CardTitle>
              <p className="card-title-desc"></p>

              <AvForm onValidSubmit={handleSubmit}>
                <AvField
                  className="mb-3"
                  name="titre"
                  value={titre}
                  onChange={e => setTitre(e.target.value)}
                  label="Titre "
                  placeholder="titre"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="description"
                  value={description}
                  onChange={e => setdescription(e.target.value)}
                  label="description "
                  placeholder="description"
                  type="text"
                />

                <FormGroup className="mb-0">
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      className="ms-1"
                      onClick={handleSubmit}
                    >
                      Soumettre
                    </Button>{" "}
                    <Button type="reset" color="secondary">
                      Annuler
                    </Button>
                  </div>
                </FormGroup>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FormValidations)
