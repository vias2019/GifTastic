$(document).ready(function () {
    var key = 'cqK2VQpfnHFwxrrT3fgPGu65tLCi3HSL';
    var rating;
    var animalSearch;
    var buttonArray = ["cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "turtle", "chicken", "frog", "dear", "fox", "wolf"];

    function renderButton() {
        $("#animalButtons").empty();
        for (var i = 0; i < buttonArray.length; i++) {
            var showButtons = $("<button type='button' class='btn btn-info' />");
            showButtons.text(buttonArray[i]);
            $("#animalButtons").append(showButtons);
        }
    }
    renderButton();

    function clickButtons(queryURL) {
        $("#gifs").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {

                var newDiv = $('<span>');
                var ratingParagraph = $("<p>");
                var rating = response.data[i].rating;
                ratingParagraph.text("Rating: " + rating);
                newDiv.append(ratingParagraph);

                var gifDiv = $("<img>");
                gifDiv.attr("src", response.data[i].images.fixed_height_still.url);
                gifDiv.attr("alt", response.data[i].title);
                gifDiv.attr("state-still", response.data[i].images.fixed_height_still.url);
                gifDiv.attr("gif-state", "still");
                gifDiv.attr("state-animate", response.data[i].images.fixed_height.url);
                newDiv.append(gifDiv);
                $("#gifs").append(newDiv);
            }
            setImageOnClickHandler();

        });
    }

    function setImageOnClickHandler() {
        $("img").on("click", function () {
            var state = $(this).attr("gif-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("state-animate"));
                $(this).attr("gif-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("state-still"));
                $(this).attr("gif-state", "still");
            }
        });
    }

    function setButtonInfoOnClickHandler() {
        $(".btn-info").on('click', function () {

            var animalSearch = $(this).text();
            console.log(animalSearch);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=" + key + "&limit=10";
            console.log(queryURL);
            clickButtons(queryURL);

        });
    }

    $("#submit-button").on("click", function () {
        event.preventDefault();
        var animalSearch = $("#add-animal-input").val();
        console.log(animalSearch);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=" + key + "&limit=10";
        if (animalSearch != "") {
            buttonArray.push(animalSearch);
            $("#add-animal-input").val('');
            var newButton = $("<button class='btn-info'>");

            newButton.text();
            $("animalButtons").append(newButton);
            renderButton();
            clickButtons(queryURL);

            setButtonInfoOnClickHandler();
        }
    });
    setButtonInfoOnClickHandler();
});

