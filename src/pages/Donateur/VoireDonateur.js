import React, { useEffect, useState } from "react"
import axios from "axios"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const BasicTable = props => {
  document.title = "Table De Donneurs"

  const breadcrumbItems = [
    { title: "Voir Donneurs", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Donneurs", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Table De Donneurs", breadcrumbItems)
  }, [])
  const navigate = useNavigate()
  const handleClick = () => {
    // Navigate to the desired route
    navigate("/AjouterDonneurs")
  }
  const [donateurs, setDonateurs] = useState([])
  const fetchDonateurs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/donateurs")
      setDonateurs(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des donateurs:", error)
    }
  }
  useEffect(() => {
    fetchDonateurs()
  }, [])
  const handleDeleteDonateur = donateurId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer ce donateur?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/donateur/${donateurId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("Donateur supprimé avec succès.")
                fetchDonateurs()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du donateur a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du donateur:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression du donateur. Veuillez réessayer.",
              )
            }
          },
        },
        {
          label: "Non",
          onClick: () => {}, // Aucune action nécessaire en cas de non confirmation
        },
      ],
    })
  }
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDonateur, setSelectedDonateur] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal = donateur => {
    setSelectedDonateur(donateur)
    setModalOpen(true)
  }
  const handleEditDonateur = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update/${selectedDonateur._id}`,
        selectedDonateur,
      )
      console.log("Donateur modifié avec succès:", response.data)
      toast.success("donateur modifié avec succès")
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du donateur:", error)
      toast.error("Erreur lors de la modification du donateur")
      // Affichez un message d'erreur ou prenez toute autre action nécessaire en cas d'échec de la modification
    }
  }
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <button
            onClick={handleClick}
            className="btn btn-primary btn-lg "
            style={{ marginBottom: "20px" }}
          >
            Ajouter
          </button>
          <Card>
            <CardBody>
              <CardTitle className="h4">Table De Donneurs</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Date De Naissance</th>
                      <th>Numéro De Téléphone</th>

                      <th>Groupe Sanguin</th>
                      <th>Sexe</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donateurs.map(donateur => (
                      <tr key={donateur._id}>
                        <td>{donateur._id}</td>
                        <td>{donateur.nom}</td>
                        <td>{donateur.prénom}</td>
                        <td>{donateur.Email}</td>
                        <td>{donateur.adresse}</td>
                        <td>{formatDate(donateur.dateDeNaissance)}</td>
                        <td>{donateur.numéroDeTéléphone}</td>
                        <td>{donateur.GroupeSanguin}</td>
                        <td>{donateur.Sexe}</td>
                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() => handleDeleteDonateur(donateur._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            //onClick={() => handleEditDonateur(donateur._id)}
                            onClick={() => openModal(donateur)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Modifier Donateur
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedDonateur && (
            <form>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedDonateur.nom}
                  onChange={e =>
                    setSelectedDonateur({
                      ...selectedDonateur,
                      nom: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedDonateur.prénom}
                  onChange={e =>
                    setSelectedDonateur({
                      ...selectedDonateur,
                      prénom: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>adresse</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedDonateur.adresse}
                  onChange={e =>
                    setSelectedDonateur({
                      ...selectedDonateur,
                      adresse: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>date De Naissance</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDonateur.dateDeNaissance}
                  onChange={e =>
                    setSelectedDonateur({
                      ...selectedDonateur,
                      dateDeNaissance: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>numéro De Téléphone</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedDonateur.numéroDeTéléphone}
                  onChange={e =>
                    setSelectedDonateur({
                      ...selectedDonateur,
                      numéroDeTéléphone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={selectedDonateur.Email}
                  onChange={e =>
                    setSelectedDonateur({
                      ...selectedDonateur,
                      Email: e.target.value,
                    })
                  }
                />
              </div>
              {/* Affichez les autres champs du formulaire avec les informations du donateur */}
              {/* Assurez-vous de fournir des champs modifiables si vous souhaitez permettre la modification */}
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditDonateur}>
            Modifier
          </Button>
          {/* Ajoutez ici toute autre logique pour enregistrer les modifications */}
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BasicTable)
