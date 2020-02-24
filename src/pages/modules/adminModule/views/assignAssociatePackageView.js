import React, { Component } from "react"
import {
  Button,
  Card,
  Elevation,
  Divider,
  RadioGroup,
  Radio,
  Callout,
} from "@blueprintjs/core"
import { navigate } from 'gatsby';
import { truncateString } from './../../commonModule/stringModifiers';

class AssignAssPackageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      associate: null,
      associateNotSelected: false,
      packageItem:null,
packageDetail:null,
associates:null,
    }
  }

  handleAssociate = e => {
    this.setState({
      associate: e.target.value,
    })
  }

  assignAssociate = () => {
    if (this.state.associate === null) {
      this.setState({
        associateNotSelected: true,
      })
    } else {
      this.props.assignAssociatePackage(this.state.associate)
    }
  }
  componentDidMount() {
    this.setState({
      packageItem: this.props.packageItem,
      packageDetail: this.props.packageItem.package,
      associates: this.props.associates,
    })
  }

  render() {
     if (this.state.packageDetail || this.state.packageItem) {
       return (
         <div className="assign-self-container">
           <Card interactive={true} elevation={Elevation.ONE}>
             {this.state.associateNotSelected && (
               <Callout className="bp3-intent-danger cart-resize">
                 <span>No Associate Selected</span>
               </Callout>
             )}
             <span>Package type:</span>
             <p>{this.state.packageDetail.package_name}</p>
             <Divider />
             <span>Package turn around time: </span>
             <p>{this.state.packageDetail.turn_around_time}</p>
             <Divider />
             <span>Package summary of interest:</span>
             <p>
               {truncateString(this.state.packageItem.summary_of_interest, 300)}
             </p>
             <Divider />

             <RadioGroup
               label="All Associates"
               onChange={this.handleAssociate}
               selectedValue={this.state.associate}
             >
               {this.state.associates.map((associate, i) => (
                 <Radio
                   label={associate.first_name + " " + associate.last_name}
                   value={associate.id}
                   large={true}
                   key={i}
                 />
               ))}
             </RadioGroup>
             <br />
             <div className="a-s-btns">
               <Button
                 className="bp3-small bp3-intent-success"
                 onClick={this.assignAssociate}
               >
                 Assign Associate
               </Button>
               <Button
                 className="bp3-small bp3-intent-primary"
                 onClick={() => {
                   navigate("/admin/account/dashboard/package/details", {
                     state: {
                       packageItem: this.state.packageItem,
                     },
                   })
                 }}
               >
                 More details
               </Button>
             </div>
           </Card>
         </div>
       )
     } else {
       return <div></div>
     }
    
  }
}

export default AssignAssPackageView
