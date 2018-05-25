# lambda-bitbucket-claudia-api
A small API example made on __Node.JS__ and __Express__, ready for being deployed on a __pre-existing Lambda__ function working on a AWS __API Gateway__. The deployment will use __Claudia.JS__ directly from __Bitbucket__ repositories and pipelines.

## INTRO
I created this example API because all the other examples I could find on the web were not complete or not working.
I needed a solution for updating an __existing__ Lambda API maintained on a __Bitbucket__ repository, working on Node.JS and Express.
So the natural choice was to apply Claudia.js for it. After I succeeded on this purpose I created this simplified version for explaining how to achieve the same purpose on your own existing projects maintained on Bitbucket.

## FEATURES
This node application has the following features:
- It's a simple JSON REST API made on Express, with __2 routes__
- It works both in local or on a traditional machine (on port 3030) and in Lambda as well
- It has a simple Controller addressed by the router
- It uses __Claudia.JS__ for deploying itself on a pre existing Lambda Function (so to demonstrate how it is possible to apply Claudia to a pre-existing work without the need to create a new Lambda function)
- It uses Bitbucket as main repository (also if I published it here on Github for making it available to the public)
- It has a preconfigured (and working!) Bitbucket Pipeline that makes Claudia able to be launched directly from Bitbucket pipelines.
- It also provides a very useful __claudia.json__ file where you can find how to properly configure this app for your AWS Lambda with your own credentials.

## STRUCTURE

```

|-- app
|   |-- controller
|   |    |-------- example.js
|   |
|   |-- route
|        |-------- index.js
|
|-- app.js
|-- bitbucket-pipelines.yml
|-- claudia.json
|-- lambda.js
|-- local.js
|-- package.json
|-- pre-deploy.py
|-- README.md

```



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

The main script launched on __local.js__ (or on __lambda.handler__ if on lambda) instantiates an Express application that will require a router on `app/route/index.js`. The router script has 2 routes. The main route `"/"` answers with the following json: 

```javascript
{
"result": 1,
"message": "Base Path"
}
```

The second one `"/example"` is sent to a controller on app/controller/example.js that will manage its own subroutes and at the moment it has only the base subroute that will answer with:

```javascript
{
"result": 1,
"message": "example controller"
}
```


## HOW TO RUN THE API ON LAMBDA

This API works on a very simple Lambda environment setup:

* Runtime: Node 8.10 (but also on 6.10)
* Handler: lambda.handler

As explained in the INTRO the purpose of this example is to show how to deploy it on a __PRE-EXISTING__ lambda function not created  using ` claudia create ` command.
  
So the first deployment of this requires you to deploy it manually (just zipping this folder and put it on Lambda dashboard on AWS console).
 
Lambda will use a different script for running the application. In local we run it from "local.js"; on Lambda we inform it that the handler is on lambda.js file. And this file uses the great __aws-serverless-express__ module to make Express.JS able to be used on Lambda. Both launcher scripts (local.js and lambda.js) are agnostic about your own application. So they can be a useful way to transform  your own pre-existing Express app into a serverless app, without the need to change your code.
Just copy the files on your project and be sure that your express application bootstrap is called app.js.

That's because the real application (in common with the 2 "launchers") is on app.js! The launchers refer both to it.

So, both launchers require app.js to work, and this make this app runnable both on traditional servers ( `node local.js` ) and on lambda (requiring `lambda.handler` as handler).

## BITBUCKET SETUP

This example can be put on a __Bitbucket__ repository where you have to __setup 2 environment variables__ (go on your repo, then on "settings" and then on "environment variables"):

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

The pipeline script will use them for correctly configuring Claudia.JS. Follow this guide for setting up a IAM user for Claudia: https://claudiajs.com/tutorials/installing.html 

Now, because we don't use the "claudia create" command (because we assume that your API is still up and running on Lambda and API Gateway), we need to have a __claudia.json__ file already configured for making claudia correctly working with its "update" command.
In this example you can find it. Just open it and substitute the parts with your own:

* name: your lambda function name (the exact name you have on your lambda function)
* role: usually it is the lambda function name with "-executor" suffix (check the claudia.json file to find an example)
* region: your lambda function aws region
* id: the API GATEWAY id (not the lambda id) that can be found on the API gateway associated with your lambda function, looking up on the breadcrumbs in brackets
* url: the API Gateway public url of your existing API


## HOW THE bitbucket-pipelines.yml WILL DEPLOY ON YOUR LAMBDA

Now that you have everything configured on your bitbucket repository, the pipeline will start automatically the deployment with the following commands I put on the yml file:

* `apt-get update`
* this will just update the bitbucket environment
* `apt-get install -y python-dev`
* this will install python that is required to launch the following python script
* `chmod +x pre-deploy.py`
* `python pre-deploy.py $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY`
* this command will launch the script called pre-deploy.py that basically performs one operation mandatory for claudia.js: to have the AWS credentials available where she thinks they should be: on /HOMEDIR/.aws/credentials. So this script will create a temp file in this virtual location on Bitbucket. This is important because claudia.js has been created to easily deploy from a server or a local PC, not from a Bitbucket repo. 
* `npm install claudia -g`
* this command installs claudia globally on the bitbucket deployment environment
* `TMPDIR=/tmp claudia update --version prod --set-env LOCAL_DEV=false --timeout 30 --profile claudia`
* finally we launch the "claudia update" command to send the app to lambda.

If the pipeline doesn't give errors it will output a json with the operations performed 

---------------------------------------------
---------------------------------------------

This project is based on: https://github.com/MEGApixel23/claudia-bitbucket-pipelines that unfortunately does't work.
Hope it will help someone to not waste hours as I had to.




