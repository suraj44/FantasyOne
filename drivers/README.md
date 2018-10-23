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

### 03/10/2018
Figured out how to export data from the model to the controller!
Need to shift the logic from lib/router to drivers/router though
So now, we can get whatever data we want from DB.
Next step would be to write an onClick() function to chnage a particular value in the database (weeklyScore function is already written so test with that)


### 04/10/2018
So if you go to ```/drivers/update_weekly_score``` , you can update the weekly score of a specified driver using
the front end. Only weird thing is i had to pass the "response" from the controller to the model because there's absolutely
no clean way of passing information from a asychronous function (the callback) to a synchronous function (the controller)

### 15/10/2018
1. Moved the function of redirecting to a particular URL out of model after learning more about how call backs can be used
Added functionality for an admin to log in, however as of now there is no admin session.
Need to create a session using token and then basically finish admin interface in one module and that will be good to go.

2. We could have used cookies and facilitated login using "sessions" which we learnt in application layer class. Instead, we'll be using a token based approach called [JWT](jwt.io). 


### 16/10/2018
Turns out JWT cookies are too complicated to use. Ditched using them, but kept the same directory structure. 
Used express-session instead. Way easier, takes care of creating and destroying session cookies on its own.
Need to add a little bit more info while logging in (was it username or password that was wrong)
Now that login is set, finishing admin side should be peace.



Creating a league:

Generate a league code
Insert the a new league in leagues table
Insert the person who created this league and the league ID into Team_League_Link
Retrieve League Code on front end


Joining a league:
get league id from league code
insert caller's team id into league