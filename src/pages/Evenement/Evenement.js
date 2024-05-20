import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { confirmAlert } from "react-confirm-alert" // Importez la fonction confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Card, CardBody, Col, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import listPlugin from "@fullcalendar/list"

import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "../../store/actions"
import DeleteModal from "./DeleteModal"

const Calendrier = props => {
  document.title = "Calendrier"

  const { events, categories, onGetCategories, onGetEvents } = props
  const [setCalenderView, updatedCalenderView] = useState("dayGridMonth")
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [modalcategory, setModalcategory] = useState(false)
  const [event, setEvent] = useState({})
  const [selectedDay, setSelectedDay] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  const calendarRef = useRef()
  const getApi = () => {
    const { current: calendarDom } = calendarRef

    return calendarDom ? calendarDom.getApi() : null
  }

  const changeView = (view, API) => {
    API && API.changeView(view)
  }

  useEffect(() => {
    onGetCategories()
    onGetEvents()
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
    })

    getInitialView()
    const api = getApi()
    changeView(setCalenderView, api)
  }, [onGetCategories, onGetEvents, setCalenderView])

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({})
        setIsEdit(false)
      }, 500)
    }
  }, [modal, event, isEdit])

  /**
   * Handling the modal state
   */
  const toggle = () => {
    setModal(!modal)
  }

  const toggleCategory = () => {
    setModalcategory(!modalcategory)
  }

  /**
   * Handling date click on calendar
   */
  const handleDateClick = arg => {
    setSelectedDay(arg)
    toggle()
  }

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    })
    setIsEdit(true)
    toggle()
  }

  /**
   * Handling submit event on event form
   */
  const handleValidEventSubmit = (e, values) => {
    const { onAddNewEvent, onUpdateEvent } = props
    if (isEdit) {
      const updateEvent = {
        id: event.id,
        title: values.title,
        classNames: values.category + " text-white",
        start: event.start,
      }
      // update event
      onUpdateEvent(updateEvent)
    } else {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.category + " text-white",
      }
      // save new event
      onAddNewEvent(newEvent)
    }
    setSelectedDay(null)
    toggle()
  }

  const handleValidEventSubmitcategory = values => {
    const { onAddNewEvent } = props

    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: values["title_category"],
      start: selectedDay ? selectedDay.date : new Date(),
      className: values.event_category + " text-white",
    }
    // save new event

    onAddNewEvent(newEvent)
    toggleCategory()
  }

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    const { onDeleteEvent } = props
    onDeleteEvent(event)
    setDeleteModal(false)
    toggle()
  }

  /**
   * On category darg event
   */
  const onDrag = event => {
    event.preventDefault()
  }

  /**
   * On calendar drop event
   */
  const onDrop = event => {
    const { onAddNewEvent } = props
    const draggedEl = event.draggedEl
    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: draggedEl.innerText,
      start: event.date,
      className: draggedEl.className,
    }
    onAddNewEvent(newEvent)
  }

  const getInitialView = () => {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      updatedCalenderView("dayGridWeek")
    } else if (window.innerWidth <= 768) {
      updatedCalenderView("listWeek")
    } else {
      updatedCalenderView("dayGridMonth")
    }
  }

  //BreadCrumd add
  const breadcrumbItems = [
    { title: "Événement", link: "#" },
    { title: "Calendrier", link: "#" },
  ]

  useEffect(() => {
    props.onSetBreadCrumbs("Événement", breadcrumbItems)
  })
  const [evenemets, setevenemets] = useState([])
  const fetchevenements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/evenements")
      setevenemets(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des evenements:", error)
    }
  }
  useEffect(() => {
    fetchevenements()
  }, [])
  const [titre, settitre] = useState("")
  const [description, setdescription] = useState("")
  const [date, setdate] = useState("")

  const [donneur, setDonneur] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/create-evenement",
        {
          titre,
          description,
          date,
        },
      )
      console.log("évenement créé avec succès:", response.data)
      toast.success("évenement créé avec succès")

      // Réinitialiser les champs
      settitre("")
      setdate("")
      setdescription("")
    } catch (error) {
      console.error("Erreur lors de la création d'évenement:", error)
      toast.error(
        `Erreur lors de la création d'évenement: ${error.response.data.errorMessage}`,
      )
    }
  }
  const [modalOpen17, setModalOpen17] = useState(false)

  // Définissez une fonction pour ouvrir le modal et stocker les informations du donateur sélectionné
  const openModal17 = evenement => {
    setselectedevenement(evenement)
    setModalOpen17(true)
  }
  const [selectedevenement, setselectedevenement] = useState(null)
  const handleEditevenement = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-evenement/${selectedevenement._id}`,
        selectedevenement,
      )
      console.log("évenement modifié avec succès:", response.data)
      toast.success("réservation modifié avec succès") // Afficher un toast de succès
      // Ajoutez ici toute autre logique que vous souhaitez exécuter après la modification du donateur
      setModalOpen17(false) // Fermer le modal après la modification réussie
    } catch (error) {
      console.error("Erreur lors de la modification d'évenement:", error)
      toast.error("Erreur lors de la modification d'évenement")
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
  const handleDeleteevenement = evenementId => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer cette évenement?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:5000/evenement/${evenementId}`,
                {
                  method: "DELETE",
                },
              )
              if (response.ok) {
                alert("évenement supprimé avec succès.")
                fetchevenements()
                // Ajoutez ici toute autre logique que vous souhaitez exécuter après la suppression du donateur
              } else {
                throw new Error("La suppression d'évenement a échoué.")
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression d'évenement:",
                error.message,
              )
              alert(
                "Erreur lors de la suppression d'évenement. Veuillez réessayer.",
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

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />

      <Row className="mb-4">
        <Col xl={3}>
          <Card>
            <CardBody className="d-grid">
              <div className="d-grid">
                <Button
                  color="primary"
                  className="btn-block"
                  onClick={toggleCategory}
                >
                  <i className="mdi mdi-plus-circle-outline" /> Créer un nouvel
                  événement
                </Button>
              </div>
              <div id="external-events">
                <br />
                <p className="text-muted">
                  Glissez et déposez votre événement ou cliquez dans le
                  calendrier
                </p>
                {categories &&
                  categories.map((category, i) => (
                    <div
                      className={`external-event fc-event ${category.type} text-white`}
                      key={"cat-" + category.id}
                      draggable
                      onDrag={event => onDrag(event, category)}
                    >
                      <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                      {category.title}
                    </div>
                  ))}
              </div>

              <div className="mt-5">
                <h5 className="font-size-14 mb-4">Activité récente :</h5>

                <ul className="list-unstyled activity-feed ms-1">
                  {evenemets.map(evenement => (
                    <li className="feed-item">
                      <div className="feed-item-list">
                        <div>
                          <div className="date">
                            {formatDate(evenement.date)}
                          </div>
                          <p className="activity-text mb-0">
                            {evenement.description}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger mr-1"
                          onClick={() => handleDeleteevenement(evenement._id)}
                        />
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-warning"
                          style={{ marginLeft: 20 }}
                          onClick={() => openModal17(evenement)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col className="col-xl-9">
          <div className="card mt-4 mt-xl-0 mb-0">
            <div className="card-body">
              {/* fullcalendar control */}
              <FullCalendar
                plugins={[
                  BootstrapTheme,
                  dayGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                handleWindowResize={true}
                themeSystem="bootstrap"
                events={evenemets}
                ref={calendarRef}
                initialView={setCalenderView}
                windowResize={getInitialView}
              />

              {/* New/Edit event modal */}
              <Modal isOpen={modal} className={props.className}>
                <ModalHeader toggle={toggle} tag="h4">
                  {!!isEdit ? "Modifier l'événement" : "Ajouter un événement"}
                </ModalHeader>
                <ModalBody>
                  <AvForm onValidSubmit={handleValidEventSubmit}>
                    <Row form>
                      <Col className="col-12 mb-3">
                        <AvField
                          name="title"
                          label="Nom de l'événement"
                          type="text"
                          value={event ? event.title : ""}
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          type="select"
                          name="category"
                          label="Sélectionnez la catégorie"
                          value={event ? event.category : "bg-primary"}
                        >
                          <option value="bg-danger">Danger</option>
                          <option value="bg-success">Succès</option>
                          <option value="bg-primary">Primaire</option>
                          <option value="bg-info">Info</option>
                          <option value="bg-dark">Sombre</option>
                          <option value="bg-warning">Avertissement</option>
                        </AvField>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggle}
                          >
                            Fermer
                          </button>
                          {!!isEdit && (
                            <button
                              type="button"
                              className="btn btn-danger me-2"
                              onClick={() => setDeleteModal(true)}
                            >
                              Supprimer
                            </button>
                          )}
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            Sauvegarder
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={modalcategory}
                toggle={toggleCategory}
                className={props.className}
              >
                <ModalHeader toggle={toggleCategory} tag="h4">
                  Ajouter un évenement
                </ModalHeader>
                <ModalBody>
                  <AvForm>
                    <Row form>
                      <Col className="col-12 mb-3">
                        <AvField
                          className="mb-3"
                          name="titre"
                          value={titre}
                          onChange={e => settitre(e.target.value)}
                          label="titre"
                          placeholder="titre"
                          type="text"
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          className="mb-3"
                          name="date"
                          value={date}
                          onChange={e => setdate(e.target.value)}
                          label="date"
                          placeholder="date"
                          min={6}
                          type="date"
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          className="mb-3"
                          name="description"
                          value={description}
                          onChange={e => setdescription(e.target.value)}
                          label="description"
                          placeholder="description"
                          type="text"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-right">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggleCategory}
                          >
                            Fermer
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                            onClick={handleSubmit}
                          >
                            Sauvegarder
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Col>
      </Row>
      <Modal isOpen={modalOpen17} toggle={() => setModalOpen17(!modalOpen17)}>
        <ModalHeader toggle={() => setModalOpen17(!modalOpen17)}>
          Modifier évenement
        </ModalHeader>
        <ModalBody>
          {/* Affichez les informations du donateur dans un formulaire */}
          {selectedevenement && (
            <form>
              <div className="form-group">
                <label>description</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedevenement.description}
                  onChange={e =>
                    setselectedevenement({
                      ...selectedevenement,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedevenement.date}
                  onChange={e =>
                    setselectedevenement({
                      ...selectedevenement,
                      date: e.target.value,
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
          <Button
            color="secondary"
            onClick={() => setModalOpen17(!modalOpen17)}
          >
            Fermer
          </Button>
          <Button color="primary" onClick={handleEditevenement}>
            Modifier
          </Button>
          {/* Ajoutez ici toute autre logique pour enregistrer les modifications */}
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </React.Fragment>
  )
}

Calendrier.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  c: PropTypes.func,
  onSetBreadCrumbs: PropTypes.func,
}

const mapStateToProps = ({ calendar }) => ({
  events: calendar.events,
  categories: calendar.categories,
})

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => dispatch(getEvents()),
  onGetCategories: () => dispatch(getCategories()),
  onAddNewEvent: event => dispatch(addNewEvent(event)),
  onUpdateEvent: event => dispatch(updateEvent(event)),
  onDeleteEvent: event => dispatch(deleteEvent(event)),
  onSetBreadCrumbs: (title, breadcrumbItems) =>
    dispatch(setBreadcrumbItems(title, breadcrumbItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendrier)
