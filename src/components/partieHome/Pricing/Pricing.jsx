import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"

const Pricing = () => {
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <section
        className="section-big main-color"
        style={{ backgroundColor: "white" }}
      >
        <div className="container" id="pricing">
          <div className="row">
            <div className="col-md-12 pb-20 text-center">
              <h2 className="section-title mb-10">
                <span>
                  {" "}
                  Quelques{" "}
                  <strong className="primary-color">
                    Avantages de la donation de sang
                  </strong>{" "}
                </span>
              </h2>

              <div className="exp-separator center-separator">
                <div className="exp-separator-inner"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <IconList
                iconClass="fa fa-desktop"
                title="Favoriser la santé du donneur :"
                subTitle="La donation de sang peut littéralement sauver des vies. Le sang est crucial pour les interventions chirurgicales, les traitements contre le cancer, les accidents graves et de nombreuses autres situations médicales."
              />
              <IconList
                iconClass="fa fa-code"
                title="Encourager la régénération cellulaire :"
                subTitle=" La donation de sang peut favoriser la régénération cellulaire chez le donneur, ce qui peut contribuer à maintenir son bien-être général. En offrant la possibilité au corps de renouveler ses cellules, cela peut potentiellement stimuler le système immunitaire et favoriser la santé globale du donneur"
              />
              <IconList
                iconClass="fa fa-paper-plane"
                title="Réduction du risque de maladies cardiaques :"
                subTitle=" Certains chercheurs ont suggéré qu'une réduction du fer dans le sang grâce à la donation de sang pourrait réduire le risque de maladies cardiovasculaires."
              />
            </div>
            <div className="col-md-4">
              <IconList
                iconClass="fa fa-diamond"
                title="Détection de problèmes de santé "
                subTitle=" Avant de pouvoir donner du sang, les donneurs sont soumis à des tests médicaux approfondis qui peuvent parfois révéler des problèmes de santé dont ils n'étaient pas conscients."
              />
              <IconList
                iconClass="fa fa-recycle"
                title="Stimulation de cellules sanguines "
                subTitle="Stimulation de la production de cellules sanguines : La moelle osseuse est stimulée pour produire de nouvelles cellules sanguines après une donation, ce qui peut aider à maintenir un système immunitaire fort."
              />
              <IconList
                iconClass="fa fa-check"
                title="Équilibre des niveaux de fer "
                subTitle="La donation de sang aide à réduire les niveaux de fer dans le corps, ce qui peut être bénéfique pour ceux qui ont des niveaux de fer trop élevés en raison de conditions médicales telles que l'hémochromatose."
              />
            </div>
            <div className="col-md-4">
              <IconList
                iconClass="fa fa-codepen"
                title="Raccourcis Utiles"
                subTitle="Renforcement de la communauté : La donation de sang est un acte de solidarité envers sa communauté. Cela peut contribuer à renforcer les liens entre les membres de la société et à créer un sentiment de responsabilité mutuelle pour le bien-être de tous."
              />
              <IconList
                iconClass="fa fa-newspaper-o"
                title="Réduction du risque de cancer "
                subTitle=" Des études suggèrent que la réduction des niveaux de fer dans le corps grâce à la donation de sang peut être associée à un risque réduit de certains cancers."
              />
              <IconList
                iconClass="fa fa-heart-o"
                title="Création d'une réserve de sang disponible en cas d'urgence "
                subTitle=" La donation de sang contribue à maintenir une réserve constante de sang disponible pour répondre aux besoins en cas d'urgence, tels que les catastrophes naturelles, les accidents de grande ampleur ou les situations de crise médicale."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const IconList = ({ iconClass, title, subTitle }) => {
  return (
    <ul className="i-list medium">
      <li className="i-list-item">
        <div className="icon2">
          {" "}
          <i className={iconClass}></i>{" "}
        </div>
        <div className="icon-content">
          <h3 className="title">{title}</h3>
          <p className="sub-title">{subTitle}</p>
        </div>
        <div className="iconlist-timeline"></div>
      </li>
    </ul>
  )
}

export default Pricing
