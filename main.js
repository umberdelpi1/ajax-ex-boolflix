$( document ).ready(function() {


  // console.log($('.cerca'));


  $(".cerca").click(
    function(){
      var searchUser = $("input").val();

      console.log(searchUser);

      var source = $("#bool-template").html();
      var template = Handlebars.compile(source);
      $('.box').empty();

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "bc6c0137553eba381ae1430036bc1f30",
        language: "it-IT",
        query: searchUser
      },
      success: function(data,stato) {
        var risultato = data.results;

        for(var i = 0; i < risultato.length; i++){
          console.log(risultato[i]);
          var filmSingoli = risultato[i];
          var context = {
            title: filmSingoli.title,
            originaltitle: filmSingoli.original_title,
            language: filmSingoli.original_language,
            vote: filmSingoli.vote_average

          };

          var html = template(context);

          $('.box').append(html);

        }

      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      } ,
    })
  })
});
