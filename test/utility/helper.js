export class EventTestHelper {
  static waitForEvent (emitterInstance, eventName) {
    return new Promise((resolve) => {
      emitterInstance.on(eventName, resolve);
    })
  }
}