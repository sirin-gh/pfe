import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { useNavigate } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const BasicTable = props => {
  document.title = "Table De Staff"

  const breadcrumbItems = [
    { title: "Voir Staff", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Staff", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/AjouterStaff")
  }
  useEffect(() => {
    props.setBreadcrumbItems("Voir Staff", breadcrumbItems)
  })
  const [staff, setstaff] = useState([])
  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staff")
      setstaff(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des staff:", error)
    }
  }
  useEffect(() => {
    fetchStaff()
  }, [])
  const handleDeletestaff = staffId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer ce staff?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/staff/${staffId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("staff supprimé avec succès.")
                fetchStaff()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du staff a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du staff:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression du staff. Veuillez réessayer.",
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
  const [modalOpen2, setModalOpen2] = useState(false)
  const [selectedstaff, setSelectedstaff] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal2 = staff => {
    setSelectedstaff(staff)
    setModalOpen2(true)
  }
  const handleEditstaff = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-staff/${selectedstaff._id}`,
        selectedstaff,
      )
      console.log("staff modifié avec succès:", response.data)
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen2(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du staff:", error)
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
              <CardTitle className="h4">Table De Staff</CardTitle>

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

                      <th>Position</th>
                      <th>Statut d'emploi</th>
                      <th>Département </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map(staf => (
                      <tr key={staf._id}>
                        <td>{staf._id}</td>
                        <td>{staf.nom}</td>
                        <td>{staf.prénom}</td>
                        <td>{staf.Email}</td>
                        <td>{staf.adresse}</td>
                        <td>{formatDate(staf.dateDeNaissance)}</td>
                        <td>{staf.position}</td>
                        <td>{staf.numéroDeTéléphone}</td>
                        <td>{staf.StatutDemploi}</td>
                        <td>{staf.Département}</td>
                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() => handleDeletestaff(staf._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            onClick={() => openModal2(staf)}
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
      <Modal isOpen={modalOpen2} toggle={() => setModalOpen2(!modalOpen2)}>
        <ModalHeader toggle={() => setModalOpen2(!modalOpen2)}>
          Modifier staff
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedstaff && (
            <form>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstaff.nom}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
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
                  value={selectedstaff.prénom}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
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
                  value={selectedstaff.adresse}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
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
                  value={selectedstaff.dateDeNaissance}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
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
                  value={selectedstaff.numéroDeTéléphone}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
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
                  value={selectedstaff.Email}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
                      Email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>position</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstaff.position}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
                      position: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Statut D'emploi</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstaff.StatutDemploi}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
                      StatutDemploi: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Département</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedstaff.Département}
                  onChange={e =>
                    setSelectedstaff({
                      ...selectedstaff,
                      Département: e.target.value,
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
          <Button color="secondary" onClick={() => setModalOpen2(!modalOpen2)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditstaff}>
            Modifier
          </Button>
          {/* Ajoutez ici toute autre logique pour enregistrer les modifications */}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BasicTable)
