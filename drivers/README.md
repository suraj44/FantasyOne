### 12/9/2018 
why is the output of node driver-model.js: 
```
undefined
connected to fantasyone database
```
if the sql.query() is written in the global scope, it works fine.
Need to figure out how to write the getAllDrivers() function correctly.

### 17/9/2018
Figured out how to deal with the scoping problem.
refer [driver-model.js](./driver-model.js) for detailed explanation. 
Need to read more about callbacks and why they are needed. But I Fixed the problem referring to [this link](https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node).
TODO for MJ: Try exporting the results of getAllDrivers() to the controller file (which is yet to be created).

### 18/9/2018
Started writing the ```updateDriverWeeklyScore()``` function. Learnt how to 'mark' the datatypes of the function parameters for the compiler. Not only datatypes of parameters, but things like if the function is a constructor or something similar can be marked as well. Refer [THIS](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler) for more details of the same. 
Refer [THIS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) for the different datatypes JavasScript has
Completed ```updateDriverWeeklyScore()``` and ```getDriversSortedByTotalPoints```.