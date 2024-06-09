
//Arreglo de numeros totales
//let arregloNumerosTotales = [149,21,90,97,99,98,96,95,94,93,92,91,200,140,80,20,135,189,123,163,215,115,188,198,72,150,160,26,27,113,167,168,213,211,73,197,191,192,196,182,199,206,217,194,128,183,18,19,65,89,129,136,134,179,171,68,176,152,195,85,194,217,127,151,248,249,247,193,165,161,144,34,124,239,240,241,243,245,244,246,56,57,102,103,104,105,106,133,205,81,82,52,238,148,237,181,157,156,154,66,37,42,38,44,48,25,24,79,84,225,61,62,63,224,223,222,221,22,181,31,30,219,178,212,138,155,137,242,59,112,111,114,226,145,227,29,185,208,43,228,130,40,39,254,251,119,121,142,108,166,252,250,236,235,229,232,233,234,2,1,120,147,231,230,122,35,36,253,187,210,186,100,101,255,86,175,261,190,33,169,203,264,265,266,109,204,207,159,180,28,218,216,162,202,267,214];

let arregloNumerosTotales = [];
//let arregloNumerosTotales = [12,25,3,1,8,45,25,36,14,78,54,12,45,78,25,36,8,5,25,38,30,58,100,105,200];

const GuardaArr =()=>{
  // Convertir el arreglo a una cadena de texto en formato JSON y almacenarlo en el localStorage
  var numerosJSON = JSON.stringify(arregloNumerosTotales);
  localStorage.setItem("arregloNumerosTotales", numerosJSON);
}


//Números selecionados o que no estan, números que hay que restar al arreglo mayotr
let numerosselecionados = [];

// //Números selecionados o que no estan, números que hay que restar al arreglo mayotr
// let numerossNoasistentes = [];

//Numeros que estan en el tablero
let arregloNumerosTablero = [];

///Toma el valor de los datos ingresados y los carga en el arreglo del localstorage
const NumeroFichas =()=>{
  let valor = document.getElementById('pr');
  let textTarea = document.getElementById('numeros_ingresados');
  
   arregloNumerosTotales = textTarea.value.split(',');
   GuardaArr();
   valor.innerHTML= `Total de fichas ${arregloNumerosTotales.length}`;


}


const MostrarModalRegistro =()=>{
      let divcontainer = document.getElementById('contai-ingreso-numeros');
      divcontainer.style.visibility="visible";  
}

//Función que genera los números
const GenerarNumeros = () => {
  try {
    NumeroFichas();
    
    //Obtener la cadena de texto en formato JSON del localStorage y convertirla de vuelta al arreglo original
    var numerosJSON = localStorage.getItem("arregloNumerosTotales");
    var numeros = JSON.parse(numerosJSON);
    numeros.sort(function(a, b) {
        return a - b;
      });
      
      numeros = numeros.filter(function(elemento, indice) {
        return numeros.indexOf(elemento) === indice;
      });
      //console.log(salida);
      ImprimirNumeros(numeros);
      //ExportarConsola(arregloNumerosTotales);
      
      arregloNumerosTotales = [...numeros];
      var numerosJSON = JSON.stringify(arregloNumerosTotales);
      localStorage.setItem("arregloNumerosTotales", numerosJSON);
      
      CerrarModal('contai-ingreso-numeros');


  } catch (error) {}
};

//Función que imprime los números en pantalla
const ImprimirNumeros = (arregloNumerosTablero) => {
  try {
    const containernumeros = document.getElementById('container_numeros');
    containernumeros.innerHTML="";
    arregloNumerosTablero.forEach(element => {
        if(element!=""){
            let divNumero =  document.createElement("div"); 
            divNumero.innerHTML = `<div id='${element}' class='numero-div'><p>${element}</p></div>`  ;
            containernumeros.appendChild(divNumero);
        }
    });
  } catch (error) {}
};


//Selecionar una ficha paara ganar
const Seleccionar = ()=>{
    try {
      // Obtener la cadena de texto en formato JSON del localStorage y convertirla de vuelta al arreglo original
      var numerosJSON = localStorage.getItem("arregloNumerosTotales");
      var numeros = JSON.parse(numerosJSON);
      

      if (numeros.length == 0) {
        MostrarError("No hay fichas para seleccionar.");
        return;
      }

      let numeroElementos = Math.floor(Math.random() * numeros.length);
    //   console.log(numeroElementos);
    //   console.log(numeros[numeroElementos]);
    MostarModalNumeroGanador(numeros[numeroElementos]);
     
    
    numeros.splice(numeroElementos,1);
      //console.log(numeros);

      arregloNumerosTotales = [...numeros];

  
    //console.log(salida);
    ImprimirNumeros(arregloNumerosTotales);
    ExportarConsola(arregloNumerosTotales);
      var numerosJSON = JSON.stringify(arregloNumerosTotales);
        localStorage.setItem("arregloNumerosTotales", numerosJSON);

    } catch (error) {
        
    }
}

const ExportarConsola=(numeros)=>{
    try {
        var salida = "";
        for (var i = 0; i < numeros.length; i++) {
          if (!numerosselecionados.includes(i)) {
            salida += numeros[i] + ",";
          }
        }
        console.log(salida);
    } catch (error) {
        
    }
}

//Muestra el nùmero ganador con el efecto confeti
const MostarModalNumeroGanador=(numero)=>{
    try {
        let divcontainer = document.getElementById('contai-mensaje');
        divcontainer.style.visibility="visible";  
        //collapse
        let mensaje = document.getElementById('lbl-mensaje');
        mensaje.innerHTML = `${numero}`;
        //MostrarAnimaConfeti();
        launchConfetti();
        
    } catch (error) {
        
    }
}

var count = 1000;
var defaults = {
  origin: { y: 0.5 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

function launchConfetti() {
  fire(0.80, {
    spread: 500,
    startVelocity: 500,
  });
  fire(0.20, {
    spread: 200,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 2
  });
  fire(0.1, {
    spread: 500,
    startVelocity: 500,
    decay: 5.92,
    scalar: 2
  });
  fire(0.1, {
    spread: 600,
    startVelocity: 500,
  });
}




const CerrarModal=(modal)=>{
    try {
        let divcontainer = document.getElementById(modal);
        divcontainer.style.visibility="collapse";  
    } catch (error) {
        
    }
}



const MostrarError =(mensa)=>{
  let divcontainer = document.getElementById('contai-error');
  let mensaje_error = document.getElementById('mensaje_error-error');
  divcontainer.style.visibility="visible";  

  //console.dir(mensaje_error);
  mensaje_error.textContent = mensa
  CerrarModal('contai-ingreso-numeros');
  CerrarModal('contai-mensaje');

}



// const celebrate=()=> {
//   const celebrationDiv = document.getElementById("celebration-div");
  
//   // Mostrar el div de celebración
//   //celebrationDiv.style.display = "block";
  
//   // Agregar clase de animación
//   celebrationDiv.classList.add("celebrate-animation");
  
//   // Esperar 3 segundos y luego ocultar el div de celebración
//   setTimeout(() => {
//     celebrationDiv.style.display = "none";
    
//     // Remover clase de animación
//     celebrationDiv.classList.remove("celebrate-animation");
//   }, 3000);
// }