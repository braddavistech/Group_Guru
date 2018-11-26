const dataURL = "http://0.0.0.0:8088/"

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
          return data;
        })
    }
  },

  getSingleType: {
    value: function (category, search) {
      return fetch(`${dataURL}${category}/?${search}`)
        .then(user => user.json())
        .then(data => {
          return data;
        })
    }
  },

  newDataPost: {
    value: function (data, category) {
      return fetch(`${dataURL}${category}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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