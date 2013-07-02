core-js
=======

Useful event-driven javascript library based on CORE principles

h2. Features

*Event listening:*

<blockquote>
<script src="core.js"></<script>

var ExampleNamespace = { };

ExampleNamespace.obj1 = {
    method1: function() {
        Core.CatchEvent(Event.DOM.Init);
        console.log('DOM Init catch');
    }
}

Core.processNamespace(ExampleNamespace);

</blockquote>

*Listen many events:*

<blockquote>
<script src="core.js"></<script>

var ExampleNamespace = { };

ExampleNamespace.obj1 = {
    method1: function() {
        var e = Core.CatchEvent(Event.DOM.Init, Event.Window.Scroll);
        if(e instanceof Event.DOM.Init) {
            console.log('DOM Init catch');
        }
        if(e instanceof Event.Window.Scroll) {
            console.log('Window Scroll catch');
        }
    }
}

Core.processNamespace(ExampleNamespace);

</blockquote>

*Fire event*

<blockquote>
<script src="core.js"></<script>

// Create namespace in special object Event
Event.ExampleNamespace = { };

Event.ExampleNamespace.obj1 = {
    event1: new Core.EventPoint,
    event2: new Core.EventPoint
};

...

new Event.ExampleNamespace.obj1();
new Event.ExampleNamespace.obj1({prop1: 'aaa', prop2: 'bbb'});

</script>

</blockquote>

