const FriendList = (props) => {
  console.log(props.friends);
  return (
    <>
      {props.friends.map((friend) => {
        return (
          <div className="container mx-5">
            <ul class="list-group m-1">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                <button type="button" class="btn btn-info">Add Friend</button>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default FriendList;
