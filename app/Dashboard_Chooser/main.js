var source_selector = generateSourceSelector();

Ext.application({
    name: 'DataComposer',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                //widget_chooser_panel,
                source_selector
//                example_panel1
                //example_panel2,
                //example_panel4,
            ],
        });
            
    }
});

