import React from "react"
import { ApolloProvider } from "react-apollo"
import { client } from "./apollo/client"
import { Provider } from "react-redux"
import store from "./state/store"


export const wrapRootElement = ({ element }) => {

      return  <Provider store={store}>
                <ApolloProvider client={client}>{element}</ApolloProvider>
              </Provider>
           
         
       
}
