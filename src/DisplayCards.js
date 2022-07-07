import React from 'react'

function DisplayCards( { settingsAvailableDeckCards, settingsUsedDeckCards } ) {

  return (
    <div className="currentCardList">
        {/* {props.savedProfiles.map((profile)=>(
          profile.id == props.currentSelectedProfile ?
            <button className="profileListItemSelected" key={profile.id} id={profile.id}  onClick={props.handleProfileButton}>{profile.profileName}</button>
            :
          <button className="profileListItem" key={profile.id} id={profile.id}  onClick={props.handleProfileButton}>{profile.profileName}</button>
        ))} */}
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
        <span className="currentCardListItem">{"Card"}</span>
      </div>
  )
}

export default DisplayCards