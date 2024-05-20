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

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const FormValidations = props => {
  document.title = "Ajouter Le Stock De Sang"

  const breadcrumbItems = [
    { title: "Stock De Sang", link: "#" },
    { title: "Formulaire", link: "#" },
    { title: "Formulaire De Stock De Sang", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Ajouter Le Stock De Sang", breadcrumbItems)
  })

  const [fnm, setfnm] = useState(false)
  const [lnm, setlnm] = useState(false)
  const [unm, setunm] = useState(false)
  const [city, setcity] = useState(false)
  const [stateV, setstateV] = useState(false)

  const [GroupeSanguin, setGroupeSanguin] = useState("")
  const [Rhésus, setRhésus] = useState("")
  const [QuantitéDisponible, setQuantitéDisponible] = useState("")
  const [DateDecollecte, setDateDecollecte] = useState("")
  const [NuméroDeLot, setNuméroDeLot] = useState("")
  const [récepteur, setrécepteur] = useState("")
  const [Donneur, setDonneur] = useState("")
  const [Lieu, setLieu] = useState("")
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/create-sang", {
        GroupeSanguin,
        Rhésus,
        QuantitéDisponible,
        DateDecollecte,
        NuméroDeLot,
        récepteur,
        Donneur,
        Lieu,
      })
      console.log("sang créé avec succès:", response.data)
      toast.success("sang créé avec succès")

      // Réinitialiser les champs
      setGroupeSanguin("")
      setRhésus("")
      setQuantitéDisponible("")
      setDateDecollecte("")
      setNuméroDeLot("")
      setrécepteur("")
      setDonneur("")
      setLieu("")
    } catch (error) {
      console.error("Erreur lors de la création du Stock su sang:", error)
      toast.error(
        `Erreur lors de la création du donateur: ${error.response.data.errorMessage}`,
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
              <CardTitle className="h4">Stock Sanguin</CardTitle>
              <p className="card-title-desc"></p>

              <AvForm>
                <AvField
                  className="mb-3"
                  name="Donneur"
                  value={Donneur}
                  onChange={e => setDonneur(e.target.value)}
                  label="Donneur"
                  placeholder="Nom donneur"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="GroupeSanguin"
                  value={GroupeSanguin}
                  onChange={e => setGroupeSanguin(e.target.value)}
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
                  name="Rhésus"
                  value={Rhésus}
                  onChange={e => setRhésus(e.target.value)}
                  label="Rhésus"
                  type="select"
                >
                  <option value="">Rhésus</option>
                  <option value="Rhésus+">+</option>
                  <option value="Rhésus-">-</option>
                </AvField>
                <AvField
                  className="mb-3"
                  name="QuantitéDisponible"
                  value={QuantitéDisponible}
                  onChange={e => setQuantitéDisponible(e.target.value)}
                  label="Quantité de Sang"
                  placeholder="En L"
                  type="number"
                />
                <AvField
                  className="mb-3"
                  name="NuméroDeLot"
                  value={NuméroDeLot}
                  onChange={e => setNuméroDeLot(e.target.value)}
                  label="Numéro De Lot"
                  placeholder="Numéro De Lot"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="DateDecollecte"
                  value={DateDecollecte}
                  onChange={e => setDateDecollecte(e.target.value)}
                  type="date"
                />

                <AvField
                  className="mb-3"
                  name="récepteur"
                  value={récepteur}
                  onChange={e => setrécepteur(e.target.value)}
                  label="Récepteur	"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="Lieu"
                  value={Lieu}
                  onChange={e => setLieu(e.target.value)}
                  label="Lieu	"
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
