const controller = {};
//Renderizar
controller.renderizado = (req, res) => {
    res.render('login');
};
//Renderizar Login
controller.log = async(req,res) => {
    const {user, pass} = req.body;
    req.getConnection((err, comn) => {
        comn.query('SELECT * FROM users', (err, users)=>{
            if(err)
            {
                res.json(err);
            }
            else{
                for (let index = 0; index < users.length; index++) {
                    const credenciales = users[index]
                if (user==credenciales.name && pass==credenciales.password)
                {
                    res.redirect('/home');
                    
                }
                else {

                  res.redirect('/');
                   res.render('login');
                    
                }
                }
            }

        });
    });
};

//Insertar
controller.save = (req, res) => {
const data=req.body;
    req.getConnection((err,comn)=>{
        comn.query('INSERT INTO pais set ?',[data],(err, pais)=>{

            res.redirect('/home')
        } ) ;
    });

  
};
//Mostrar Tabla
controller.list = (req, res) => {
req.getConnection((err, comn) => {
    comn.query('SELECT * FROM pais', (err,pais)=>{
        if(err){
            res.json(err)
        }
        else {
            res.render('formulario/form',
            {
                data: pais
            })
            
        }

    })
});
};
controller.edit= (req,res)=> {
const {id} = req.params;

req.getConnection((err,comn)=>{
    comn.query('SELECT * FROM pais WHERE id = ?', [id], (err,pais) =>{
        console.log(pais)
    res.render('formulario/form_modificar', {
        data: pais
        
    });

    });
});

};
//Eliminar dato
controller.delete = (req, res) => {
    const {id}=req.params;
     req.getConnection((err,comn) =>{
        comn.query('DELETE FROM pais WHERE id = ?', [id], (err, pais) =>{
            res.redirect('/home');
        })
     });
      
    };
//update
controller.update = (req, res)=>{
    const {id}=req.params;
    const newPais= req.body;
    req.getConnection((err,comn) =>{
        comn.query('UPDATE pais set ? WHERE id = ?', [newPais,id], (err, pais) =>{
            res.redirect('/home');
        });
    })
};
module.exports = controller;