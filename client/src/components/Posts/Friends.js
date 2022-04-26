const Friends=props=>{
return(
    <div className="container">
        <div className="friend_box">
          <table class="table table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Friend Name </th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
)
}

export default Friends