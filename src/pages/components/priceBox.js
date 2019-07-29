import React from "react"
import{ jsx, css } from "@emotion/core"
import PryButton from "./pryButton"

const PriceBox = ({text, price,itemDescription,form}) => (

<div>
    
    <div   css={{
        width: '250px',
        border: '2px solid blue',
        textAlign: 'center',
        borderColor: "#19a99d",
        borderRadius: '5px',
        boxShadow: '0px 5px 15px rgba(59,132,117,0.5)',
        padding: '20px',
        marginBottom: '50px'
    }}>
        <h2 css={{
            marginBottom: '5px',
            fontWeight: 'bolder',
            fontFamily: 'Poppins'
        }}>{text}</h2>
        <div css={{
            border: '0.5px solid #19a99d',
            width: '100%',
            margin: 'auto',
            marginBottom: '10px'
        }}> {/* line */}</div>
        <h3 css={{
            marginBottom: '20px',
            color: "#19a99d",
            fontWeight: 'bolder',
            fontFamily: 'Poppins'
        }}>{price}</h3>
        <PryButton text="ADD TO CART" price = {price}  form = {form} itemDescription = {itemDescription} onClick = {null}/>
    </div>

</div>

)

export default PriceBox