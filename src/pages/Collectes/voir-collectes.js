import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { useNavigate } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Table De Collectes"

  const breadcrumbItems = [
    { title: "Voir Collectes", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Collectes", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/ajouter-collectes")
  }
  useEffect(() => {
    props.setBreadcrumbItems("Voir Collectes", breadcrumbItems)
  })
  const [collectes, setcollectes] = useState([])
  const fetchcollects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/collectes")
      setcollectes(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des docteurs:", error)
    }
  }
  useEffect(() => {
    fetchcollects()
  }, [])
  const handleDeletecollecte = collecteId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer cette collecte?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/collecte/${collecteId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("collecte supprimé avec succès.")
                fetchcollects()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du collecte a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du collecte:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression du collecte. Veuillez réessayer.",
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
  const [modalOpen5, setModalOpen5] = useState(false)
  const [selectedcollecte, setSelectedcollecte] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal5 = collecte => {
    setSelectedcollecte(collecte)
    setModalOpen5(true)
  }
  const handleEditcollecte = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-collecte/${selectedcollecte._id}`,
        selectedcollecte,
      )
      console.log("collecte modifié avec succès:", response.data)
      toast.success("collecte modifié avec succès") // Afficher un toast de succès
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen5(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du collecte:", error)
      toast.error("Erreur lors de la modification du collecte")
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
              <CardTitle className="h4">Table De Collectes</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Date </th>
                      <th>Lieu</th>
                      <th>Objectif</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectes.map(collecte => (
                      <tr key={collecte._id}>
                        <td>{collecte._id}</td>
                        <td>{collecte.Nom}</td>
                        <td>{formatDate(collecte.date)}</td>
                        <td>{collecte.lieu}</td>
                        <td>{collecte.objectif}</td>
                        <td>{collecte.description}</td>

                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() => handleDeletecollecte(collecte._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            onClick={() => openModal5(collecte)}
                            //onClick={() => handleEditDonateur(donateur._id)}
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
      <Modal isOpen={modalOpen5} toggle={() => setModalOpen5(!modalOpen5)}>
        <ModalHeader toggle={() => setModalOpen5(!modalOpen5)}>
          Modifier collecte
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedcollecte && (
            <form>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedcollecte.Nom}
                  onChange={e =>
                    setSelectedcollecte({
                      ...selectedcollecte,
                      Nom: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedcollecte.Rhésus}
                  onChange={e =>
                    setSelectedcollecte({
                      ...selectedcollecte,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Date De collecte</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedcollecte.lieu}
                  onChange={e =>
                    setSelectedcollecte({
                      ...selectedcollecte,
                      lieu: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>objectif</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedcollecte.objectif}
                  onChange={e =>
                    setSelectedcollecte({
                      ...selectedcollecte,
                      objectif: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>description</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedcollecte.description}
                  onChange={e =>
                    setSelectedcollecte({
                      ...selectedcollecte,
                      description: e.target.value,
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
          <Button color="secondary" onClick={() => setModalOpen5(!modalOpen5)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditcollecte}>
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
