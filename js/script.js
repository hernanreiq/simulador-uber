var usuario = document.getElementById('usuario');
var carro = document.getElementById('carro');
var ruta = document.getElementById('ruta');
var avanzar = document.getElementById('avanzar');
var detener = document.getElementById('parar');
var cambiar = document.getElementById('cambiar');

/*
    FUNCION QUE CAMBIA LA RUTA
*/
var posicionRuta = 0;
function cambiarRuta(){
    ruta.src = "";
    switch(posicionRuta){
        case 0:
            ruta.src = "img/r2.png";
            posicionRuta = 1;
            break;
        case 1:
            ruta.src = "img/r3.jpg";
            posicionRuta = 2;
            break;
        case 2:
            ruta.src = "img/r1.jpg";
            posicionRuta = 0;
            break;
        default:
            ruta.src = "img/r1.jpg";
            posicionRuta = 0;
            break;
    }
    for(var i = 0; i <= 2; i++){
        if (i == posicionRuta){
            rutas[posicionRuta].activa = true;
        } else {
            rutas[i].activa = false;
        }
    }
    detenerRecogida();
}

/*
    ACTIVAR FUNCION CAMBIAR RUTA AL HACER CLIC EN SU BOTON
*/
cambiar.addEventListener('click', cambiarRuta);

/*
    RUTAS EXISTENTES
*/
var rutas = [
    {
        posicion_Y: [85, 97, 103, 147, 169, 189, 202, 225, 248, 288, 320, 335, 375, 415, 473],
        posicion_X: [40, 44, 59, 79, 79, 92, 128, 140, 125, 127, 130, 132, 129, 127, 122],
        activa: true
    },
    {
        posicion_Y: [110, 160, 180, 210, 275, 355, 450],
        posicion_X: [117, 117, 150, 175, 170, 220, 212],
        activa: false
    },
    {
        posicion_Y: [75, 110, 125, 147, 158, 185, 215, 250, 290, 325, 345, 380, 390],
        posicion_X: [235, 235, 240, 237, 242, 223, 225, 205, 207, 183, 137, 120, 100],
        activa: false
    }
];

/*
    OBJETO QUE TIENE LA UBICACION DEL USUARIO DEPENDIENDO DE LA RUTA
*/
var persona = {
    ubicacion_Y: 180,
    ubicacion_X: 175,
    actualizarUbicacion: function (){
        this.ubicacion_Y = rutas[posicionRuta].posicion_Y[Math.ceil(rutas[posicionRuta].posicion_Y.length / 2)];
        this.ubicacion_X = rutas[posicionRuta].posicion_X[Math.ceil(rutas[posicionRuta].posicion_X.length / 2)];
        usuario.style.top = this.ubicacion_Y + "px";
        usuario.style.right = this.ubicacion_X + "px";
    },
    subirAlCarro: function (){
        if ((Math.abs(posicionCarroY - this.ubicacion_Y) && Math.abs(posicionCarroX - this.ubicacion_X)) < 2){
            usuario.style.display = "none";
        }
    },
    desmontarseDelCarro: function (){
        usuario.style.top = posicionCarroY + "px";
        usuario.style.right = posicionCarroX + "px";
        carro.style.display = "none";
        usuario.style.display = "block";
    }
}

/*
    ASIGNANDO LA UBICACION DEL USUARIO CUANDO INICIA LA APLICACION
*/
persona.actualizarUbicacion();

/*
    FUNCION QUE POSICIONA EL CARRO DEPENDIENDO LA RUTA
*/
function posicionarCarro(){
    carro.style.display = "block";
    carro.style.top = rutas[posicionRuta].posicion_Y[0] + "px";
    carro.style.right = rutas[posicionRuta].posicion_X[0] + "px";
}
posicionarCarro();

