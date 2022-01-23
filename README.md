# Node.js Coding Task

## We'll be building a RESTful CRUD (Create, Retrieve, Update, Delete) API with Node.js, Express and Firestore. ##

We'll be fetch data from the third party API LinkPreview and store those data into Firestore.

## Prerequisites :
You need to set up Firebase CLI for test APIs on your local system by visit [Firebase CLI] (https://firebase.google.com/docs/cli) here:

Install Firebase emulators for test API end point by visit [Firebase emulators] (https://firebase.google.com/docs/emulator-suite) link.

## Steps to run the code


Clone the code from the below repository and follow the steps to run.

* Clone this repository:
```
    $ git clone https://github.com/AuthorizeNet/sample-code-node.git
```
* Start firebase emulator use below command:

```
    $ npm run serve
```
* Deploy application on firestore:

```
    $ npm run deploy
```

* Install require packages by below command:

```
    $ npm install
```
* To run the application use below command. For example: 
```
    $ npm run start
```
* To run test case for whole application use below command. For example: 
```
    $ npm run test
```
* To run test case only for user module use below command. For example: 
```
    $ npm run test-user
```
* To run test case only for fetch ThirdParty API data use below command. For example: 
```
    $ npm run test-link
```

## Task completed
* Crud App using NodeJs Express Server and 4 API endpoints for each of create, read, update and delete operations 
* Fetch data from LinkPrevie and store sub-collection to firestore as per the requirement.