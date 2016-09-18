'use strict';

export default class Times {
  constructor(callback) {
    this.callback = callback;
  }

  repeat(length) {
    return Array.from(
      { length },
      (...args) => this.callback(args[1])
    );
  }
}
