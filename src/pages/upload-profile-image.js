import { React, Component } from 'react';
import Layout from "./components/layout";

import ProfileImageUpload from "./components/Forms/profileImageUpload"



export default class ApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploadComponent: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('profileID') === null) {
            window.location = "/"
        } else {
            this.setState({
                showUploadComponent: true
            })
        }
    }

    render() {
        return ( <div> {
                this.state.showUploadComponent && < Layout >
                <div css = {
                    {
                        background: "white",
                        padding: "3em 1em",
                    }
                } >
                <div className = "content">
                <ProfileImageUpload />
                </div> 
                </div> </Layout>
            }</div>
            )
        }
    }