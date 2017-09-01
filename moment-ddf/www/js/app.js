$('.acao-finalizar').on('click', function() {
$.ajax({
    url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
    data: {
        mesa: $('#numero-mesa').val(),
        pedido: $('#resumo').text()
    },
    error: function(erro) {
        Materialize.toast(erro.responseText, 3000, 'red-text');
    },
    success: function(dados) {
        Materialize.toast(dados, 2000);

        $('#numero-mesa').val('');
        $('.badge').remove();
    }
});
});

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}