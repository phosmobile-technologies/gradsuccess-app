import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"

import {GET_ALL_EXPERTS} from "../graphql/queries"

class registeredExperts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            state:""
        }
}


render() {
    return(
        <Query 
        query={GET_ALL_EXPERTS}
        variables={{ account_type:"Expert" }}
        >
            {({ loading, error, data }) => {
             if (loading) return (
                <div className = "loader">
                    <div className="loader_main_content">
                        <img  src={loader} alt="gradsuccess" />
                        <h1>Loading...</h1>
                    </div>
                </div>
                )
              if (error) return <div>failed to load data</div>
              return (
                <div className="form_preview">
                    <div className="form_preview_inner">
                        <div className="form_preview_col_1">

                            {data.getExperts === null ?
                                    <div className = "client_expert_listing_main">
                                        <h4>No Item Available</h4>
                                    </div>:
                                    data.getExperts.map((Expert,index) =>
                                        <div key = {index}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Expert.first_name + " " + Expert.last_name}</h4>
                                                    <p>{Expert.phone}</p>
                                                    <p>{Expert.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            
                        </div>
                    </div>
                </div>
              );
            }}
        </Query>
    )
}

}
export default registeredExperts