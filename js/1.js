let cartas = new Array( 
        {nombre: 'A', seleccion: false}, {nombre: 'B', seleccion: false}, 
        {nombre: 'C', seleccion: false}, {nombre: 'D', seleccion: false}, 
        {nombre: 'E', seleccion: false}, {nombre: 'F', seleccion: false}, 
        {nombre: 'G', seleccion: false}, {nombre: 'H', seleccion: false}, 
        {nombre: 'I', seleccion: false}, {nombre: 'J', seleccion: false}, 
        {nombre: 'K', seleccion: false}, {nombre: 'L', seleccion: false},

        {nombre: 'A', seleccion: false}, {nombre: 'B', seleccion: false}, 
        {nombre: 'C', seleccion: false}, {nombre: 'D', seleccion: false}, 
        {nombre: 'E', seleccion: false}, {nombre: 'F', seleccion: false}, 
        {nombre: 'G', seleccion: false}, {nombre: 'H', seleccion: false}, 
        {nombre: 'I', seleccion: false}, {nombre: 'J', seleccion: false}, 
        {nombre: 'K', seleccion: false}, {nombre: 'L', seleccion: false}
        );

    let contador=50;                   //Movimientos
    let cartaAux1;                      //Guardamos el $(this) de la primera carta
    let Enumturno = {   
        TURNO1: 0,
        TURNO2: 1, 
        FIN: 2
    };
    let turno= Enumturno.TURNO1;                //Lógica de juego, empieza con turno1
    let record=0;                               //Record de partida
    //RECORD LOCALSTORAGE
    if(localStorage.getItem("recordLocalS") == undefined){
        localStorage.setItem("recordLocalS", '0');
    }
    let recordLocalS=localStorage.getItem("recordLocalS"); 
    //DIVS
    let divfindelJuego = $('<div class="findelJuego">GAME OVER</div>');
    let divWinner = $('<div class="finWinner">¡¡¡WIN!!!<h2>Record: <span class="recordPartida"></span></h2></div>');

    function barajarCartas(){
        cartas.sort(function() {return Math.random() - 0.5});
        for ( let i = 0 ; i < 24 ; i++ ) {
            // let carta = cartas[i].nombre;
            // let dato = $('#'+i);
            // dato.attr('data-valor', carta);
            $('#'+i).attr('data-valor', cartas[i].nombre);
          }
    }

    function comprobarPareja(carta1, carta2) {
        if($(carta1).attr('data-valor') == $(carta2).attr('data-valor')){
            --contador;
            setTimeout(function(){
                $(carta1).css('background-color', 'green'), $(carta2).css('background-color', 'green');
            },100 );
            setTimeout(function(){
                $(carta1).css('background-color', 'white'), $(carta2).css('background-color', 'white');
            },500 );
        }else{
            setTimeout(function(){
                $(carta1).css('background-color', 'red'), $(carta2).css('background-color', 'red');
            },250 );
            setTimeout(function(){
                $(carta1).css('background-color', ''), $(carta2).css('background-color', '');
                $(carta1).removeClass().addClass('carta').text("?");        
                $(carta2).removeClass().addClass('carta').text("?");
                }, 1000);
                --contador;
        }
    }

$(function(){
    $('#start').click(function() {
        $(this).css('display', 'none');
        $('#cajaDatosF').css('display', 'block');
        $('#resetero').css('display', 'block');
        $('#tablero').css('display', 'block');

        barajarCartas();
        $('.nMovimientos').text(contador);
        $('.record').text(recordLocalS);
        console.log(cartas);
    });
});
$(document).on('click', '.carta', function() {
    valor = $(this).data("valor");
    $(this).removeClass().addClass('cartaCara')
    $(this).html(valor);

    if(turno == Enumturno.TURNO1){
        cartaAux1 = $(this);
        turno = Enumturno.TURNO2;
    }else if(turno == Enumturno.TURNO2){
        comprobarPareja(cartaAux1, $(this));
        turno = Enumturno.TURNO1;
    }
    $('.nMovimientos').text(contador);
    comprobarMovimientosFin(contador);
    comprobarVictoria(contador);
});
$(document).on('click', '#resetero', function() {
    $('.findelJuego').css('display', 'none');
    $('.finWinner').css('display', 'none');
    let tabla = $('<table id="tabla"><tr>  <td id="0"  data-valor="valor">?</td>  <td id="1"  data-valor="valor">?</td>  <td id="2"  data-valor="valor">?</td>  <td id="3"  data-valor="valor">?</td>  <td id="4"  data-valor="valor">?</td>  <td id="5"  data-valor="valor">?</td></tr><tr>  <td id="6"  data-valor="valor">?</td>  <td id="7"  data-valor="valor">?</td>  <td id="8"  data-valor="valor">?</td>  <td id="9"  data-valor="valor">?</td>  <td id="10"  data-valor="valor">?</td>  <td id="11"  data-valor="valor">?</td></tr><tr>  <td id="12"  data-valor="valor">?</td>  <td id="13"  data-valor="valor">?</td>  <td id="14"  data-valor="valor">?</td>  <td id="15"  data-valor="valor">?</td>  <td id="16"  data-valor="valor">?</td>  <td id="17"  data-valor="valor">?</td></tr><tr>  <td id="18"  data-valor="valor">?</td>  <td id="19"  data-valor="valor">?</td>  <td id="20"  data-valor="valor">?</td>  <td id="21"  data-valor="valor">?</td>  <td id="22"  data-valor="valor">?</td>  <td id="23"  data-valor="valor">?</td></tr></table>');
    $('#tabla').remove();
    $('#tablero').append(tabla);
    $( "td" ).addClass("carta");
    
    barajarCartas();

    contador=50;
    $('.nMovimientos').text(contador);
});
function comprobarMovimientosFin(contador){
    if(contador==0){
        $('#tabla').remove();
        $('#tablero').prepend(divfindelJuego);
    }
}
function comprobarVictoria(contador){
    if(contador>0){
        if($('.cartaCara').toArray().length == 24){

            record = contador * 2.6315;
            record = Math.ceil(record);
            

            $('#tabla').remove();
            $('#tablero').prepend(divWinner);
            comprobarRecord(record, recordLocalS);
            $('.finWinner').css('display', 'block');
        }
    }
}
function comprobarRecord(record, recordLocalS){
    if(record > recordLocalS){
        recordLocalS = record;
        localStorage.setItem("recordLocalS", recordLocalS.toString());
        $('.record').text(recordLocalS.toString());
        $('.recordPartida').text(record);
    }else{
        localStorage.setItem("recordLocalS", recordLocalS.toString());
        $('.record').text(recordLocalS.toString());
        $('.recordPartida').text(record);
    }
}