import React from "react"
import AppRating from "./appRating"


class FeaturedTestimonial extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.props.openModal()
  }

  render() {
    return (
      <div className="testimonial-section">
        <div className="testimonial-inner">
          <div className="testimonial-inner-wrapper">
            <div className="item-1">
              <p>
                Being successful at earning a place with an International
                Business School is a challenging experience, but GradSuccess
                really assisted me with the application process through its
                professional and timely reviews of my essays and resume at
                affordable prices. I will definitely recommend GradSuccess to
                prospective applicants
              </p>
              <br />
              <hr />
              <h4>Babajide, MIB, Hult international business school</h4>
              <AppRating ratingValue={4} />
            </div>

            <div className="item-2">
              <p>
                I got accepted to Robison's College of Business's MBA program.
                Thank you for being a part of the application process. Your help
                in developing my essay strategy, reviewing my resume and GRE
                waiver letter went a long way. My application wouldn't have gone
                so smoothly without you. Thank you again for your help.
              </p>
              <br />
              <hr />
              <h4>
                Bukola, M.A Andrew Young School of Policy Studies, Georgia State
                University{" "}
              </h4>
              <AppRating ratingValue={4.5} />
            </div>
          </div>

          <div className="testimonial-banner">
            <h1>Over 8 years of helping applicants fulfill their dreams.</h1>
            <div onClick={this.openModal}>
              <button className="BigButtonStyles">Work With An Expert</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeaturedTestimonial
