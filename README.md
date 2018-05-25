# lambda-bitbucket-claudia-api
A small API example made on Node.JS and Express, setup for being deployed on a pre-existing Lambda Function working on a AWS API Gateway, using Claudia.JS

## INTRO
I made this example API because all the other examples I found on the web were not complete or not working.
I needed a solution for updating an existing Lambda API maintained on a Bitbucket repository, working on Node.JS and Express.

## FEATURES
This Node.JS application has the following features:
- It's a JSON REST API made on Express
- It works in local (on port 3030) and in Lambda as well, so it can be tested easily
- It uses Routes and Controllers
- It uses Claudia.JS for updating it on a pre existing Lambda Function (so to demonstrate how it is possible to apply Claudia to a pre-existing work without the need to create a new Lambda function)
- It uses Bitbucket as main repository (also if I published it here on Github for making it available to the public)
- It has a preconfigured (and working!) Bitbucket Pipeline that uses Claudia directly from Bitbucket pipelines.
- It also provides a very useful claudia.json file where you can find how to properly configure this app for your AWS Lambda with your own credentials.

## HOW TO RUN THE API LOCALLY
- You need to have Node.JS pre-installed on your system
- clone or copy the this repository, open a terminal on its folder and run:

` > npm install `

` > node local.js `

- The server will start with the following console output:

` LAMBDA API EXAMPLE WORKING ON 3030 `

- Then you can open your browser and check the 2 routes on it:
⋅⋅ http://localhost:3030/
⋅⋅ http://localhost:3030/example

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



