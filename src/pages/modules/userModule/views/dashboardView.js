import React, { Component } from "react"
import PackageCard from "../../commonModule/components/packageCard"

export default class DashboardView extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    };
  };
  
  render() {
    console.log(this.props.userPackages)
    if (this.props.userPackages) {
       return (
         <div>
           <section className="search-and-user"></section>
           <section className="grid">
             {this.props.userPackages.map((packageItem, index) => {
               return <PackageCard packageItem={packageItem} key={index} />
             })}
           </section>
         </div>
       )
    }else{
      return <div></div>
    }
  }
}
