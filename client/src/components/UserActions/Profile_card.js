const Profile_card = (props) => {
  const showFriendHandler = () => {
    props.setShowFriend(!props.showFriend);
  };
  return (
    <div>
      <div className="card box ">
        <div className="card-body">
          <div className="image">
            <span>
              <img id="userimage" src="https://imgur.com/WInwkB8.jpg" />
            </span>
          </div>

          <h5 className="card-title m-3 text-center ">Adarsh manwal</h5>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            STUDENT AT DITU
          </h6>
          <p className="card-text text-center">OnceHub</p>
          <div className=" text-center ">
            <div>
              <button
                onClick={() => {
                  showFriendHandler();
                }}
                type="button"
                className="btn btn-primary mx-1"
              >
                {props.showFriend ?"Posts": "friend" }
              </button>
              <button type="button" className="btn btn-primary mx-1">
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_card;
