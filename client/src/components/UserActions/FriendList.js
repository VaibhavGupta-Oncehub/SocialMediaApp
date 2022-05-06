import { useState } from "react";

const FriendList = (props) => {
  const [friendRequest,setFriendRequest]=useState(false)
  console.log(props.friends);
  return (
    <>
      {props.friends.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                
                <button
                  type="button"
                  onClick={() => {
                    props.friendRequestHandler(friend.id)
                    setFriendRequest(!friendRequest)
                  }}
                  className="btn btn-info"
                >
                  {!friendRequest && <>Add Friend</>} 
                  {friendRequest && <>Request send</>} 
                </button>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default FriendList;
