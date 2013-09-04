var main_banner = generateBannerPanel("Select Layout ", "<div style='text-align: center' class='centered'>Select a layout for your new Dashboard</div>");


var main_panel = Ext.create('Ext.Panel', {
	id: "main_panel",
	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'center',
	},
	border: false,
	defaults: {border:false},
	items: [
		main_banner,
		dashboard_chooser_panel,
		{html: "", height: 400}
	]
});

Ext.application({
    name: 'DataComposer',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            id: "dashboard_chooser",
            layout: 'card',
            //width: 600,
            //height: 350,
            border: false,
            items: [
                main_panel
                //dashboard_chooser_panel,
                //singleton_layout,
                //vertical_layout,
                //horizontal_layout,
                //right_T_layout
                
            ],
        });
            
    }
});

//OWF.Eventing.publish("hello", "world");
/*
var getPrefSuccess = function(successObject) {
	console.log("Success in getting: ", successObject);
	if (successObject) {
		if (successObject.value) {
			var data = Ext.JSON.decode(successObject.value);
			console.log("Sending to name: ", data[0]);
			console.log("Sending message: ", data[1]);

			OWF.Eventing.publish(data[0], data[1]);
		}
	}
}

var getPrefFailure = function(error) {
	console.log("Error in getting: ", error);
}

for(var i = 0; i<4; i++){
	Ozone.pref.PrefServer.getUserPreference(
		{	
			namespace:'dashboardbuilder.seamlessc2.mitre.org', 
			 name:'data'+i,
			 onSuccess:getPrefSuccess, 
			 onFailure:getPrefFailure
		}
	);
}
*/

/*
var setPrefSuccess = function(successObject) {
	console.log("Success in setting: ", successObject);
}

var setPrefFailure = function(error) {
	console.log("Error in setting: ", error);
}


Ozone.pref.PrefServer.setUserPreference(
	{	
		namespace:'dashboardbuilder.seamlessc2.mitre.org', 
		 name:'testPreference',
		 value: Ext.JSON.encode(["hello", "world"]),
		 onSuccess:setPrefSuccess, 
		 onFailure:setPrefFailure
	}
);


var getPrefSuccess = function(successObject) {
	console.log("Success in getting: ", successObject);
	console.log("Value is: ", Ext.JSON.decode(successObject.value));
	
	//OWF.Eventing.publish(dataName, dataSet);
}

var getPrefFailure = function(error) {
	console.log("Error in getting: ", error);
}


Ozone.pref.PrefServer.getUserPreference(
	{	
		namespace:'dashboardbuilder.seamlessc2.mitre.org', 
		 name:'testPreference',
		 onSuccess:getPrefSuccess, 
		 onFailure:getPrefFailure
	}
);
*/

console.log("yup");

console.log("dashboard_chooser_main.js loaded");