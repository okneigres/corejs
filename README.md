core-js
=======

Useful event-driven javascript library based on CORE principles

*Event listening:*

<blockquote>
<script src="core.js"></<script>

var ExampleNamespace = { };

ExampleNamespace.obj1 = {
    method1: function() {
        Core.CatchEvent(Event.DOM.Init);
        ....
    }
}

</blockquote>

*Listen many events:*

<blockquote>
<script src="core.js"></<script>

var ExampleNamespace = { };

ExampleNamespace.obj1 = {
    method1: function() {
        Core.CatchEvent(Event.DOM.Init, Event.Window.Scroll);
        ....
    }
}

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

new Event.ExampleNamespace.obj1();
new Event.ExampleNamespace.obj1({prop1: 'aaa', prop2: 'bbb'});

</script>

</blockquote>

