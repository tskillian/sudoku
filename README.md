# Sudoku

## Structure
The very basic server is app.js, which simply compiles and serves the single view located in the views directory. All client side javascript and CSS is located in the public directory.

## Technologies

I chose to use jade as my templating engine because it is much less verbose and easier to read than HTML. On the front-end, I used jQuery primarily to abstract away browser differences, because there's no use reinventing the wheel in that regard. Lastly, I used less as my CSS precompiler mostly because that is what I'm most familiar with, although the CSS was not complex enough to really use a precompiler to its full potential.

## Misc

Given more time, creating a board generator would be an interesting and fun application of a backtracking algorithm. Along the same lines, if I generated boards then my index view would be much more of a simple outline because I would need to dynamically generate much of it.

One interesting decision I had to make regarding interaction was how to treat number collisions (i.e. two 9s in one row). I originally made the app color all number collisions in red so that the player could get immediate feedback on why a given number doesn't work. However, I later realized that when you have both static and non-static numbers colored red due to a collision, the user no longer has any way of determining which numbers can be changed and which numbers cannot be changed. Due to this, I ultimately thought the lesser of the two evils was to have only numbers that the user could change turn to red upon collision. I felt that there was no great way to show the static numbers had collisions but could not be changed that would be immediately obvious to the user without explanation.

Additionally, when looking around at other sudoku games on the web, I did not particularly like their experience of actually having to hit backspace in order to update a box. Much of the way my javascript is written was with the purpose of giving a better experience than that. Essentially this means I bypass the default/standard way an input field is updated and do it myself with javascript. I believe that just being able to type a new number and have a box get updated is a better experience then having to hit backspace and then enter in a new number - it may sound insignificant but I felt it was worth the extra effort/code.

Link to hosted app: http://timsudoku.herokuapp.com/
