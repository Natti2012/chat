const socket = io()
let user; 
Swal.fire({
  title: "Identificate",
  input:"text",//indicamos que debe escribir un text para poder avanzar de esa alerta
  text: "Por favor ingresa tu nombre..",
inputValidator: (value)=>{
  return !value && "¡Necesitas escribir un nombre de usuario para continuar"
//esta validacion ocurre si el usuario decide dar en continuar sin 
//haber colocado un nombre de ususario
},
allowOutsideClick:false //inpide que el usuario salga de la alerta 
//al dar click fuera de la alerta
 
}).then(result=>{
  user= result.value
  console.log(user)
  //Una vez que el usuario se identifica, lo asignamos a la variable user.
})

socket.on('wellcome', (data)=>{
  console.log(data)
 
})
socket.on("messages-all", (data)=>{
  render(data)
})
//Funcion para renderizar los mensajes en la pantalla
function render(data){
 
  const html = data.map(elem =>{
      return (
          `
          <div>
            <strong> ${elem.author} </strong> dice <em> ${elem.text} </em>
          </div>
        `
      )
  }).join(' ')

  document.getElementById('caja').innerHTML = html

}

function addmessage(){
  const mensaje = {
    author: user, //usuario que mando en la alerta
    text: document.getElementById('texto').value
  }
  socket.emit('new-message', mensaje)
  document.getElementById('texto').value = ""// Borro el contenido del input despues que lo envia.

  return false
}