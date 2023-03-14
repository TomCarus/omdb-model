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
      var movieInfo = document.getElementById("movieInfo");
      movieInfo.innerHTML = "<h2>" + movieData.Title + "</h2>";
      movieInfo.innerHTML += "<img src='" + movieData.Poster + "'>";
      movieInfo.innerHTML += "<p>Released: " + movieData.Released + "</p>";
      movieInfo.innerHTML += "<p>Director: " + movieData.Director + "</p>";
      movieInfo.innerHTML += "<p>Plot: " + movieData.Plot + "</p>";
    }
  }
  xhr.send();
});