import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { AvRadioGroup, AvRadio } from "availity-reactstrap-validation"
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
  const [Email, setEmail] = useState("")
  const [nomPrenom, setNomPrenom] = useState("")
  const [GroupeSanguin, setGroupeSanguin] = useState("")
  const [Sexe, setSexe] = useState("")
  const [Rhésus, setRhésus] = useState("")
  const [Adresse, setAdresse] = useState("")
  const [dateHeure, setdateHeure] = useState("")
  const [dateDeNaissance, setdateDeNaissance] = useState("")
  const [numéroDeTéléphone, setnuméroDeTéléphone] = useState("")
  const [confirmation, setconfirmation] = useState("")
  const [organisateur, setorganisateur] = useState("")
  const [QuantitéDisponible, setQuantitéDisponible] = useState("")
  const [idDonneur, setidDonneur] = useState(null)
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/create-rapport",
        {
          nomPrenom,
          Email,
          GroupeSanguin,
          Rhésus,
          dateHeure,
          Adresse,
          dateDeNaissance,
          numéroDeTéléphone,
          Sexe,
          confirmation,
          organisateur,
          QuantitéDisponible,
          idDonneur: selectedDonneur,
        },
      )
      console.log("rapport créé avec succès:", response.data)
      toast.success("rapport créé avec succès")

      // Réinitialiser les champs
      setNomPrenom("")
      setGroupeSanguin("")
      setRhésus("")
      setAdresse("")
      setdateHeure("")
      setdateDeNaissance("")
      setconfirmation("")
      setorganisateur("")
      setnuméroDeTéléphone("")
      setQuantitéDisponible("")
      setSexe("")
    } catch (error) {
      console.error("Erreur lors de la création du rapport:", error)
      toast.error(
        `Erreur lors de la création du rapport: ${error.response.data.errorMessage}`,
      )
    }
  }
  const [donneurs, setDonneurs] = useState([])
  const [selectedDonneur, setSelectedDonneur] = useState("")

  useEffect(() => {
    // Fetch the list of donors from the backend
    axios
      .get("http://localhost:5000/donateurs-names")
      .then(response => {
        setDonneurs(response.data)
      })
      .catch(error => {
        console.error("There was an error fetching the donors!", error)
      })
  }, [])
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
                  name="nomPrenom"
                  value={nomPrenom}
                  onChange={e => setNomPrenom(e.target.value)}
                  label="Nom et Prénom "
                  placeholder="Nom et Prénom"
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
                  name="Adresse"
                  value={Adresse}
                  onChange={e => setAdresse(e.target.value)}
                  label="Adresse "
                  placeholder="Adresse"
                  type="text"
                />
                <AvField
                  className="mb-3"
                  name="dateDeNaissance"
                  value={dateDeNaissance}
                  onChange={e => setdateDeNaissance(e.target.value)}
                  label="Date De Naissance"
                  placeholder="Date De Naissance"
                  type="date"
                />

                <AvField
                  className="mb-3"
                  name="numeroDeTelephone"
                  //name="Range_Value"
                  value={numéroDeTéléphone}
                  onChange={e => setnuméroDeTéléphone(e.target.value)}
                  label="Numéro De Téléphone"
                  placeholder="Numéro De Téléphone"
                  type="string"
                />
                <AvField
                  className="mb-3"
                  name="Sexe"
                  value={Sexe}
                  onChange={e => setSexe(e.target.value)}
                  label="Sexe"
                  type="select"
                >
                  <option value="">Sélectionner le sexe</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </AvField>
                <AvField
                  className="mb-3"
                  name="dateHeure"
                  value={dateHeure}
                  onChange={e => setdateHeure(e.target.value)}
                  label="Date"
                  placeholder="Date"
                  type="date"
                />

                <AvField
                  className="mb-3"
                  name="organisateur"
                  value={organisateur}
                  onChange={e => setorganisateur(e.target.value)}
                  label="organisateur	"
                  type="text"
                />
                <AvField
                  type="select"
                  name="idDonneur"
                  label="Donneur"
                  onChange={e => setSelectedDonneur(e.target.value)}
                  value={selectedDonneur}
                >
                  <option value="">Sélectionnez un donneur</option>
                  {donneurs.map(donneur => (
                    <option key={donneur._id} value={donneur._id}>
                      {donneur.nom}
                    </option>
                  ))}
                </AvField>
                <AvRadioGroup
                  name="confirmation"
                  value={confirmation}
                  onChange={e => setconfirmation(e.target.value)}
                  label="Confirmation"
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
