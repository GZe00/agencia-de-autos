'use-strict'

const users = [
    // {
    //     id: 0,
    //     name: 'Mazda',
    //     model: "A7",
    //     color: "Rojo",
    //     year: 2018,
    //     price: 32000,
    //     photo: <img src="./test-img/car_1.jpg" alt="" srcset=""></img>,
    // },
   
];

/* VARIABLES GLOBALES*/
const CREATE = "create" 
const EDIT = "edit" 
let USERID = 0;

//Imprime los usuarios en el HTML

const printUser = ((dataUsers) =>{
    const tbody_content = document.getElementById('tbody-users');
    tbody_content.innerHTML = '';
    dataUsers.forEach((user)=>{
        const user_HTML = `<tr>
                            <td>${user.name}</td>
                            <td>${user.model}</td>
                            <td>${user.color}</td>
                            <td>${user.year}</td>
                            <td>$${user.price} MXN</td>
                            <td>${user.photo}</td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteUser(${user.id})"><i class="bi bi-trash"></i> Eliminar</button>
                                <button class="btn btn-warning" onclick="showFormEditUser(${user.id})"><i class="bi bi-arrow-repeat"></i> Editar</button>
                            </td>
                        </tr>`;
        tbody_content.innerHTML += user_HTML; 
    });
});

printUser(users);



//Abre el formualrio para crear o actualizar usuarios
const openForm = ()=> {document.getElementById('form-create-users').classList.remove('d-none'), btnCreate()};


//Oculta el formualrio para crear o actualizar usuarios
// const hidenForm = () => document.getElementById('form-create-users').classList.add('d-none');
function hidenForm(){
    const formContainer = document.getElementById("form-create-users");
    const d_none = formContainer.classList.contains("d-none");
    if (d_none){
        formContainer.classList.remove("d-none");
    }else{
        formContainer.classList.add("d-none");
    }
}


//resetea los valores del formulario en blanco
const resetForm = ()=> document.getElementById('user-form').reset();

//Obtiene el id del boton del formulario
const getIdSubmmitButton = () => document.getElementById('btn-submmit-form');

//Crea un nuevo usuario
const createUser = (()=>{
    const userName = document.getElementById('name').value;
    const userModel = document.getElementById('model').value;
    const userColor = document.getElementById('color').value;
    const userYear = document.getElementById('year').value;
    const userPrice = document.getElementById('price').value;
    const userPhoto = document.getElementById('photo').value;
    const newUser = 
    {
        id: generateId(),
        name : userName,
        model : userModel,
        color: userColor,
        year: userYear,
        price: userPrice,
        photo: userPhoto,
    }

    users.push(newUser);
    printUser(users);
    resetForm();
    hidenForm();
});

//Genera un id para cada registro nuevo
const generateId = (()=>{
    let biggerID = 0;
    users.forEach((user)=>{
        if(user.id > biggerID){
            biggerID = user.id;
        }
    });
    return biggerID += 1;
});

//Elimina a un usuario por su id
const deleteUser = ((userID)=>{
    const i = users.findIndex((user) => user.id === userID);
    users.splice(i, 1);
    printUser(users);
});

//Abre el formulario mostrando los datos para hacer editados
const showFormEditUser = ((userID) =>{
    const i = users.findIndex((user) => user.id === userID);
    const user = users[i]; 
    document.getElementById('name').value = user.name;
    document.getElementById('model').value = user.model;
    document.getElementById('color').value = user.color;
    document.getElementById('year').value = user.year;
    document.getElementById('price').value = user.price;
    document.getElementById('photo').value = user.photo;
    USERID = i;
    openForm();
    btnEditar();
});

//Cambia los datos del usuario
const editUser = ()=>{
    users[USERID].name = document.getElementById('name').value;
    users[USERID].model = document.getElementById('model').value;
    users[USERID].color = document.getElementById('color').value;
    users[USERID].year = document.getElementById('year').value;
    users[USERID].price = document.getElementById('price').value;
    users[USERID].photo = document.getElementById('photo').value;
    resetForm();
    hidenForm();
    printUser(users);
}

//Cambia el boton del fomrulario a editar
const btnEditar = (()=>{
    const button = getIdSubmmitButton();
    button.innerHTML = 'Actualizar';
    button.classList.remove('btn-primary');
    button.classList.add('btn-warning');
    button.value = EDIT;
});

//Cambia el boton del formulario a crear
const btnCreate = (()=>{
    const button = getIdSubmmitButton();
    button.innerHTML = 'Guardar';
    button.classList.add('btn-primary');
    button.classList.remove('btn-warning');
    button.value = CREATE;
});

//Accion que realiza el boton
const messageAction = (()=>{
    const touchBtn = getIdSubmmitButton().value;
    if (touchBtn === EDIT){
        editUser();
    }else{
        createUser();
    }
});