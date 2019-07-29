import React from "react"


const imgStyle = {
    width: '100%',
    height: '100%',
    marginBottom: '0px',
    maxWidth: '400px'
}

const imgBox = {
    minWidth: '100px',
    minHeight: '100px'
}


export const TeamCard = ({imgUrl, jobTitle, name}) => (
    <div>
    <div css={imgBox}>    <img src={imgUrl} css={imgStyle}/> </div>
        <h2 css={{marginBottom: '0px'}}> {name} </h2>
        <h3 css={{marginBottom: '0px', fontWeight: '300'}}> {jobTitle} </h3>
    </div>

)

const Team = ({imgUrl, jobTitle, name}) => (
<div css={{margin: '10px', display: 'flex'}}>
    <TeamCard imgUrl={imgUrl} jobTitle={jobTitle} name={name}/>
</div>
)

export default Team