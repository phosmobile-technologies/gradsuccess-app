import React from 'react'




function SingleCartItem({desc,index,delFunc}){
    return (
      <div className = "single-item" >                      
        <div>{index +1}</div>
        <div>{desc}</div>
      </div>     
      )
}

export default SingleCartItem