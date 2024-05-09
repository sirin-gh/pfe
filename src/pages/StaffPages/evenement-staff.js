import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom"

import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
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
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />

      <Row className="mb-4">
        <Col xl={3}>
          <Card>
            <CardBody className="d-grid">
              <div id="external-events">
                <br />

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
                slotDuration={"00:15:00"}
                handleWindowResize={true}
                themeSystem="bootstrap"
                headerToolbar={{
                  left: "prev,next aujourd'hui",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                }}
                events={evenemets}
                ref={calendarRef}
                initialView={setCalenderView}
                windowResize={getInitialView}
              />
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

Calendrier.propTypes = {
  evenemets: PropTypes.array,
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
  evenemets: calendar.evenemets,
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
