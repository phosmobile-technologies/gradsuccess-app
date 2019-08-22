import {React,Component} from "react"
import Footer from '../components/Footer'

import MainLayout from "../components/ClientAccountComponents/mainLayout"

import { ThemeProvider } from '@livechat/ui-kit'

class Message extends Component {
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
                  <p>Message</p>
          </div>
          <div className = "footer-hide">
            <Footer />
          </div>
      </div>
    )
  }
}
export default Message
