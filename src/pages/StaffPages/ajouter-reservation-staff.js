import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
import { AvRadioGroup, AvRadio } from "availity-reactstrap-validation"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const FormValidations = props => {
  document.title = "Ajouter Staff"

  const breadcrumbItems = [
    { title: "Ajouter réservation", link: "#" },
    { title: "Formulaire", link: "#" },
    { title: "Formulaire réservation", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Ajouter Résevation", breadcrumbItems)
  })

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
  const [nomPrenom, setnomPrenom] = useState("")
  const [dateHeure, setdateHeure] = useState("")
  const [groupeSanguin, setgroupeSanguin] = useState("")
  const [emplacement, setemplacement] = useState("")
  const [confirmation, setconfirmation] = useState("")

  const [donneur, setDonneur] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/create-reservation",
        {
          nomPrenom,
          dateHeure,
          groupeSanguin,
          emplacement,
          confirmation,
          donneur,
        },
      )
      console.log("réservation créé avec succès:", response.data)
      toast.success("réservation créé avec succès")

      // Réinitialiser les champs
      setnomPrenom("")
      setdateHeure("")
      setgroupeSanguin("")
      setemplacement("")
      setconfirmation("")

      setDonneur("")
    } catch (error) {
      console.error("Erreur lors de la création du réservation:", error)
      toast.error(
        `Erreur lors de la création du réservation: ${error.response.data.errorMessage}`,
      )
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col xl={8}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Résevations</CardTitle>
              <p className="card-title-desc"></p>

              <AvForm>
                <AvField
                  className="mb-3"
                  name="nomPrenom"
                  value={nomPrenom}
                  onChange={e => setnomPrenom(e.target.value)}
                  label="Nom et prénom"
                  placeholder="Nom et prénom"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="dateHeure"
                  value={dateHeure}
                  onChange={e => setdateHeure(e.target.value)}
                  label="Date et Heure"
                  placeholder="Date et Heure"
                  type="date"
                />

                <AvField
                  className="mb-3"
                  name="groupeSanguin"
                  value={groupeSanguin}
                  onChange={e => setgroupeSanguin(e.target.value)}
                  label="Groupe Sanguin"
                  type="select"
                >
                  <option value="">Sélectionner le groupe sanguin</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </AvField>
                <AvField
                  className="mb-3"
                  name="emplacement"
                  value={emplacement}
                  onChange={e => setemplacement(e.target.value)}
                  label="Emplacement"
                  placeholder="Emplacement"
                  type="text"
                />

                <AvField
                  className="mb-3"
                  name="donneur"
                  value={donneur}
                  onChange={e => setDonneur(e.target.value)}
                  label="Donateur"
                  placeholder="Donateur"
                  type="string"
                />
                <AvRadioGroup
                  name="confirmation"
                  value={confirmation}
                  onChange={e => setconfirmation(e.target.value)}
                  label="Confirmation de réservation"
                >
                  <div>
                    <AvRadio label="Oui" value="true" />
                    <AvRadio label="Non" value="false" />
                  </div>
                </AvRadioGroup>

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
