# Cook-unity 

## Requirements

1. Node.js Versions: 12 - 14 - 18;


## Application

The application has been built using Express and Jazeera. 
So, What is Jazeera you are wondering. Jazeera is library writen by myself that provides 2 interesting features:
 - 1. A set of decorators that helps you to create your REST API in a declarative way (Similar to NEST).
 - 2. A really simple dependency injection system. Just add a decorator called @Service() in your dependency class, and then inject it just typing the class in a constructor.

Also, it's a really light-weight library, it only has 2 dependencies: Express and Reflect-metadata.
[Here](https://github.com/juampipardal/jazeera) the github repository, if you want to take a look. And also the [npm dependency](https://www.npmjs.com/package/jazeera).

Coming back with the project, I used Axios for Http requests; I could use fetch API but it's only on Node 18 and I'm not sure which version i can use.
Also, the app connects to a REDIS cache. One of the main reasons is because the Currency API only give us 100 request/month.  
Also, I use it to store the counters every country's ip. 


The project structure is really simple. In src/app.ts I bootstrap the Jazeera Application and I set the modules/controllers. 
Then, In src/server.ts I startup the server.




## Startup application

First of all, we have to check if we are using a valid Node version.

If you use NVM, you can use nvm ls, and check it out.
If you are not using the correct version and you do not have it installed either, you can run nvm install 14, or any other valid version.
If you already have installed it, just run nvm use 18.14.0, or any other valid version.
Then, you have to install everything. In root folder, run npm install.

Once we have setted a valid Node version and installed all dependencies, you just have to RUN  `npm run start`
If everything goes fine, your should see in terminal App listening on port 8000.


## Tests

I would have liked to add more tests. I added one test file for `traces.service.ts`, with some posible cases, like error cases and OK cases.
To run tests, we need to execute `npm run test:unit`.
The tests runs with Jest.


## Deploy

I deployed the application and also a REDIS instance on Railway. You can take a look with this urls:
  (First one is a POST)
- https://cook-node-production.up.railway.app/traces
- http://cook-node-production.up.railway.app/statistics


## The end
Thanks for your time, and anything, let me know!
