$( document ).ready(
    function() {
        $(
            function() {
                var tabs = $( "#tabs" ).tabs();
                tabs.find( ".ui-tabs-nav" ).sortable(
                    {
                        axis: "x",
                        stop: function() {
                            tabs.tabs( "refresh" );
                        }
                    }
                );
            }
        );

        /* This is basic - uses default settings */

        $( ".fancybox" ).fancybox(
            {
                'titleShow'    : false,
                'transitionIn' : 'elastic',
                'transitionOut': 'elastic',
                'easingIn'     : 'easeOutBack',
                'easingOut'    : 'easeInBack'
            }
        );
    }
);
