function Event(sender) {
    this._sender = sender;
    this._listeners = [];
    //console.log(sender);
}

Event.prototype = {

    addListener: function (listener) {
        this._listeners.push(listener);
    },
    notifyListeners: function (args) {
        var index;
        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};