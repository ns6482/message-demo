# message-demo
For my solution chose toastr. Why? Pretty easy to utilise and its functionality
seemed to meet most of your requirements.
Struggled a little with the update progress, code was getting a bit messy. 
Used jquery promises (used to $q typically), I think I've utilised it correctly.
To use the promises had to do some refactoring, mainly around the button events,
setup some clean methods, start timer, clear timer etc. Help code readability.

It could be a lot better. The button, for e.g. could be a widget, component
that has a built in timer and you can hook up callbacks for intervals and stop.
You could supply the timer period, interval period on construction.
