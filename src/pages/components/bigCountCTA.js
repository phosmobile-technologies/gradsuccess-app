import React from 'react'
import CountDivider from './countDivider'
import LowerCTA from './lowerCTA';

const bigCountCTA = ({openModals}) => (
<div>
    <CountDivider />
    <LowerCTA openModal={openModals} />
</div>
)

export default bigCountCTA