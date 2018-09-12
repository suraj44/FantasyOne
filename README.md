# FantasyOne
A web application simulating an online F1 Fantasy game.


### For development:
As the app isn't fully developed yet, I thought I would use the README as a scratch card of sorts to note down import things like coding style philosophy and maybe an explanation to how certain features are implemented. 

Resources followed:
https://github.com/i0natan/nodebestpractices
https://github.com/focusaurus/express_code_structure



1. Rather than creating every new object as a ```var```, I found that use ```const``` is a better option. Consider ```router = require('express').Router()```. ```router``` is never going to change in the course of the application so it makes more sense for it to be a ```const``` than a ```var```. https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75

2. Structuring components: Our project should be modularized into self contained components. The idea is to make the components as loosely coupled as possible so that the application can scale well. Refer - https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md

3. We should look into using a mature logger than just console.log(), at my internship when I was working with Android, the logger was beautiful because it consistent of different layers(error, debug and info). It's pretty easy to implement the same philosophy in NodeJS apps using a logger like Winston or Bunyan. Refer - https://github.com/i0natan/nodebestpractices/blob/master/sections/errorhandling/usematurelogger.md 

4. Place ```require()``` at the beginning of all files, not inside functions.

5. Rather than using callbacks like all the tutorials suggest, use Async

6. We should use a rate limiter to prevent a DDoS attack, good practice for a few years down the line.
Refer - https://github.com/i0natan/nodebestpractices/blob/master/sections/security/limitrequests.md

7. We should look into array (```=>```) functions. Refer - https://medium.com/javascript-scene/familiarity-bias-is-holding-you-back-its-time-to-embrace-arrow-functions-3d37e1a9bb75

8. Try incorporating the MVC philosophy as far as possible.

These are just a few practices I thought would be good to follow which would be of great use when we actually start developing software later on
