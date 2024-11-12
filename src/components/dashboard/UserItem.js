import React from 'react'

export default function UserItem(prop) {
    const { user, fetchUserList } = prop;

  return (
    <div>
        UserItem
          <p>{user.personName}</p>
    </div>
    
  )
}
