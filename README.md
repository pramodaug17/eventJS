# eventJS
[![](https://data.jsdelivr.com/v1/package/gh/pramodaug17/eventJS/badge)](https://www.jsdelivr.com/package/gh/pramodaug17/eventJS)
[![Build Status](https://travis-ci.org/pramodaug17/eventJS.svg?branch=master)](https://travis-ci.org/pramodaug17/eventJS)

eventJS library creates a pub-sub design. It enable you to use pub-sub in simplest way.

## Create Event
Below function to create the event
```javascript
events.registerEvent(eventName)
```
where 
- **eventName**: is name of event which will be created. Using the same name other compoents can subscribe to the event.
- **data**: is the parameter or the data which will be provided to callbacks


## Subscribe Event
Below function to subscribe the event
```javascript
events.on(eventName, callbackfn, {bindobj: obj})
```
where 
- **eventName**: is name of event which will be subscribe. If there is no such event craeted the error will be thrown
- **callbackfn**: is callback function which will be called on event
- **bindobj**: is the object to which callback function will be bind. if it passed the callback will be called in the obj's context

## Publishing Event
Below function to subscribe the event
```javascript
events.emit(eventName, data)
```
where 
- **eventName**: is name of event which will be publised.
- **data**: is the parameters to subscribers callback. more parameter can be added after data.

## Unsubscribe Event
Below function to subscribe the event
```javascript
events.off(eventName, callbackfn)
```
where 
- **eventName**: is name of event which will be unsubscribe. If there is no such event craeted the error will be thrown
- **callbackfn**: is callback function, which will be called on event, will get unsubscribed and will not be called on event.
