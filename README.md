# lambda-bitbucket-claudia-api
A small API example made on __Node.JS__ and __Express__, setup for being deployed on a pre-existing __Lambda__ Function working on a AWS __API Gateway__, using __Claudia.JS__

## INTRO
I created this example API because all the other examples I could find on the web were not complete or not working.
I needed a solution for updating an __existing__ Lambda API maintained on a __Bitbucket__ repository, working on Node.JS and Express.

## FEATURES
This Node.JS application has the following features:
- It's a simple JSON REST API made on Express, with __2 routes__
- It works both in local or on a traditional machine (on port 3030) and in Lambda as well
- It has a simple Controller addressed by the router
- It uses __Claudia.JS__ for deploying it on a pre existing Lambda Function (so to demonstrate how it is possible to apply Claudia to a pre-existing work without the need to create a new Lambda function)
- It uses Bitbucket as main repository (also if I published it here on Github for making it available to the public)
- It has a preconfigured (and working!) Bitbucket Pipeline that makes Claudia able to be launched directly from Bitbucket pipelines.
- It also provides a very useful __claudia.json__ file where you can find how to properly configure this app for your AWS Lambda with your own credentials.

## HOW TO RUN THE API LOCALLY
* (_You need to have Node.JS pre-installed on your system_)
* Clone or copy this repository, then open a terminal on its folder and run:

` > npm install `

` > node local.js `

* The server will start with the following console output:

  * > LAMBDA API EXAMPLE WORKING ON 3030

* Then you can open your browser and check the 2 routes on it:

  * http://localhost:3030/

  * http://localhost:3030/example


### HOW THIS API WORKS IN LOCAL:

The main script launched on local.js instantiates an Express application that will require a router on `app/route/index.js`. 
The router script has sa main route `"/"` that answers with the following json: 

```javascript
{
"result": 1,
"message": "Base Path"
}
```

It also addresses all the requests starting with `"/example"` to a controller on app/controller/example.js



