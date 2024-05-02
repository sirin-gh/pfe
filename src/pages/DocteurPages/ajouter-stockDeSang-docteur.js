import React, { useEffect, useState } from "react"

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

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const FormValidations = (props) => {
  document.title = "Ajouter Le Stock De Sang";

  const breadcrumbItems = [
    { title: "Stock De Sang", link: "#" },
    { title: "Formulaire", link: "#" },
    { title: "Formulaire De Stock De Sang", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Ajouter Le Stock De Sang', breadcrumbItems)
  })


  const [fnm, setfnm] = useState(false)
  const [lnm, setlnm] = useState(false)
  const [unm, setunm] = useState(false)
  const [city, setcity] = useState(false)
  const [stateV, setstateV] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    var fnm = document.getElementById("validationTooltip01").value
    var lnm = document.getElementById("validationTooltip02").value
    var unm = document.getElementById("validationTooltipUsername").value
    var city = document.getElementById("validationTooltip03").value
    var stateV = document.getElementById("validationTooltip04").value

    if (fnm === "") {
      setfnm(false)
    } else {
      setfnm(true)
    }

    if (lnm === "") {
      setlnm(false)
    } else {
      setlnm(true)
    }

    if (unm === "") {
      setunm(false)
    } else {
      setunm(true)
    }

    if (city === "") {
      setcity(false)
    } else {
      setcity(true)
    }

    if (stateV === "") {
      setstateV(false)
    } else {
      setstateV(true)
    }

    var d1 = document.getElementsByName("validate")

    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
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
              <p className="card-title-desc">
                
                  </p>

              <AvForm>
              <AvField
                  className="mb-3"
                  name="Range_Length"
                  label="Donneur"
                  placeholder="Nom donneur"
                  type="text"
                  errorMessage="entre 5-10 chars"
                  validate={{
                    required: { value: true },
                    minLength: { value: 5 },
                    maxLength: { value: 10 },
                  }}
                />
              <AvField
    className="mb-3"
    name="Range_Value"
    label="Groupe Sanguin"
    type="select"
    errorMessage="Veuillez sélectionner un groupe sanguin"
    validate={{
        required: { value: true }
    }}
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
    name="Range_Value"
    label="Rhésus"
    type="select"
    errorMessage="erreur"
    validate={{
        required: { value: true }
    }}
>
    <option value="">Rhésus</option>
    <option value="Rhésus+">+</option>
    <option value="Rhésus-">-</option>
    
</AvField>
                <AvField
                  className="mb-3"
                  name="Range_Length"
                  label="Quantité de Sang"
                  placeholder="En L"
                  type="text"
                  errorMessage="Text between 5 - 10 chars length"
                  validate={{
                    required: { value: true },
                    minLength: { value: 5 },
                    maxLength: { value: 10 },
                  }}
                />
                <AvField
                  className="mb-3"
                  name="Min_Value"
                  label="Date de Don"
                  placeholder="...."
                  min={6}
                  type="date"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                    min: { value: 6 },
                  }}
                />
             

<AvField
                  className="mb-3"
                  name="Range_Value"
                  label="Récepteur	"
                  type="text"
                  errorMessage="erreur"
                  validate={{
                    required: { value: true },
                    min: { value: 6 },
                    max: { value: 10 },
                  }}
                />


                <FormGroup className="mb-0">
                  <div>
                    <Button type="submit" color="primary" className="ms-1">
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

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FormValidations);