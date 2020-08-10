import React from 'react'
import FeedList from '../../Feed/FeedList/FeedList'
import { useParams, useHistory } from 'react-router-dom'

interface ICollapseMenuProps {
    children: any
    show: boolean
}

function CollapseMenu(props: ICollapseMenuProps) {
    let { feedId } = useParams()
    const history = useHistory()

    const onFeedSelected = (selectedFeedId: string) => {
        history.push(selectedFeedId)
    }
    
    return <>
        <div className={`collapse-container collapse-slider ${ props.show ? 'collapse-show' : ''}`}>
            <FeedList onFeedSelected={onFeedSelected} selectedFeed={feedId} />
        </div>
        {props.children}
    </>
}

export default CollapseMenu