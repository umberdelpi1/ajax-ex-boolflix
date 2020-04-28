$( document ).ready(function() {

  // $("input").keypress(
  //   function(e) {
  //
  //     var searchUser = $("input").val().toLowerCase();
  //     console.log(searchUser);
  //
  //     var cerca = $(".inp");
  //     console.log(".inp");
  //     // if (e.which == 13) {
  //     //   var x = e.which;
  //     // console.log(x);
  //     // }
  // });



  // al selettore .cerca scateno un'azione click
  $("input").keyup(
    function(){
      // inizializzo una var su .input per ricevere i dati dall'user
      var searchUser = $("input").val();

      // console.log(searchUser);
      // collego le var di handelbars
      var source = $("#bool-template").html();
      var template = Handlebars.compile(source);
      // creo una var su .box con .empty per cambio ricerca
      $('.box').empty();

      // ******** ||||||||||||||||||||||||||||||||| PRIMA CHIAMATA AJAX SERIE TV ************
      // inizializzo chiamata ajax
      // Funzione chiamata ajax
      chiamataInvioAjax(0,"bc6c0137553eba381ae1430036bc1f30",searchUser,"https://api.themoviedb.org/3/search/movie");

      // ******** ||||||||||||||||||||||||||||||||| SECONDA CHIAMATA AJAX SERIE TV ************

      chiamataInvioAjax(1,"bc6c0137553eba381ae1430036bc1f30",searchUser,"https://api.themoviedb.org/3/search/tv");



      // ********************************** FUNZIONE PER GENERARE TIPOLOGIA TRA "MOVIE" E "SERIE TV"
      function addElement(risultato, tipologiaFilm){
        // creo un for per ciclare tutti i risultati all'interno del data.results
        for(var i = 0; i < risultato.length; i++){
          console.log(risultato[i]);
          // creo var filmSingoli
          var filmSingoli = risultato[i];

                var title = "";
                var originaltitle = "";
                var tipoFilm = "";

          if(tipologiaFilm === 0){
            title = filmSingoli.title;
            originaltitle = filmSingoli.original_title;
            tipoFilm = "MOVIE";
          } else {
            title = filmSingoli.name;
            originaltitle = filmSingoli.original_name;
            tipoFilm = "SERIE TV";
          }
          var lingua = filmSingoli.original_language;
          var voto = filmSingoli.vote_average;
          // var descrizione = filmSingoli.overview;
          var votazione = Math.ceil(voto / 2);


          // nel context inserisco i dati che poi mi serve visualizzare
          var context = {
                          title: title,
                          originaltitle: originaltitle,
                          language: addFlag(filmSingoli.original_language),
                          vote: filmSingoli.vote_average,
                          tipo:tipoFilm,
                          stars: stelleGen(votazione),
                          poster: posterAdd(filmSingoli.poster_path),
                          // descr: filmSingoli.overview
          };
          // var di collegamento a handelbars
          var html = template(context);
          // metodo jquery per appendere il context in html tramite .box
          $('.box').append(html);
        }

        // funzione stelle
        function stelleGen(voto){
          var stelleFin = "";
          for(var i = 0; i < voto; i++){
            stelleFin += "<i class='fas fa-star'></i>";
          }
          for(var i = 0; i < 5 - voto; i++){
            stelleFin += "<i class='far fa-star'></i>"
          }
          return stelleFin;
        }

        // ************************************************ FUNZIONE PER GENERARE FLAG
        function addFlag(codiceGen) {
          var codeFlag = ["it","en","de","fr","es"];
          var flag;

          if(codeFlag.includes(codiceGen)){
            flag = '<img src="img/' + codiceGen + '.png" alt="immagine" class="flag"/>';
            return flag;
          }
          return codiceGen
        }

        // funzione di immagine posterAdd
        function posterAdd(endUrlImg){
            var results;


          if (endUrlImg){
            var urlImg = "https://image.tmdb.org/t/p/w342" + endUrlImg;
          results = '<img src="' + urlImg + '" alt="immagine poster" class="poster"/>';
          }else{
            results = '<img src="img/non_disponibile.jpg" alt="immagine poster" class="poster"/>';
          }
          return results;
        }
      }
      // funzione chiamata ajax
      function chiamataInvioAjax(tipo,apikey,queryArg,url, lang){
        // ******** ||||||||||||||||||||||||||||||||| PRIMA CHIAMATA AJAX SERIE TV ************
        // inizializzo chiamata ajax
        $.ajax({
          url: url,
          method: "GET",
          // data per invio domanda al server
          data: {
            api_key: apikey,
            language:lang ,
            query: queryArg
          },
          // success per risposta alla domanda fatta al server
          success: function(data,stato) {
            // inizializzo una var risultato di data.results
            var risultato = data.results;
            addElement(risultato, tipo);
          },
          // ERROR nel caso non funzionasse qualcosa
          error: function(richiesta,stato,errore){
            alert("Chiamata fallita!!!");
          } 
        });
      }
    }
  );

});
