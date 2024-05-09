import React, { useEffect, useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
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

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const FormValidations = props => {
  document.title = "Ajouter Collectes"

  const breadcrumbItems = [
    { title: "Ajouter Collectes", link: "#" },
    { title: "Formulaire", link: "#" },
    { title: "Formulaire Collectes", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Ajouter Collectes", breadcrumbItems)
  })

  const [Nom, setNom] = useState("")
  const [date, setdate] = useState("")
  const [lieu, setlieu] = useState("")
  const [objectif, setobjectif] = useState("")
  const [description, setdescription] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/create-collecte",
        {
          Nom,
          date,
          lieu,
          objectif,
          description,
        },
      )
      console.log("collecte créé avec succès:", response.data)
      toast.success("collecte créé avec succès")

      // Réinitialiser les champs
      setNom("")
      setdate("")
      setlieu("")
      setobjectif("")
      setdescription("")
    } catch (error) {
      console.error("Erreur lors de la création du collecte:", error)
      toast.error(
        `Erreur lors de la création du collecte: ${error.response.data.errorMessage}`,
      )
    }
  }

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }

  return (
    <React.Fragment>
      <Row>
        <Col xl={8}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Collectes</CardTitle>
              <p className="card-title-desc"></p>

              <AvForm>
                <AvField
                  className="mb-3"
                  name="Nom"
                  value={Nom}
                  onChange={e => setNom(e.target.value)}
                  label="Nom  "
                  placeholder="....."
                  type="text"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                    minLength: { value: 6, errorMessage: "Min 6 chars." },
                  }}
                />
                <AvField
                  className="mb-3"
                  name="Date"
                  value={Date}
                  onChange={e => setdate(e.target.value)}
                  label="Date et Heure"
                  placeholder="....s"
                  min={6}
                  type="date"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                    min: { value: 6 },
                  }}
                />

                <AvField
                  className="mb-3"
                  name="lieu"
                  value={lieu}
                  onChange={e => setlieu(e.target.value)}
                  label="Lieu"
                  placeholder="...."
                  type="text"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                    minLength: { value: 5 },
                    maxLength: { value: 10 },
                  }}
                />

                <AvField
                  className="mb-3"
                  name="objectif"
                  value={objectif}
                  onChange={e => setobjectif(e.target.value)}
                  label="Objectif"
                  placeholder="...."
                  type="string"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                  }}
                />
                <AvField
                  className="mb-3"
                  name="description"
                  value={description}
                  onChange={e => setdescription(e.target.value)}
                  label="Description"
                  placeholder="...."
                  type="text"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                  }}
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
