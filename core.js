if(typeof window != 'undefined') {
    global = window;
}

if(typeof global.Event == 'undefined') {
    global.Event = { };
}

if(typeof global.Request == 'undefined') {
    global.Request = { };
}

var Core = {
    __event_stack: [],
    EventPoint: function() {
        function event(data) {
            var i;
            if(data) {
                for(i in data) {
                    this[i] = data[i];
                }
            }
            for(i in event.listeners) {
                this.name = event.listeners[i][2];
                Core.__event_stack.unshift(this);
                try {
                    event.listeners[i][1].apply(event.listeners[i][0], arguments);
                } catch (e) {
                    console.error(e);
                }
                Core.__event_stack.shift(this);
            }
        }
        event.listeners = [];
        return event;
    },
    RequestPoint: function() {
        throw "Not ready"
    },
    processNamespace: function(namespace) {
        for(var _classname in namespace) {
            var _class = namespace[_classname];
            if (_class.__inited__)
                continue;
            if (_class.__init instanceof Function) {
                _class.__init();
            }
            for(var method in _class) {
                var events;
                if (_class[method] instanceof Function) {
                    if (events = _class[method].toString().replace(/\n/g,"").match(/Core\.CatchEvent\(([^\)]+)\)/m)) {
                        events = events[1].replace(/^ *| *$/g,"").split(/ *, */);
                        for(var i in events) {
                            try {
                                var parts = events[i].split('.');
                                var cursor = global;
                                for(var n in parts) {
                                    cursor = cursor[parts[n]];
                                }
                                cursor.listeners.push([_class, _class[method], events[i]])
                            } catch(e) {
                                console.error('cannot parse ' + events[i] + ' in CatchEvent in [namespace].' + _classname + '.' + method, e);
                            }
                        }
                    }
                }
            }
            _class.__inited__ = true;
        }
    },
    CatchEvent: function() { return Core.__event_stack[0]; /* supress no arguments warning */ arguments;},
    Env: function() {
        var args = arguments;
        return function(_class, pattern) {
            for(var i = 0; i < args.length; i++) {
                for(var j in args[i]) {
                    if(args[i][j] instanceof _class) {
                        if(!pattern)
                            return args[i][j];
                        var ret = true;
                        for(var k in pattern) {
                           if(args[i][j][k] != pattern[k]) {
                               ret = false;
                               break;
                           }
                        }
                        if(ret) {
                            return args[i][j];
                        }
                    }
                }
            }
            return null;
        }
    }
};

if(typeof window != 'undefined') {

    Event.DOM = {
        Init: new Core.EventPoint()
    };

    Event.Window = {
        Scroll: new Core.EventPoint(),
        Resize: new Core.EventPoint()
    };

    // cross-browser DOM_Ready
    (function contentLoaded(win, fn) {

        var done = false, top = true,

            doc = win.document, root = doc.documentElement,

            add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
            rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
            pre = doc.addEventListener ? '' : 'on',

            init = function(e) {
                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)) fn.call(win, e.type || e);
            },

            poll = function() {
                try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
                init('poll');
            };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    })(window, function(e){
        var old_onscroll, old_onresize;
        if(window.onscroll || document.body.onscroll) {
            old_onscroll = window.onscroll || document.body.onscroll;
        }
        if(window.onresize || document.body.onresize) {
            old_onresize = window.onresize || document.body.onresize;
        }

        new Event.DOM.Init(e);
        window.onscroll = document.body.onscroll = function(event) {
            if(old_onscroll) {
                old_onscroll(event);
            }
            new Event.Window.Scroll(event);
        };
        window.onresize = document.body.onresize = function(event) {
            if(old_onresize) {
                old_onresize(event);
            }
            new Event.Window.Resize(event);
        };

    });
}

if(typeof require != 'undefined') {
    module.exports = Core;
}
