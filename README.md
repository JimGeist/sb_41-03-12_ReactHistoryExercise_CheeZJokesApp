# sb_41-03-12_ReactHistoryExercise_CheeZJokesApp
 
## Technology Stack
- **Front-end**: ReactJS
- **Back-end**: n/a

## Assignment Details

Take a functional-based React application and convert it to a class-based application. There should be no perceivable differences between the 2 applcations.

Test were not created for this assignment.

## Additional Details

**Enhancements**
- Tweeked the react spinner so there is something displayed while the application loads. 
- The applications appear side-by-side. The 'class-based' application is on the left and the 'functional-based' component application is on the right . . . *OR* maybe I just used the functional-based component twice and just changed the button text on one of them!

**Difficulties**
- No solid complete examples from the video or sample code to pull from. The class version was rendered in `index.js`. The class grew out of an initial class with a `constructor`, `componentDidMount()`, `componentDidUpdate()`, and `render()` lifecycle methods and lots of `console.log`s and `console.dir`s to get an idea of the flow. 
- not immediately realizing `this.state` in the constructor is where `state` values had to go. `state` is set up as on object so multiple values can have state.
- Function not found? `.bind(this)`. At least `bind` and `this` are not as foreign to me as they were on the [Connect Four refactoring](https://github.com/JimGeist/sb_12-02-10_ConnectFourRefactoring) assignment where the game had to get converted from functions to a class.
- Some research to get the fontawesome fonts appearing correctly in the based-based application. 


