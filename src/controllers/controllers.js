const fetch = require("node-fetch");
const dir_ip = "192.168.1.10"
const controller = {};
//Renderizar
controller.renderizado = (req, res) => {
    res.render('login');
};

//Renderizar Login
controller.log = async (req, res) => {
    const { user, pass } = req.body;
    const apiUrl = 'http://' + dir_ip + ':5000/user'
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                const credenciales = data[index]
                if (user === credenciales.name && pass === credenciales.pass) {
                    res.redirect('/home');
                }
                else {
                    res.redirect('/');
                }
            }
        })
        .catch(error => {
            console.log("Error: ", error)
            res.redirect('/');
        });
};

//Insertar pais
controller.save = (req, res) => {
    const apiUrl = 'http://' + dir_ip + ':5000/pais/create';
    const data = req.body;
    console.log(data)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            res.redirect('/home')
        })
        .catch(error => {
            console.error('Error:', error);
            res.redirect('/home')
        });
};


//Mostrar Tabla
controller.list = (req, res) => {
    const apiUrl = 'http://' + dir_ip + ':5000/pais'
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            res.render('formulario/form',
                    {
                        data
                    })
        })
        .catch(error => {
            console.log("Error: ", error)
        });
};


//Renderizar modificar
controller.edit = (req, res) => {
    const { id } = req.params;
    const apiUrl = 'http://' + dir_ip + ':5000/pais/' + id
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            res.render('formulario/form_modificar',
                    {
                        data
                    })
        })
        .catch(error => {
            console.log("Error: ", error)
        });
};

//Eliminar dato
controller.delete = (req, res) => {
    const { id } = req.params;
    const apiUrl = 'http://'+ dir_ip +':5000/pais/delete/' + id;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            res.redirect('/home')
        })
        .catch(error => {
            console.error('Error:', error);
            res.redirect('/home')
        });
};


//update
controller.update = (req, res) => {
    const data = req.body;
    const apiUrl = 'http://' + dir_ip +':5000/pais/update';

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            res.redirect('/home')
        })
        .catch(error => {
            console.error('Error:', error);
            res.redirect('/home')
        });
    
};

controller.camara = (req, res) => {
    res.redirect("http://192.168.1.15:4747/video");
};
module.exports = controller;