# Sudoku

## Structure
The very basic server is app.js, which simply compiles and serves the single view located in the views directory. All client side javascript and CSS is located in the public directory.

## Technologies

I chose to use jade as my templating engine because it is much less verbose and easier to read than HTML. On the front-end, I used jQuery primarily to abstract away browser differences, because there's no use reinventing the wheel in that regard. Lastly, I used the less as my CSS precompiler mostly because that is what I'm most familiar with, although the CSS was not complex enough to really use a precompiler to its full potential.

## Misc

Given more time, creating a board generator would be an interesting and fun application of a backtracking algorithm. Along the same lines, if I generated boards then my index view would be much more of a simple outline because I would need to dynamically generate much of it.

The part of the project I'm least confident in is the visual design/color scheme. I consider myself to be good enough at determining whether something looks good or looks bad, but given a blank slate, I'll be the first to admit I'm not the greatest at coming up with designs. In contrast, I do consider myself good at determining what the user experience should be like in terms of interacting with a page. One interesting decision I had to make regarding interaction was how to treat collisions. I originally made the app color all number collisions in red so that the player could get immediate feedback on why a given number doesn't work. However, I later realized that when you have both static and non-static numbers colored red due to a collision, the user no longer has any way of determining which numbers can be changed and which numbers cannot be changed. Due to this, I ultimately thought the lesser of the two evils was to have only numbers that the user could change turn to red upon collision. I felt that there was no great way to show the static numbers had collisions but could not be changed that would be immediately obvious to the user without explanation.
