$(function() {

    //initialise timer and interval timer
    var timer;
    var main;

    //initialise toastr, progress box, used this dead simple plugin for a few
    // Angular projects, works fine
    //for better flexability, customisation in another project growl proved better

    function init() {
        $('#isRunning').hide();
        toastr.options.timeOut = 3000;
        toastr.options.closeButton = true;
        toastr.options.newestOnTop = false;
    }

    init();

    messageSystem = {
        showMessage: function(msg) {
            toastr.info(msg);
        }
    }

    function showMsg() {
        quotes = [
            "What we've got here is failure to communicate.",
            'Go ahead, make my day.',
            "I've got a bad feeling about this.",
            "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
            "I find your lack of faith disturbing.",
            "You're gonna need a bigger boat.",
            "Tell Mike it was only business.",
            "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
        ];
        messageSystem.showMessage(_.sample(quotes));
    }

    //using jquery promises to handle async call backs,
    //what is most interest to us deferred.notify to allow us to display the 'in progress' message
    //on the success callback we can give the user the option to stop the timers
    function asyncTimer(interval, timeout) {

        //create deffered promise
        var deferred = $.Deferred();

        //update, set the timer interval
        timer = setInterval(function() {
            deferred.notify();
        }, interval);

        //success, set the timer
        main = setTimeout(function() {
            clearInterval(timer);
            timer = null;
            deferred.resolve();
        }, timeout);

        //return promise
        return deferred.promise();
    }

    function startTimer() {
        //establish random time for timer to appear for
        var rand = Math.round(Math.random() * (3000 - 500)) + 500;
        //interval is set to 1 second, could be utilised better if we were showing
        //a progress bar or appending dots ...
        return asyncTimer(1000, rand).then(function() {
                //success
                $('#isRunning').hide();
                $('#msgButton').text('stop');
                startTimer();
            },
            null, //don't handle errors in our custom async timer
            function() {
                //update
                $('#isRunning').show();
                showMsg();
            });
    }

    //clear timers, toastr messages and buttons, status
    function stopTimer() {
        toastr.remove();
        clearInterval(timer);
        clearTimeout(main);
        timer = null;
        main = null;
        $('#msgButton').text('Start');
        $('#isRunning').hide();
    }

    //start/stop the timer
    $('#msgButton').click(function() {
        var btn = $(this);
        btnTxt = btn.text();
        if (btnTxt === 'stop') {
            stopTimer();
        } else {
            startTimer();
        }
    });

});
