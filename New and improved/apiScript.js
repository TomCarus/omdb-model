// Get user input
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
  var movieTitle = document.getElementById("movieTitle").value;
  // Make API call
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.omdbapi.com/?apikey=4be14e00&t=" + movieTitle, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var movieData = JSON.parse(xhr.responseText);
      // Display movie information
      var poster = document.getElementById("poster");
      var title = document.getElementById("title");
      var director = document.getElementById("director");
      var starring = document.getElementById("starring");
      var release = document.getElementById("release");
      var rating = document.getElementById("rating");
      var description = document.getElementById("description")

      
       poster.innerHTML = '<img src="'+movieData.Poster+'"  alt="movie poster">';
       title.innerHTML = movieData.Title;
       director.innerHTML = "Directed by: "+movieData.Director;
       starring.innerHTML = "Starring: "+movieData.Actors;
       release.innerHTML = "Release date: "+movieData.Released;
       rating.innerHTML = movieData.imdbRating;
       description.innerHTML = movieData.Plot;
    }
  }
  xhr.send();
});