const FriendList = (props) => {
  console.log(props.friends);
  return (
    <>
      {props.friends.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                {friend.id}
                <button
                  type="button"
                  onClick={() => {
                    props.friendRequestHandler(friend.id)
                  }}
                  className="btn btn-info"
                >
                  Add Friend
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
