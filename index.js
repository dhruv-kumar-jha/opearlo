const OpearloAnalytics = require('opearlo-analytics');

module.exports = {

  // initialize the config variables here.
  config: {
    OPEARLO_USER_ID: '',
    OPEARLO_VOICE_APP_NAME: '',
    OPEARLO_API_KEY: '',
    LOG_ERRORS: false,
    LOG_SUCCESS: false,
  },

  // store event, callback here so we can use these later.
  _event: {},
  lambdaCallback: null,

  // set the config variables.
  setConfig: function ( data ) {
    this.config.OPEARLO_USER_ID = data.OPEARLO_USER_ID;
    this.config.OPEARLO_VOICE_APP_NAME = data.OPEARLO_VOICE_APP_NAME;
    this.config.OPEARLO_API_KEY = data.OPEARLO_API_KEY;
    this.config.LOG_ERRORS = data.LOG_ERRORS;
    this.config.LOG_SUCCESS = data.LOG_SUCCESS;
  },


  // if the user doesn't set/provide config details, show this message.
  handleEmptyConfig: function () {
    console.log('You must set OPEARLO_USER_ID, OPEARLO_VOICE_APP_NAME and OPEARLO_API_KEY for opearlo-analytics to work.');
    console.log('opearlo-analytics implementation has been skipped entirely.');
  },

  initialize: function (event, context, callback) {
    this._event = event;
    this.lambdaCallback = callback;

    // check if user has set the config or not.
    if ( ! this.config.OPEARLO_USER_ID || ! this.config.OPEARLO_USER_ID || ! this.config.OPEARLO_API_KEY ) {
      return this.handleEmptyConfig();
    }
    // user has set the config.
    else {
      // initialize analytics
      this.initializeAnalytics(event);
      // register default voice events
      this.registerVoiceEvents(event);
    }

  },

  initializeAnalytics: function (event) {
    if ( event.session.new ) {
      OpearloAnalytics.initializeAnalytics( this.config.OPEARLO_USER_ID, this.config.OPEARLO_VOICE_APP_NAME, event.session);
    }
  },

  registerVoiceEvents: function (event) {
    if ( event.request.type === "IntentRequest" ) {
      OpearloAnalytics.registerVoiceEvent( event.session.user.userId, "IntentRequest", event.request.intent );
    }
    if ( event.request.type === "LaunchRequest" ) {
      OpearloAnalytics.registerVoiceEvent( event.session.user.userId, "LaunchRequest" );
    }
  },


  // this is the callback used by alexa
  callback: function (err, data) {
    OpearloAnalytics.recordAnalytics( this._event.session.user.userId, this.config.OPEARLO_API_KEY )
      .then( (result) => {
        if ( this.config.LOG_SUCCESS ) { console.log('result',result); }
        return this.lambdaCallback(err, data);
      })
      .catch((error) => {
        if ( this.config.LOG_ERRORS ) { console.log("Record Analytics Error: ", error); }
        return this.lambdaCallback(err, data);
     });
  },


}

