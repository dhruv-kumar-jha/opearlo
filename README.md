# Opearlo

Easily integrate [opearlo-analytics](https://www.npmjs.com/package/opearlo-analytics) into your Alexa Skill.


## Why?

There are very few Analytics service providers for Alexa Skills that I know of, Opearlo Analytics is one of them.
While they have their own Module and pretty good documentation, Their module implementation is not as easy as it could have been.

Their module needs us to wrap all of our **Intent Handler** in their callback function, This is bad because

- If a Skill has many Intents, This is (repeating)* time consuming process
- If we decide to use some other Analytics provider, We will have to get rid of all the code we added.
- It's best to keep our Intents free of third party logic.




## Installation


To install **Opearlo**, Just run the command

```javascript
$ yarn add opearlo // or npm install opearlo
```

This project is dependant on [https://www.npmjs.com/package/opearlo-analytics](https://www.npmjs.com/package/opearlo-analytics) library and it will be automatically installed as well.


## Configuration

- **OPEARLO_USER_ID**: Your Opearlo Analytics App OPEARLO_USER_ID
- **OPEARLO_VOICE_APP_NAME**: Your Opearlo Analytics App OPEARLO_VOICE_APP_NAME
- **OPEARLO_API_KEY**: Your Opearlo Analytics App OPEARLO_API_KEY
- **LOG_ERRORS**: Log error everytime the API call fails.
- **LOG_SUCCESS**: Log success response everytime the API call is successful.

You must provide the values for `OPEARLO_USER_ID`, `OPEARLO_VOICE_APP_NAME` and `OPEARLO_API_KEY`.


## Usage

```javascript
// import the library
const Opearlo = require('opearlo');

// in your exports.handler add the following
exports.handler = function(event, context, callback) {

  // please note I have replaced callback with Opearlo.callback.bind(Opearlo)
  // this is the hacky bit.
  const alexa = Alexa.handler(event, context, Opearlo.callback.bind(Opearlo) );
  alexa.registerHandlers(handlers);

  // set your config variables here
  Opearlo.setConfig({
    OPEARLO_USER_ID: '',
    OPEARLO_VOICE_APP_NAME: '',
    OPEARLO_API_KEY: '',
    LOG_ERRORS: true, // default false
    LOG_SUCCESS: false, // default false
  });
  // initialize Opearlo
  Opearlo.initialize(event, context, callback);

  alexa.execute();
};
```

That's it. You're done!, You should start seeing the Logs in your Opearlo Analytics dashboard.


## Feature Requests / Pull Request

If you have any specific feature request which might be useful for this library just let me know., I am open to Pull Requests as well, Just `create a new issue` or `email me`.

