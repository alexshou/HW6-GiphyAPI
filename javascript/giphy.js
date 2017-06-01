      // Initial array of topics
      var topics = ["dog", "cat", "horse", "lion", "tiger", "bird", "turtle", "frog", 
                    "eagle", "chicken", "duck", "monkey", "skunk", "shark", "goat", "crab", "lobster", 
                    "capybara", "goldfish", "ferret", "goose", "stingray"];

      var topicDiv;
      var rating;
      var pOne;
      var imageUrlStill;
      var imageUrlAnimate;
      var image;
      var topic;
      var queryURL;
      var clickCounter;

      // displaytopicInfo function re-renders the HTML to display the appropriate content
      function displaytopicInfo() {
        $("#topics-view").empty();
        topic = $(this).attr("data-name");
        queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + topic + "&api_key=dc6zaTOxFJmzC";

        // Creates AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          for(var i = 0; i < 10; i++){
            
            var classImage = "image" + i;
            topicDiv = $("<div class = 'topicDisplay'>");
            rating = response.data[i].rating;
            pOne = $("<p>").text("Rating: " + rating);
            topicDiv.append(pOne);
            imageUrlStill = response.data[i].images.fixed_height_still.url;
            imageUrlAnimate = response.data[i].images.fixed_height.url;
            image = $("<img>").attr("src", imageUrlStill);
            image.addClass("gif");
            image.attr("data-state", "still");
            image.attr("data-still", imageUrlStill);
            image.attr("data-animate", imageUrlAnimate);
            topicDiv.append(image);
            $("#topics-view").prepend(topicDiv);

          }
        });

      }

      function changeDisplay(){

        var state = $(this).attr("data-state");
        console.log(state);
        if(state === 'still'){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", 'animate');
        }
        else
        {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", 'still');

        }
    }

     // Function for displaying topic data
      function renderButtons() {
        clickCounter = 0;
        // Deletes the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of topic to our button
          a.addClass("topic");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add topic button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The topic from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "topic"
      $(document).on("click", ".topic", displaytopicInfo);
      $(document).on("click", ".gif", changeDisplay);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
  