/*
    FUNCION QUE HACE MOVER AL CARRO DEPENDIENDO DE LA RUTA DONDE SE ENCUENTRE
*/
var moverCarro;
var inicializadorIteracion;
var inicializador = 0;
var posicionCarroY = 0;
var posicionCarroX = 0;
var cantidadSegundos = 0;
var finalizarTransporte;
function avanzarCarro(){
    avanzar.style.display = "none";
    detener.style.display = "inline-block";
    cantidadSegundos = (rutas[posicionRuta].posicion_Y.length) * 5000;
    posicionCarroY = rutas[posicionRuta].posicion_Y[inicializador];
    posicionCarroX = rutas[posicionRuta].posicion_X[inicializador];
    
/*EL CARRO EMPIEZA A MOVERSE A CADA SEGUNDO*/
    moverCarro = setInterval(function(){
/* SE DETERMINAN LOS PIXELES EN LOS QUE EL CARRO HARÁ SUS MOVIMIENTOS */
        var velocidadAvanceY = (Math.abs(rutas[posicionRuta].posicion_Y[inicializador] - rutas[posicionRuta].posicion_Y[inicializador + 1])) / 5;
        var velocidadAvanceX = (Math.abs(rutas[posicionRuta].posicion_X[inicializador] - rutas[posicionRuta].posicion_X[inicializador + 1])) / 5;

        if (rutas[posicionRuta].posicion_Y[inicializador + 1] < posicionCarroY && rutas[posicionRuta].posicion_X[inicializador + 1] > posicionCarroX){
            posicionCarroY -= velocidadAvanceY;
            posicionCarroX += velocidadAvanceX; 
        } else if (rutas[posicionRuta].posicion_X[inicializador + 1] < posicionCarroX && rutas[posicionRuta].posicion_Y[inicializador + 1] > posicionCarroY){
            posicionCarroY += velocidadAvanceY; 
            posicionCarroX -= velocidadAvanceX; 
        } else if (rutas[posicionRuta].posicion_X[inicializador + 1] < posicionCarroX && rutas[posicionRuta].posicion_Y[inicializador + 1] < posicionCarroY){
            posicionCarroY -= velocidadAvanceY; 
            posicionCarroX -= velocidadAvanceX; 
        } else {
            posicionCarroY += velocidadAvanceY; 
            posicionCarroX += velocidadAvanceX; 
        }
            
        carro.style.top = posicionCarroY + "px";
        carro.style.right = posicionCarroX + "px";
    }, 1000);
    
/*AUMENTAR EN 1 EL INICIALIZADOR CADA 5 SEGUNDOS PARA QUE CAMBIE A LA SIGUIENTE UBICACION*/
    inicializadorIteracion = setInterval(function(){
        inicializador++;
        persona.subirAlCarro();
    }, 5000);

/*CUANDO EL MOVIMIENTO DEL CARRO VA A TERMINAR CUANDO LA CANTIDAD DE SEGUNDOS ASIGNADOS SE AGOTE*/
    finalizarTransporte = setTimeout(function(){
        setTimeout(function(){
            persona.desmontarseDelCarro();
        }, 1000);
        clearInterval(moverCarro);
        clearInterval(inicializadorIteracion);
    }, cantidadSegundos - 5000);
}

/*
    EL USUARIO ACTIVA LA FUNCION DE AVANZAR POR LA RUTA
*/
avanzar.addEventListener('click', avanzarCarro);

/*
    FUNCION PARA DETENER LA RECOGIDA DEL USUARIO
*/
function detenerRecogida(){
    persona.actualizarUbicacion();
    posicionarCarro();
    clearInterval(moverCarro);
    clearInterval(inicializadorIteracion);
    usuario.style.display = "block";
    carro.style.display = "block";
    posicionCarroY = 0;
    posicionCarroX = 0;   
    inicializador = 0;
    cantidadSegundos = 0;
    avanzar.style.display = "inline-block";
    detener.style.display = "none";
    clearTimeout(finalizarTransporte);
}

/*
    EL USUARIO ACTIVA LA FUNCION DE DETENER LA RECOGIDA
*/
detener.addEventListener('click', detenerRecogida);