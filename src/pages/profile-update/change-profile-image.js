import { React, Component } from 'react';
import Layout from "../components/layout";

import ExpertRegistrationForm from "../components/Forms/expertRegistrationForm"



export default class ApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
    }

    render() {
        return (
            <Layout>
              <div
                  css={{
                    background: "white",
                    padding: "3em 1em",
                  }}
                    >
                   <div className = "content">
                       <h1>update profile image</h1>
                    </div>
                </div>
        </Layout>

           
        )
    }
    }
    