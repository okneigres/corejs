if(typeof require != 'undefined') {
    var Core = require('./core.js');
}

classes = {};
namespace = {};

namespace.EventEmitter = {
    CustomEvent1: new Core.EventPoint,
    CustomEvent2: new Core.EventPoint,
    emit1: function() {
        new this.CustomEvent1(1,2);
    },
    emit2: function() {
        new this.CustomEvent2(1,2,3);
    }
};

classes.EventHandler = {
    handler: function() {
        var event = Core.CatchEvent(namespace.EventEmitter.CustomEvent1);

        if (event instanceof namespace.EventEmitter.CustomEvent1)
            console.log("evt1", event, arguments);
        if (event instanceof namespace.EventEmitter.CustomEvent2)
            console.log("evt2", event, arguments);
    }
};

Core.processNamespace(classes);
Core.processNamespace(namespace);

namespace.EventEmitter.emit1();
namespace.EventEmitter.emit2();


