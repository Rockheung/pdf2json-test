const nodeUtil = require("util");
const stream = require("stream");

module.export = function StringifyStream() {
  stream.Transform.call(this);

  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
};
nodeUtil.inherits(StringifyStream, stream.Transform);

StringifyStream.prototype._transform = function(
  obj,
  encoding = "utf8",
  callback
) {
  this.push(JSON.stringify(obj));
  callback();
};
