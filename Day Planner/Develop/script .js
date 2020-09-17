// var a = moment().format('MMMM DD YYYY');
// console.log(a)
// var a = new Date('09/16/2020');
// a.setDate(a.getDate() + 1);
$(document).ready(function() {

    // test flag
    const test = false;

    // get times from moment
    const now = moment().format('MMMM Do YYYY');

    // commented out for test in non-standard hours
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');

    // set times for tesitng after hours
    if (test) {
        nowHour24 = 13;
        nowHour12 = 1;
    }


    // using font awesome icon https://fontawesome.com/license
    // change description here - none
    const saveIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAADo6OiOjo5HR0cODg5KSkqdnZ3c3Nxra2v7+/vNzc3T09NWVlZTU1MvLy/09PSFhYV2dna+vr59fX2xsbFjY2Nvb28iIiLj4+MVFRW6uro4ODhNTU0fHx+kpKQ7OzuVlZUXqlN2AAACgklEQVR4nO3d607iQBiA4ZlSDoKcRKTissD93+QSaCl1YUjsd1B8n1+202l5A8Emxk4IAAAAAAAAAAAAAAAAAAAAQHuLl+k6KsuHfn0f6nVHf7wSh2OTPr/E4dQqMMbpzKNwYxcY41+HxL5lYIyFeeLMNjDGrnXitr70ZlIr9606KS/XG8blcLV93Ki/zdbGibvqwovG7nLnc3Lu4HrhtnmOeNpa1QdkCh03nT+kzcBhuXeUnPx8vbBfDjcLw8U7bpmYfXoZJY3C8OqSWBXmzd0qhWFeH/Mu3HGbaaFLom1h6NRHDUQ7bjMuDHvzROvCy1uo9K8iKeaFF7cYNon2hZeJ6dPLcCgMS9NEj0LbRJfCsKgPXvw/Ksun8DJRJCPBqTCMqsGuREWKV+E58XELqxs4ClujMDmZQgopFEFhcjKFFFIogsLk5EFvfMVmWQ4/QOEdFFIog8I256bwWxS2+svCjyh87bfwIwpFUEghhRRS+KCFYSDoexbqo1AKhXoolEKhHgqlUKiHQikU6qFQyufCed7Tlc+dC5+iticKKaSQQgofpVDjBiCnUAeFgihUQqEgCpVQKIhCJRQKolAJhYIoVEKhIAqVUCiIQiUUCqJQCYWCKFRCoSAKlVAoiEIlFAqiUAmFgihU8nsKq3/0tCt8O22uFa7UcF4boXwwkFnhe3ndncKVmqbNxJV64eq4MarWX5rfmdXePp71JpNxcfqx2CcXJ/mKfXXqcb0ESrR4ankWXRXqgY11NRyoP+z6YNh1DHwzCKy/1RzsTAIPiV7v4sQo8PBBvbFwk7Lt/VcmJ+sUxnn50nwdvVlmyXGxRwAAAAAAAAAAAAAAAAAAgF/lH0/rOvsICpMUAAAAAElFTkSuQmCC";

    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (test) { console.log(storedPlans); }

    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
        // this should only occur on first time the app is loaded in the browser
        // helpfully remind user that lunch is important
        planTextArr = new Array(9);
        planTextArr[4] = "Picnic lunch outside";
    }

    if (test) { console.log("full array of plned text", planTextArr); }

    // set variable referencing planner element
    var $plannerDiv = $('#plannerContainer');
    // clear existing elements
    $plannerDiv.empty();

    if (test) { console.log("current time", nowHour12); }


    // build calendar by row for fix set of hours
    for (var hour = 9; hour <= 17; hour++) {
        // index for array use offset from hour
        var index = hour - 9;

        // build row components
        var $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.addClass('plannerRow');
        $rowDiv.attr('hour-index', hour);

        // Start building Time box portion of row
        var $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-md-2');

        // create timeBox element (contains time)
        const $timeBoxSpn = $('<span>');
        // can use this to get value
        $timeBoxSpn.attr('class', 'timeBox');

        // format hours for display
        var displayHour = 0;
        var ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }

        // populate timeBox with time
        $timeBoxSpn.text(`${displayHour} ${ampm}`);

        // insert into col inset into timebox
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);
        // STOP building Time box portion of row

        // START building input portion of row
        // build row components
        var $dailyPlanSpn = $('<input>');

        $dailyPlanSpn.attr('id', `input-${index}`);
        $dailyPlanSpn.attr('hour-index', index);
        $dailyPlanSpn.attr('type', 'text');
        $dailyPlanSpn.attr('class', 'dailyPlan');

        // access index from data array for hour 
        $dailyPlanSpn.val(planTextArr[index]);

        // create col to control width
        var $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9');

        // add col width and row component to row
        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);
        // STOP building Time box portion of row

        // START building save portion of row
        var $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-md-1');

        var $saveBtn = $('<i>');
        $saveBtn.attr('id', `saveid-${index}`);
        $saveBtn.attr('save-id', index);
        $saveBtn.attr('class', "far fa-save saveIcon");

        // add col width and row component to row
        $rowDiv.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);
        // STOP building save portion of row

        // set row color based on time
        updateRowColor($rowDiv, hour);

        // add row to planner container
        $plannerDiv.append($rowDiv);
    };

    // function to update row color
    function updateRowColor($hourRow, hour) {

        if (test) { console.log("rowColor ", nowHour24, hour); }

        if (hour < nowHour24) {
            // $hourRow.css('')
            if (test) { console.log("lessThan"); }
            $hourRow.css("background-color", "lightgrey")
        } else if (hour > nowHour24) {
            if (test) { console.log("greaterthan"); }
            $hourRow.css("background-color", "lightgreen")
        } else {
            if (test) { console.log("eqaul"); }
            $hourRow.css("background-color", "tomato")
        }
    };

    // saves to local storage
    // conclick function to listen for user clicks on plan area
    $(document).on('click', 'i', function(event) {
        event.preventDefault();

        if (test) { console.log('click pta before ' + planTextArr); }

        var $index = $(this).attr('save-id');

        var inputId = '#input-' + $index;
        var $value = $(inputId).val();

        planTextArr[$index] = $value;


        if (test) { console.log('value ', $value); }
        if (test) { console.log('index ', $index); }
        if (test) { console.log('click pta after ' + planTextArr); }

        // remove shawdow pulse class
        $(`#saveid-${$index}`).removeClass('shadowPulse');
        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });

    // function to color save button on change of input
    $(document).on('change', 'input', function(event) {
        event.preventDefault();
        if (test) { console.log('onChange'); }
        if (test) { console.log('id', $(this).attr('hour-index')); }

        // neeed to check for save button

        var i = $(this).attr('hour-index');

        // add shawdow pulse class
        $(`#saveid-${i}`).addClass('shadowPulse');
    });
});