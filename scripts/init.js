const users = 'https://6542377cf0b8287df1ffb8fe.mockapi.io/users/';

const inputBuscar = document.getElementById('inputGet1Id');
const btnBuscar = document.getElementById('btnGet1');

const nombreNew = document.getElementById('inputPostNombre');
const apellidoNew = document.getElementById('inputPostApellido');
const btnAgregar = document.getElementById('btnPost');

const idRegMod = document.getElementById('inputPutId');
const btnMod = document.getElementById('btnPut');
const nombreMod = document.getElementById('inputPutNombre');
const apellidoMod = document.getElementById('inputPutApellido');
const btnModal = document.getElementById('btnSendChanges');

const idDel = document.getElementById('inputDelete');
const btnDel = document.getElementById('btnDelete');
const blackboard = document.getElementById('results');

let idAModificar = 0;

async function buscarEnReg(){
    const id = inputBuscar.value;
    
    let resultado = await fetch(users + id,{
        method:'GET'
    });
    
    if((resultado.status < 300) && (resultado.status > 199)){
    let usuario = await resultado.json();
    let htmlToAppend = `<p>ID: ${usuario.id}
            </br>
            NAME: ${usuario.name}
            </br>
            LASTNAME: ${usuario.lastname}
        </p>`
    blackboard.innerHTML = htmlToAppend;
}else{
    document.getElementById("alert-error").classList.remove("fade");

    setTimeout(function() {
        document.getElementById("alert-error").classList.add("fade");
    }, 3000);
}
}

async function agregarAReg(){
    const nombre = nombreNew.value;
    
    const apellido = apellidoNew.value;
    

    let obtenerReg = await fetch(users);
    obtenerReg = await obtenerReg.json();

    let posteo = await fetch(users, {
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nombre,
            lastname: apellido
        })
    })
    if((posteo.status < 300) && (posteo.status > 199)){
        posteo = await posteo.json();
        obtenerReg.push(posteo)
        let htmlToAppend = ``
        
        obtenerReg.forEach((usuario)=>{
            htmlToAppend += `<p>ID: ${usuario.id}
            </br>
            NAME: ${usuario.name}
            </br>
            LASTNAME: ${usuario.lastname}
        </p>`
        })
        blackboard.innerHTML = htmlToAppend;
    }else{
        document.getElementById("alert-error").classList.remove("fade");

        setTimeout(function() {
            document.getElementById("alert-error").classList.add("fade");
        }, 3000);
    }
}
async function seleccionMod() {
    const aModificar = inputPutId.value;

    const getUserResponse = await fetch(users + aModificar, {
        method: 'GET',
    });
    if((getUserResponse.status < 300) && (getUserResponse.status > 199)){
        
            const userData = await getUserResponse.json();
            
            inputPutNombre.value = userData.name;
            inputPutApellido.value = userData.lastname;
            
            const dataModal = new bootstrap.Modal(document.getElementById('dataModal'))
            dataModal.show();
            idAModificar = aModificar;
}else{
    document.getElementById("alert-error").classList.remove("fade");

    setTimeout(function() {
        document.getElementById("alert-error").classList.add("fade");
    }, 3000);
}
}

async function modificarReg(){

    const nombre = nombreMod.value;
    const apellido = apellidoMod.value;
    console.log('hola')
    let respuesta = await fetch(users + idAModificar, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                name: nombre,
                lastname: apellido
            })
    })
    console.log(respuesta)
}

async function deleteDReg(){
     const aEliminar = idDel.value;
        let response = await fetch(users + aEliminar,{
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        let result = await fetch (users);
        result = await result.json();
        let htmlToAppend = ``;
        result.forEach((usuario)=>{
            htmlToAppend += `
            <p>
                ID: ${usuario.id}
                </br>
                NAME: ${usuario.name}
                </br>
                LASTNAME: ${usuario.lastname}
            </p>`
        })
        blackboard.innerHTML = htmlToAppend;

    if((response.status > 299) || (response.status < 200)){
        document.getElementById("alert-error").classList.remove("fade");
    
        setTimeout(function() {
            document.getElementById("alert-error").classList.add("fade");
        }, 3000);
    }
}

function validarBtn(btn, a, b){
    if (b === undefined){
        b = 'h'
    }
    if ((a.length > 0) && (b.length > 0)){
        btn.disabled = false;
    }else{
        btn.disabled = true;
    }
}

//Event Listeners de Validación
 /*btnAgregar.addEventListener('input', ()=>{
    validarBtn(btnAgregar, nombreNew.value, apellidoNew.value)
})

btnDel.addEventListener('input', ()=>{
    validarBtn(btnDel, idDel.value)
})

btnMod.addEventListener('input', ()=>{
    validarBtn(btnMod, idRegMod)
})

*/

nombreNew.addEventListener('input', () => {
    validarBtn(btnAgregar, nombreNew.value, apellidoNew.value);
});

apellidoNew.addEventListener('input', () => {
    validarBtn(btnAgregar, nombreNew.value, apellidoNew.value);
});

idDel.addEventListener('input', () => {
    validarBtn(btnDel, idDel.value);
});

idRegMod.addEventListener('input', () => {
    validarBtn(btnMod, idRegMod.value);
});

nombreMod.addEventListener('input',()=>{
    validarBtn(btnModal, nombreMod.value, apellidoMod.value)
})

apellidoMod.addEventListener('input',()=>{
    validarBtn(btnModal, nombreMod.value, apellidoMod.value)
})



//Event Listeners de click
btnBuscar.addEventListener('click', buscarEnReg);

btnAgregar.addEventListener('click', agregarAReg);

btnMod.addEventListener('click', seleccionMod);

btnDel.addEventListener('click',  deleteDReg);

btnModal.addEventListener('click', modificarReg)
