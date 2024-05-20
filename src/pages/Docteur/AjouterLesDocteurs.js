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
  document.title = "Ajouter Docteur"

  const breadcrumbItems = [
    { title: "Ajouter Docteur", link: "#" },
    { title: "Formulaire", link: "#" },
    { title: "Formulaire Docteur", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Ajouter Docteur", breadcrumbItems)
  })

  const [fnm, setfnm] = useState(false)
  const [lnm, setlnm] = useState(false)
  const [unm, setunm] = useState(false)
  const [city, setcity] = useState(false)
  const [stateV, setstateV] = useState(false)

  const [nom, setNom] = useState("")
  const [prénom, setPrenom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [dateDeNaissance, setDateDeNaissance] = useState("")
  const [numéroDeTéléphone, setNumeroDeTelephone] = useState("")
  const [MotDePasse, setMotDePasse] = useState("")
  const [Email, setEmail] = useState("")
  const [specialité, setspecialité] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/create-docteur",
        {
          nom,
          prénom,
          adresse,
          dateDeNaissance,
          numéroDeTéléphone,
          MotDePasse,
          Email,
          specialité,
        },
      )
      console.log("Docteur créé avec succès:", response.data)
      toast.success("Docteur créé avec succès")

      // Réinitialiser les champs
      setNom("")
      setPrenom("")
      setAdresse("")
      setDateDeNaissance("")
      setNumeroDeTelephone("")
      setMotDePasse("")
      setEmail("")
      setspecialité("")
    } catch (error) {
      console.error("Erreur lors de la création du docteur:", error)
      toast.error(
        `Erreur lors de la création du docteur: ${error.response.data.errorMessage}`,
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
              <CardTitle className="h4">Ajouter Docteur</CardTitle>
              <p className="card-title-desc"></p>

              <AvForm>
                <AvField
                  className="mb-3"
                  name="nom"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  label="Nom  "
                  placeholder="Nom "
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="prénom"
                  value={prénom}
                  onChange={e => setPrenom(e.target.value)}
                  label="Prénom  "
                  placeholder="Prénom "
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="Email"
                  value={Email}
                  onChange={e => setEmail(e.target.value)}
                  label="Email"
                  placeholder="Email"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="motDePasse"
                  value={MotDePasse}
                  onChange={e => setMotDePasse(e.target.value)}
                  label="mot de passe"
                  placeholder="mot de passe"
                  type="password"
                />
                <AvField
                  className="mb-3"
                  name="adresse"
                  value={adresse}
                  onChange={e => setAdresse(e.target.value)}
                  label="Adresse"
                  placeholder="Adresse"
                  type="string"
                />
                <AvField
                  className="mb-3"
                  name="dateDeNaissance"
                  value={dateDeNaissance}
                  onChange={e => setDateDeNaissance(e.target.value)}
                  label="Date De Naissance"
                  placeholder="Date De Naissance"
                  type="date"
                />
                <AvField
                  className="mb-3"
                  name="numeroDeTelephone"
                  //name="Range_Value"
                  value={numéroDeTéléphone}
                  onChange={e => setNumeroDeTelephone(e.target.value)}
                  label="Numéro De Téléphone"
                  placeholder="Numéro De Téléphone"
                  type="string"
                />

                <AvField
                  className="mb-3"
                  label="Specialité"
                  name="specialité"
                  //name="Range_Value"
                  value={specialité}
                  onChange={e => setspecialité(e.target.value)}
                  placeholder="spécialité"
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
