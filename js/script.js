var usuario = document.getElementById('usuario');
var carro = document.getElementById('carro');
var ruta = document.getElementById('ruta');
var cambiar = document.getElementById('cambiar');

/*
    FUNCION QUE CAMBIA LA RUTA
*/
var posicionRuta = 1;
function cambiarRuta(){
    ruta.src = "";
    switch(posicionRuta){
        case 1:
            ruta.src = "img/r2.png";
            posicionRuta = 2;
            break;
        case 2:
            ruta.src = "img/r3.png";
            posicionRuta = 3;
            break;
        case 3:
            ruta.src = "img/r1.png";
            posicionRuta = 1;
            break;
        default:
            ruta.src = "img/r1.png";
            posicionRuta = 1;
            break;
    }
    for(var i = 0; i <= 2; i++){
        if (i == (posicionRuta - 1)){
            rutas[posicionRuta - 1].activa = true;
        } else {
            rutas[i].activa = false;
        }
    }
    persona["actualizarUbicacion"]();
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
        posicion_Y: [30, 30, 60, 85, 130, 180, 180, 200, 210, 250, 305, 315, 350, 363, 390, 420],
        posicion_X: [105, 150, 170, 207, 207, 175, 225, 260, 265, 260, 285, 295, 305, 335, 360, 360],
        activa: true
    },
    {
        posicion_Y: [110, 160, 180, 210, 275, 355, 450],
        posicion_X: [117, 117, 150, 175, 170, 220, 212],
        activa: false
    },
    {
        posicion_Y: [190, 165, 190, 185, 200, 203, 250, 270, 310, 345],
        posicion_X: [370, 305, 230, 195, 170, 145, 80, 70, 30, 10],
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
        if(rutas[0].activa){
            this.ubicacion_Y = 180;
            this.ubicacion_X = 175;
        } else if (rutas[1].activa){
            this.ubicacion_Y = 210;
            this.ubicacion_X = 175;
        } else if (rutas[2].activa){
            this.ubicacion_Y = 200;
            this.ubicacion_X = 170;
        }
        usuario.style.top = this.ubicacion_Y + "px";
        usuario.style.right = this.ubicacion_X + "px";
    }
}
/*
    ASIGNANDO LA UBICACION DEL USUARIO CUANDO INICIA LA APLICACION
*/
persona.actualizarUbicacion();