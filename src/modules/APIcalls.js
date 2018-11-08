const dataURL = "http://localhost:8088/user"

export default Object.create(null, {
  getData: {
    value: function () {
      return fetch(dataURL)
        .then(user => user.json())
        .then(data => {
          let promises = []
          data.forEach(user => {
            promises.push(user)
          })
          return Promise.all(promises);
        })
        .then(data => {
          console.log(data)
          return data;
        })
      }
  },
  newUserData: {
    value: function (data) {
      return fetch(dataURL, {
        method: "POST", // *GET, POST, PUT, DELETE
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then(response => response.json());
    }
  }
})