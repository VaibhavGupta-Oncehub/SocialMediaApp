const Notifications = (props) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle bg-info"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Notifications
      </button>

      {props.friendRequests.map((request) => {
        return (
          <div key={request.id}>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  {request.id}
                </a>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
