import { React, Component } from "react"

class Faq extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

render() {
    return(  
        <div className= "terms_services">
             <h1> FAQs</h1>

            <ul className = "faq">

            <li><strong><span>What Services do you render?</span></strong></li>
              <p>We provide reviews and redrafts for all sorts of documents including  CVs,  Admission Essays and cover letters. Our maximum limit is 10,000 words for reviews and 2,500 words for redraft services. Check out our products/services section for details.</p>
            <li><strong><span>How long do I have to wait?</span></strong></li>
            <p>Your waiting time depends on the turnaround time for your selected package. It could be as little as 1-2 business days for our flash package or as long as 5 days for standard. Please check our pricing page for details.</p>
            <li><strong><span>How do I get feedback?</span></strong></li>
            <p>We have an innovative portal system that allows you to monitor progress and receive feedback on your work up till the turnaround time.</p>
            <li><strong><span>Do you process requests on weekends?</span></strong></li>
            <p>No, we don’t. We would be happy to serve and take any requests you may have during business hours.</p>
            <li><strong><span>How do you arrange consultations?</span></strong></li>
            <p>Once payment has been made for the selected service and an appointment booked, a member of our team will put a call through on any of the preferred platforms you’ve chosen.</p>
            <li><strong><span>Can I get multiple revisions?</span></strong></li>
            <p>The number of reviews you can get for your work will be capped by the type of package you select. At the very least all our packages come with one revision slot. Check our products/services section for details.</p>
           <li><strong><span>Do you give discounts?</span></strong></li>
            <p>Absolutely. We have special promotions for referrals and their referees. For every person referred, there is a 5% discount for both the referee and the referral on their next request with us. For more than three separate requests with us, a 10% discount is applied on the total. So for a client doing 2 essay reviews and 1 cv review, at flash price, a 10% discount of N6500 (N25000 + N25,000 + N15,000) would be applied. For this to apply, all orders have to be placed at the same time and must be up to 3.</p>
            </ul>
        </div>
    )
}
}
export default Faq