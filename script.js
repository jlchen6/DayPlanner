//Define variables
var businessHrs = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var storedEvents = localStorage.getItem("storedEvents");
var eventsArray;

//Display the current day
$("#currentDay").text(moment().format('LLL'));

//When the page loads, display the time blocks
function displayTimeBlocks() {

    //Loop through, until all time blocks have been created.
    for (var i = 0; i < businessHrs.length; i++) {
        //Grab the businessHr we're constructing a block for.
        var hour = businessHrs[i];

        //Each time block takes up one row and consists of a box that denotes that hour, an input, and a save button
        var row = $("<div>").addClass("row");

        var timeBlock = $("<div>").addClass("time-block col-1");
        timeBlock.text(hour);

        var textArea = $("<textarea>").addClass("col-8");
        textArea.attr("id", hour);

        var button = $("<button>").addClass("saveBtn col-1");
        button.attr("data-hour", hour)
        button.text("Save");


        row.append(timeBlock);
        row.append(textArea);
        row.append(button);

        //When determining whether an hour block is in the past/present/future, can use moment().fromNow().
        var relativeTime = moment(hour, "h").fromNow().split(" ");

        //If relativeTime is "X minutes ago", it's in the present, so add class "present"

        //If relativeTime is "X hour/hours ago", it was in the past, so add class "past"

        //If relativeTime is "in X hours", it's in the future, so add class "future"

        //Now load the locally stored events
        loadEvents();

        $(".timeBlocks").append(row);
    }

}

//Get locally stored events
function loadEvents() {
    //If there's nothing stored, set storedEvents to an empty string.
    if(!storedEvents){
        storedEvents = "|||||||||";
        localStorage.setItem("storedEvents", storedEvents);
        return;
    }
    //Otherwise, split up the string of stored events into an array
    eventsArray = storedEvents.split("|");

    //Loop through the array and 

}


displayTimeBlocks();

//When save button is clicked, update locally stored events
$(".saveBtn").click(function() {
    //Get the hour of the save button that was clicked
    var hour = $(this).attr("data-hour");

    //Get the text of the event that was just entered.
    var eventText = $("#" + hour).val();

    //If the text is empty, ask the user to enter something and return
    if(!eventText){
        alert("Please enter an event before hitting the save button!");
        return;
    }

    //Otherwise, save the event to the eventsArray and convert the array into a string to save to local storage
    var index = businessHrs.indexOf(hour);
    eventsArray[index] = eventText + "|"


})
