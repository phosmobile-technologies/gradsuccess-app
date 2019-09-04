import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../images/loader.gif"
import {BLOG_POSTS} from "./graphql/queries"
import Layout from './components/layout'
import SEO from './components/seo'





class Blogging extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }



    componentDidMount(){
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@club340achievers')
       .then((res) => res.json())
       .then((data) => {
           const res = data.items //This is an array with the content. No feed, no info about author etc..
           const posts = res.filter(item => item.categories.length > 0) // That's the main trick* 

            function toText(node) {
                 let tag = document.createElement('div')
                 tag.innerHTML = node
                 node = tag.innerText
                 return node
            }
            function shortenText(text,startingPoint ,maxLength) {
                return text.length > maxLength?
                text.slice(startingPoint, maxLength):
                text
            }



            let output = '';
      posts.forEach((item) => {
         output += `
         <li class="blog__post">
            <a href="${item.link}">
               <img src="${item.thumbnail}" class="blog__topImg"></img>
               <div class="blog__content">
                  <div class="blog_preview">
                     <h2 class="blog__title">${shortenText(item.title, 0, 30)+ '...'}</h2>
                     <p class="blog__intro">${shortenText(toText(item.content),0, 300) + '...'}</p>
                  </div>
                  <hr>
                  <div class="blog__info">
                     <span class="blog__date">${shortenText(item.pubDate,0 ,10)}</span>
                     <a class = "cBtn" target = "_blank" href="${item.link}">Continue read...</a>
                  </div>
               </div>
            <a/>
         </li>`
      })
      document.querySelector('.blog__slider').innerHTML = output


        })
    }


render() {
    return(  
        <Layout>
            <SEO title="Blog" />
            <div className = "unauthorized blog-body">
               <h2 className = "blog-header-text">Recent Posts:</h2>
               <hr />
            <div className = "blog__slider"></div>
            </div>
        </Layout>
    )
}
}
export default Blogging
