const dataURL = "http://localhost:8088/"

export default Object.create(null, {

  getData: {
    value: function (category) {
      return fetch(`${dataURL}${category}`)
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

  getSingleType: {
    value: function (category, search) {
      return fetch(`${dataURL}${category}/?${search}`)
        .then(user => user.json())
        .then(data => {
          console.log(data)
          return data;
        })
    }
  },

  newDataPost: {
    value: function (data, category) {
      return fetch(`${dataURL}${category}/`, {
        method: "POST", // *GET, POST, PUT, DELETE
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then(response => response.json());
    }
  },

  updateItem: {
    value: function (category, id, data) {
      return fetch(`${dataURL}${category}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    }
  }

})