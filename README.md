# Sudoku

## Structure
The very basic server is app.js, which simply compiles and serves the single view located in the views directory. All client side javascript and CSS is located in the public directory.

## Technologies

I chose to use jade as my templating engine because it is much less verbose and easier to read than HTML. On the front-end, I used jQuery primarily to abstract away browser differences, because there's no use reinventing the wheel in that regard. Lastly, I used the less as my CSS precompiler mostly because that is what I'm most familiar with, although the CSS was not complex enough to really use a precompiler to its full potential.

## Misc

Creating a board generator would be an interesting/fun application of a backtracking algorithm that I think would be fun, given more time. Along the same lines, if I generated boards then my index view would be much more of a simple outline because I would need to dynamically generate much of it.
