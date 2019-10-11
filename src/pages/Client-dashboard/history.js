import {React,Component} from "react"
import Footer from '../components/Footer'
import MainLayout from "../components/ClientAccountComponents/mainLayout"

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    return (
      <div>
        <MainLayout />
          <div className = "main-content"> 
            <p>History</p>
          </div>

         <Footer />
      </div>
    )
  }
}
export default History
