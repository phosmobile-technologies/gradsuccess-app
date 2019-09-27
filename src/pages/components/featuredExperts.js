import React, { Component } from 'react';
import img1 from "../../images/resume.png"
import img2 from "../../images/man.jpg"
import img3 from "../../images/dan.jpeg"
import img4 from "../../images/dan.jpeg"
import {Link} from 'gatsby';


export default class FeaturedExperts extends Component {
    
  render() {
      const id = 20;
    return (
      <div className ="featured-experts"> 
            <h2>Meet Your Admissions Guide</h2>
            <div className="featured-experts-inner">
                <div className="featured-experts-single">
                    <div className ="img-div">
                    <img src={img1} />
                    </div>
                    <div className="summary-div">
                        <p> Try to imagine this: your company has an innovative product for the market, surrounded by your company are clients, surrounded by these clients are competitors, let’s assume a reasonable percentage of these clients are not satisfied by competitors’ products;  </p>
                        <Link to='/request-associate-service' state={{ id: 1 }}>get your CV treated by John Phillips</Link>
                    </div>
              </div>
                <div className="featured-experts-single">
                    <div className="img-div">
                        <img src={img2} />
                    </div>
                    <div className="summary-div">
                        <p> Try to imagine this: your company has an innovative product for the market, surrounded by your company are clients, surrounded by these clients are competitors, let’s assume a reasonable percentage of these clients are not satisfied by competitors’ </p>
                        <Link to='/request-associate-service' state={{ id: 2 }}>get your CV treated by Fasonu Cole</Link>
                    </div>
                </div>
                <div className="featured-experts-single">
                    <div className="img-div">
                        <img src={img3} />
                    </div>
                    <div className="summary-div">
                        <p> Try to imagine this: your company has an innovative product for the market, surrounded by your company are clients, surrounded by these clients are competitors, let’s assume a reasonable percentage of these clients are not satisfied by competitors’   </p>
                        <Link to='/request-associate-service' state={{ id: 3 }}>get your CV treated by Ashley Jones</Link>
                    </div>
                </div>
                <div className="featured-experts-single">
                    <div className="img-div">
                        <img src={img4} />
                    </div>
                    <div className="summary-div">
                        <p>surrounded by your company are clients, surrounded by these clients are competitors, let’s assume a reasonable percentage of these clients are not satisfied by competitors’ products; now, what you’re trying to do is to penetrate</p>
                        <Link to='/request-associate-service' state={{ id: 4 }}>get your CV treated by Iwuchuckwu Silva</Link>
                    </div>
                </div>
          </div>
      </div>
    
    );
  }
}


   
    
