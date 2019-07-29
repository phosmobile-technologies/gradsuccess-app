import React from 'react'




function SingleCartItem({desc,price,index,delFunc}){
    return (
          <div className="cart-body-wrapper">
                  <div className="cart-body cart-layout">
                                    
             <div>{index +1}</div>
             <div>{desc}</div>
            <div>{price}</div>
            <div><button onClick = {()=>delFunc(index)}>Remove</button></div>

            <div></div>
                  
            </div>
          </div>

      )
}

export default SingleCartItem