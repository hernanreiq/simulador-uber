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
}

/*
    ACTIVAR FUNCION CAMBIAR RUTA AL HACER CLIC EN SU BOTON
*/
cambiar.addEventListener('click', cambiarRuta);

