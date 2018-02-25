$( document ).ready(function() {

var food = ["Taco", "Ribs", "Chicken", "HamBurger", "HotDog", "Mac N Cheese", "Pizza", "Ice Cream", "Jello", "Pie","Pudding", "Bacon", "Pancakes"];

function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < food.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("food");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", food[i]);
        gifButton.text(food[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

function addNewButton(){
    $("#addGif").on("click", function(){
    var food = $("#food-input").val().trim();
   
    food.push(food);

    });
}

function removeLastButton(){
    $("removeGif").on("click", function(){
    food.pop(food);
    displayGifButtons();

    });
}

function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/" + action + "";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
          
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();

$(document).on("click", ".food", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});