import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { connect } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Voir le Stock De Sang"

  const breadcrumbItems = [
    { title: "Voir le Stock De Sang", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Table De Stock De Sang ", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/AjouterLeStockDeSang")
  }

  useEffect(() => {
    props.setBreadcrumbItems("Voir le Stock De Sang", breadcrumbItems)
  })
  const [sang, setsang] = useState([])
  const fetchsang = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sangs")
      setsang(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des stoks du sang:", error)
    }
  }
  useEffect(() => {
    fetchsang()
  }, [])
  const handleDeletestock = stockId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer ce stock?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/sang/${stockId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("stock supprimé avec succès.")
                fetchsang()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du stock a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du stock:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression du stock. Veuillez réessayer.",
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
  const [modalOpen4, setModalOpen4] = useState(false)
  const [selectedstock, setSelectedstock] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal4 = stock => {
    setSelectedstock(stock)
    setModalOpen4(true)
  }
  const handleEditstock = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-sang/${selectedstock._id}`,
        selectedstock,
      )
      console.log("stock modifié avec succès:", response.data)
      toast.success("stock modifié avec succès")
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen4(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du stock:", error)
      toast.error("Erreur lors de la modification du stock")
      //Affichez un message d'erreur ou prenez toute autre action nécessaire en cas d'échec de la modification
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
              <CardTitle className="h4">Table De Stock De Sang</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Donneur</th>
                      <th>GroupeSanguin</th>
                      <th>NuméroDeLot</th>
                      <th>Rhésus</th>
                      <th>Quantité De sang</th>
                      <th>Date De Don</th>
                      <th>Récepteur </th>
                      <th>Lieu </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sang.map(stock => (
                      <tr key={stock._id}>
                        <td>{stock.Donneur}</td>
                        <td>{stock.GroupeSanguin}</td>
                        <td>{stock.NuméroDeLot}</td>
                        <td>{stock.Rhésus}</td>
                        <td>{stock.QuantitéDisponible}</td>
                        <td>{formatDate(stock.DateDecollecte)}</td>
                        <td>{stock.récepteur}</td>
                        <td>{stock.Lieu}</td>
                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() => handleDeletestock(stock._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            onClick={() => openModal4(stock)}
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
      <Modal isOpen={modalOpen4} toggle={() => setModalOpen4(!modalOpen4)}>
        <ModalHeader toggle={() => setModalOpen4(!modalOpen4)}>
          Modifier stock
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedstock && (
            <form>
              <div className="form-group">
                <label>Groupe Sanguin</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstock.GroupeSanguin}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      GroupeSanguin: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Rhésus</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstock.Rhésus}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      Rhésus: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Date De collecte</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedstock.DateDecollecte}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      DateDecollecte: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Numéro De Lot</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstock.NuméroDeLot}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      NuméroDeLot: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>récepteur</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstock.récepteur}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      récepteur: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Donneur</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstock.Donneur}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      Donneur: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>QuantitéDisponible</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedstock.QuantitéDisponible}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      QuantitéDisponible: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Lieu</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstock.Lieu}
                  onChange={e =>
                    setSelectedstock({
                      ...selectedstock,
                      Lieu: e.target.value,
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
          <Button color="secondary" onClick={() => setModalOpen4(!modalOpen4)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditstock}>
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
