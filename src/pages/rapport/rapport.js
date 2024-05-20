import React, { useEffect, useState } from "react"
import { Table, Row, Col, Card, CardBody } from "reactstrap"
import { connect } from "react-redux"
import axios from "axios"
import { setBreadcrumbItems } from "../../store/actions"
import { Link, useNavigate } from "react-router-dom" // Import Link from react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const BasicTable = props => {
  document.title = "Rapport"

  const breadcrumbItems = [
    { title: "Rapport", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Rapport", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/ajouter-rapport")
  }
  useEffect(() => {
    props.setBreadcrumbItems("Rapport", breadcrumbItems)
  }, [])
  const [rapports, setrapports] = useState([])
  const fetchrapports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rapports")
      setrapports(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des rapports:", error)
    }
  }
  useEffect(() => {
    fetchrapports()
  }, [])
  const handleDeleterapport = rapportId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer ce rapport?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/rapport/${rapportId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("rapport supprimé avec succès.")
                fetchrapports()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du rapport a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du rapport:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression du rapport. Veuillez réessayer.",
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
  const [modalOpen6, setModalOpen6] = useState(false)
  const [selectedrapport, setSelectedrapport] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal6 = stock => {
    setSelectedrapport(stock)
    setModalOpen6(true)
  }
  const handleEditrapport = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-rapport/${selectedrapport._id}`,
        selectedrapport,
      )
      console.log("rapport modifié avec succès:", response.data)
      toast.success("rapport modifié avec succès") // Afficher un toast de succès
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen6(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du rapport:", error)
      toast.error("Erreur lors de la modification du rapport")
      // Affichez un message d'erreur ou prenez toute autre action nécessaire en cas d'échec de la modification
    }
  }
  return (
    <React.Fragment>
      <Row>
        <Col xl={12}>
          <button
            onClick={handleClick}
            className="btn btn-primary btn-lg "
            style={{ marginBottom: "20px" }}
          >
            Ajouter
          </button>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>titre</th>
                      <th>description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rapports.map(rapport => (
                      <tr key={rapport._id}>
                        <td>{rapport._id}</td>
                        <td>{rapport.titre}</td>
                        <td>{rapport.description}</td>

                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() => handleDeleterapport(rapport._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            onClick={() => openModal6(rapport)}
                            //onClick={() => handleEditstock(donateur._id)}
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
      <Modal isOpen={modalOpen6} toggle={() => setModalOpen6(!modalOpen6)}>
        <ModalHeader toggle={() => setModalOpen6(!modalOpen6)}>
          Modifier rapport
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedrapport && (
            <form>
              <div className="form-group">
                <label>titre</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedrapport.titre}
                  onChange={e =>
                    setSelectedrapport({
                      ...selectedrapport,
                      titre: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>description</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedrapport.description}
                  onChange={e =>
                    setSelectedrapport({
                      ...selectedrapport,
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
          <Button color="secondary" onClick={() => setModalOpen6(!modalOpen6)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditrapport}>
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
