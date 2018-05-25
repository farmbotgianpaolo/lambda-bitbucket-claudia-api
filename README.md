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


### HOW THIS API WORKS:

The main script launched on local.js (or on lambda.handler if on lambda) instantiates an Express application that will require a router on `app/route/index.js`. 
The router script has sa main route `"/"` that answers with the following json: 

```javascript
{
"result": 1,
"message": "Base Path"
}
```

It also addresses all the requests starting with `"/example"` to a controller on app/controller/example.js


## HOW TO RUN THE API ON LAMBDA

This API works on a very simple Lambda environment setup:

* Runtime: Node 8.10 (but also on 6.10)
* Handler: lambda.handler

As explained in the INTRO the purpose of this example is to show how to deploy it on a __PRE-EXISTING__ lambda function not created  using ` claudia create ` command.
So let's assume you already have deployed it manually on lambda (just zipping this folder and put it on Lambda dashboard on AWS console).

Lambda will use a different script for running the application. In local we run it from "local.js"; on Lambda we inform lambda that the handler is on lambda.js file. And this file uses the magnificient __aws-serverless-express__ module to make express able to be run from Lambda. You can use both scripts (local.js and lambda.js) as they are on your own application without the need to change them.
And that's because the real application (in common with the 2 "launchers") is on app.js! (as a any old node applications!)

So, both launchers require app.js to work, and this make this app runnable both on traditional servers ( `node local.js` ) and on lambda (requiring `lambda.handler` as handler).






