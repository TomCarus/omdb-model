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
// Image Carousel ----------------------------------------
const carousel = document.querySelector('.carousel')

// Anything related to the carousel should only work if the carousel element is available
if(carousel) {
    // The interval for each slide change
    const interval = 4000;

    // Interval function to be called indefinetly
    setInterval(() => {
        // Next slide every interval
        changeSlide(1);
    }, interval)

    function changeSlide(dir) {
        // Get all slides from the carousel and change the Nodelist to an array using Array.from
        const slides = Array.from(document.querySelectorAll('.slide'));

        // Get the active slide that has the data-active-slide attribute
        const activeSlide = document.querySelector('[data-active-slide]');
        // Get the index of the active slide using slides.indexOf(activeSlide)
        const activeIndex = slides.indexOf(activeSlide);

        // Get the new index that should be active by adding the direction to the active index
        let newIndex = activeIndex + dir;

        // Validate the new index so its not out of bound
        if(newIndex < 0) {
            // If the new index is less than 0, we want the last slide so we set it to slides.length - 1
            newIndex = slides.length - 1;
        }
        if(newIndex > slides.length - 1){
            // If the new index is greater than the slides length, we need the first slide so set new index to 0
            newIndex = 0;
        }

        // Remove the data-active-slide from the slide that is active so it is hidden
        activeSlide.removeAttribute('data-active-slide');
        // Add data-active-slide to the slides of newIndex to show this slide
        slides[newIndex].setAttribute('data-active-slide', '');
    }
}


// Mailing List ----------------------------------------

const mailingListForm = document.getElementById('mailing-list-form');

// We only add a submit event if mailingListForm is not null
if(mailingListForm) {
    mailingListForm.onsubmit = (e) => {
        // Prevent the default submit so the page doesnt refresh and we can validate
        e.preventDefault();
        
        if(validate()) {
            // If the form is valid we submit the mailing list to the server
            submitMailingList();
        }
    }
}

function validate() {
    // Initialize valid as true
    let valid = true;

    // get the input values and their error tags
    const name = document.getElementById('name').value;
    const nameError = document.getElementById('name_error');

    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email_error');

    // Name and email regex to test the values of name and email
    const nameRegex = /[A-Za-z]/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!name){
        // If there is nothing present in name, valid is false and we show this error message
        valid = false;
        nameError.innerText = 'Please specify a name';
    }else{
        // Else we show no error
        nameError.innerText = '';
    }

    if(name.length < 6) {
        // If the name is less than 6 characters we show this error
        valid = false;
        nameError.innerText = 'The name must be atleast 6 characters';        
    }else {
        // Else we show no error
        nameError.innerText = '';
    }

    if(!nameRegex.test(name)){
        // If name doesn't pass the nameRegex then it is not valid and we show this error message
        valid = false;
        nameError.innerText = 'Please enter a valid name';
    }else {
        // Else we show no error
        nameError.innerText = '';
    }

    if(!email){
        // If there is nothing present in email, valid is false and we show this error message
        valid = false;
        emailError.innerText = 'Please specify an email address';
    }else{
        // Else we show no error
        emailError.innerText = '';
    }

    if(!emailRegex.test(email)){
        // If email doesn't pass the emailRegex then it is not valid and we show this error message
        valid = false;
        emailError.innerText = 'Please enter a valid email address';
    }else {
        // Else we show no error
        emailError.innerText = '';
    }

    // Return the result of the validation
    return valid;
}

function submitMailingList() {
    // Get the name input
    const name = document.getElementById('name');
    // Get the name error tag
    const nameError = document.getElementById('name_error');

    //Get the email input
    const email = document.getElementById('email');
    //Get the email error tag
    const emailError = document.getElementById('email_error');

    // Get the success message tag
    const successMessage = document.getElementById('success');
    // Get the submit button
    const submitButton = document.getElementById('mailinglist-submit');
    // Set the button to disabled so we cannot spam submit
    submitButton.disabled = true;

    //Create a form object
    const form = new Object();
    //Assign form.name to the value of the name input
    form.name = name.value;
    //Assign form.email to the value of the email input
    form.email = email.value;
    
    // Set post to a variable called method
    let method = 'post';
    // Set url to a variable called url
    let url = 'http://mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist';

    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest;

    // Open to the specified method, url and is asynchronous
    xhr.open(method, url, true)

    // Set the content type to JSON
    xhr.setRequestHeader("Content-type", "application/json")

    // Set a function for onreadystatechange as we have an asynchronous xhr
    xhr.onreadystatechange = function() {
        if(this.readyState === 4){
            // If the xhr is finished, check the response
            if(this.status === 200) {
                //If the response was 200 OK then get the response json and parse it
                let res = JSON.parse(this.responseText);
                // Set the success message to the message in the json
                successMessage.innerHTML = res.message;

                // Set timeout function to wipe the success message, input values and make button enabled
                setTimeout(() => {
                    successMessage.innerHTML = '';
                    name.value = '';
                    email.value = '';
                    submitButton.disabled = false;
                }, 12000)
            } else{
                submitButton.disabled = false;
                // If the response is not 200, we have an error
                if(this.responseText.includes('"name"')){
                    // If the response text has "name" then we need to show this error under the name input. We replace "name" with Name so it is readable and we trim it
                    nameError.innerText = this.responseText.replace('"name"', 'Name').trim();
                }else if(this.responseText.includes('"email"')) {
                    // If the response text has "email" then we need to show this error under the email input. We replace "email" with Email so it is readable and we trim it
                    emailError.innerText = this.responseText.replace('"email"', 'Email').trim();
                }
            }
        }
      }
    }