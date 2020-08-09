import React from 'react'
import { Button } from 'react-bootstrap'

interface ICollapseMenuProps {
    children: any
    show: boolean
}

function CollapseMenu(props: ICollapseMenuProps) {
    
    return <>
        <div className={`collapse-container ${ props.show ? '' : 'collapse-hide'}`}>
        poop
        </div>
        {props.children}
    </>
}

export default CollapseMenu