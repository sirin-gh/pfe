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
  document.title = "Table De Docteurs"

  const breadcrumbItems = [
    { title: "Voir Docteur", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Tables De Docteur", link: "#" },
  ]
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the desired route
    navigate("/AjouterDocteurs")
  }
  useEffect(() => {
    props.setBreadcrumbItems("Voir Docteur", breadcrumbItems)
  })
  const [docteurs, setdocteurs] = useState([])
  const fetchDocteurs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/docteurs")
      setdocteurs(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des docteurs:", error)
    }
  }
  useEffect(() => {
    fetchDocteurs()
  }, [])
  const handleDeleteDocteur = DocteurId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer ce docteur?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/docteur/${DocteurId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("docteur supprimé avec succès.")
                fetchDocteurs()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression du docteur a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression du docteur:",
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
  const [modalOpen3, setModalOpen3] = useState(false)
  const [selecteddocteur, setSelecteddocteur] = useState(null)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal3 = docteur => {
    setSelecteddocteur(docteur)
    setModalOpen3(true)
  }
  const handleEditdocteur = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-docteur/${selecteddocteur._id}`,
        selecteddocteur,
      )
      console.log("docteur modifié avec succès:", response.data)
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen3(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification du docteur:", error)
      // Affichez un message d'erreur ou prenez toute autre action nécessaire en cas d'échec de la modification
    }
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
              <CardTitle className="h4">Table De Docteurs</CardTitle>

              <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Date Naissance</th>
                      <th>Num Tél</th>

                      <th>Specialité</th>
                      {/* <th>Expérience clinique</th>
                     <th>Num de licence</th>*/}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docteurs.map(staf => (
                      <tr key={staf._id}>
                        <td>{staf._id}</td>
                        <td>{staf.nom}</td>
                        <td>{staf.prénom}</td>
                        <td>{staf.Email}</td>
                        <td>{staf.adresse}</td>
                        <td>{staf.dateDeNaissance}</td>
                        <td>{staf.numéroDeTéléphone}</td>
                        <td>{staf.specialité}</td>

                        {/* Affichez les autres informations du donateur ici */}
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger mr-1"
                            onClick={() => handleDeleteDocteur(staf._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-warning"
                            style={{ marginLeft: 20 }}
                            onClick={() => openModal3(staf)}
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
      <Modal isOpen={modalOpen3} toggle={() => setModalOpen3(!modalOpen3)}>
        <ModalHeader toggle={() => setModalOpen3(!modalOpen3)}>
          Modifier docteur
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selecteddocteur && (
            <form>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={selecteddocteur.nom}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
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
                  value={selecteddocteur.prénom}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
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
                  value={selecteddocteur.adresse}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
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
                  value={selecteddocteur.dateDeNaissance}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
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
                  value={selecteddocteur.numéroDeTéléphone}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
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
                  value={selecteddocteur.Email}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
                      Email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>specialité</label>
                <input
                  type="text"
                  className="form-control"
                  value={selecteddocteur.specialité}
                  onChange={e =>
                    setSelecteddocteur({
                      ...selecteddocteur,
                      specialité: e.target.value,
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
          <Button color="secondary" onClick={() => setModalOpen3(!modalOpen3)}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditdocteur}>
            Modifier
          </Button>
          {/* Ajoutez ici toute autre logique pour enregistrer les modifications */}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BasicTable)
