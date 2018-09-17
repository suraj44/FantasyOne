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
TODO: Try exporting the results of getAllDrivers() to the controller file (which is yet to be created). 