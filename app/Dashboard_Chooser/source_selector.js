//generates the "Add" button for a Source Panel
var generateSourceAddButtonPanel = function(sourceNum){
	//var button = generateSourceAddButton(sourceNum);
	var panel = Ext.create('Ext.Panel', {
		id: "add_button_panel"+sourceNum,
		layout: {
			type: 'hbox',
			align: 'stretch',
		},
		height: 25, 
		border: false,
		defaults: { border: false,},
		items: [
			{html:"", flex:1},
			{html:"Blank", bodyStyle: "color: #FFF;", flex:1},
			{html:"", flex:1},
		],
	});
	return panel;
}

var generateSourceRemoveButton = function(sourceNum){
	var button = Ext.create('Ext.button.Button', {
		id: 'source_remove_button'+sourceNum,
		class: 'remove_button',
		text: 'Remove',
		height: 20,
		width: 50,
		handler: function(){ 
			executeRemoveButton(sourceNum);
		}
	});
	return button;
};

//generates the "Remove" button for a Source Panel
var generateSourceRemoveButtonPanel = function(sourceNum){
	var button = generateSourceRemoveButton(sourceNum);
	var panel = Ext.create('Ext.Panel', {
		id: "remove_button_panel"+sourceNum,
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		height: 25, 
		border: false,
		defaults: { border: false},
		items: [
			{html:"", flex:1},
			button,
			{html:"", flex:1}
		]
	});
	//console.log("Generated button: ", button);
	//panel.hide();
	return panel;
}

console.log("Making source request...");
Ext.Ajax.request({
   method: "GET",
   url: "https://a2c2srv.mitre.org:8443/tailorcore/sources.json",
   success: function(response){
		//console.log("Success! Response: ", response.responseText);
		var responseObject =  Ext.JSON.decode(response.responseText);
		//console.log("Attempting to decode: ", responseObject);
		states = Ext.create('Ext.data.Store', {
    		fields: ['name', 'Url'],
		    data: responseObject 
		});
		console.log("Dynamic states are: ", states);
		//states = responseText;
		
   },   
   failure: function(response){
		console.log("FAILURE. Response: ", response);
		states = Ext.create('Ext.data.Store', {
   			fields: ['name', 'Url'],
		    data : [{"source_id":12,"name":"Decision Spaces","Url":"../tailor/options.csv"},{"source_id":13,"name":"CIV data source","Url":"http://tinker.mitre.org:8080/ComposableInformationVisualization/json/grouped-data.json"},{"source_id":14,"name":"Decision Spaces Web Service","Url":"http://crystal.mitre.org:8080/crystal-a2c2/eme/resultsets/1/ "},{"source_id":15,"name":"World Population Data Feed","Url":"http://a2c2srv.mitre.org:8080/cra/impl/WorldPopDataFeedAdaptor/CraInstanceServlet?requestType=getLatestDataItem"}]
		});
		console.log("Hardcoded states are: ", states);
   },
   callback: function(response){
   		console.log("now setting comboboxes");
   		
		combobox1 = Ext.create('Ext.form.ComboBox', {
			//fieldLabel: 'Choose State',
			id: "combobox1",
			store: states,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			width: 205,
			//renderTo: Ext.getBody()
		});

		combobox2 = Ext.create('Ext.form.ComboBox', {
			//fieldLabel: 'Choose State',
			id: "combobox2",
			store: states,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
				width: 205,
			//renderTo: Ext.getBody()
		});

		combobox3 = Ext.create('Ext.form.ComboBox', {
			//fieldLabel: 'Choose State',
			id: "combobox3",
			store: states,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
				width: 205,
			//renderTo: Ext.getBody()
		});

		combobox4 = Ext.create('Ext.form.ComboBox', {
			//fieldLabel: 'Choose State',
			id: "combobox4",
			store: states,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
				width: 205,
			//renderTo: Ext.getBody()
		});

   }
});

function generateSourceSelector(sourceNumber){ 
    /*
    var fileForm = Ext.create('Ext.form.Panel', {
    		id: "fileForm"+sourceNumber,
			flex: 1,
			bodyStyle: 'padding: 10px;',
			//border: false,
	
			defaults: {
				anchor: '100%',
				allowBlank: false,
				msgTarget: 'side',
				labelWidth: 50
			},
	
			items: [
			{html: "<div class='sourcePanel'>My Computer</div>", bodyStyle: "background: #DFE9F6; border: 0px;",},
			{
				xtype: 'filefield',
				id: 'inputFile'+sourceNumber,
				emptyText: 'Select a CSV file',
				name: 'inputFile',
				buttonText: 'Browse',
				listeners: {
					change: function(t, fileLocation) {
						console.log("file changed!");
						var form = this.up('form').getForm();
						console.log("form = ", form);
						if(form.isValid()){
							form.submit({
								//url: '/DataEngine/csvSlurper/',
								url: 'https://localhost:8443/DataEngine/csvSlurper/',
								force_mime_type: "text/plain",  
								waitMsg: 'Uploading your file...',
								success: function(fp, o) {
									msg('Success', 'Processed file "' + o.result.file + '" on the server');
								},
								failure: function (form, o) {
									Ext.Msg.show({
										title: 'Add Request Failed',
										msg: o.result.error,
										buttons: Ext.Msg.OK,
										icon: Ext.Msg.ERROR
									});
								}
							});
						}
					}
				}

			}],
	
		});
    */    
    var dropdownButton = Ext.create('Ext.button.Button', {
		//id: 'source_add_button'+sourceNumber,
		class: 'add_button',
		text: 'Add',
		bodyStyle: 'padding: 10px;',
		//height: 20,
		width: 50,
		handler: function(){ 
			executeAddButton(sourceNumber, "tailor");
		},
	});
    
    var dropdownForm = new Ext.form.FormPanel({
      //flex: 1,
      border: false,
      //layout: 'fit',
	  bodyStyle: 'padding: 10px;',
	  //height: 200,
      items: [
      	 {html: "<div class='sourcePanel'>Tailor Data Source</div>", bodyStyle: "background: #DFE9F6; border: 0px;",},
      	 window["combobox"+sourceNumber]
      ],
      buttons: [dropdownButton],
      listeners: {
      	/*
      	boxready: function(t, width, height) {
      		//console.log("Box ready! Resizing url form...");
      		var textField = Ext.get('urlInput'+sourceNumber);
      		var firstWidth = t.getWidth();
      		textField.setWidth(firstWidth - 30);
      	},
      	resize: function(t, width, height, oldWidth, oldHeight, eOpts ) {
      		//console.log("Resizing...");
      		var textField = Ext.get('urlInput'+sourceNumber);
      		textFieldOldWidth = textField.getWidth();
      		textField.setWidth(textFieldOldWidth + (width - oldWidth));
      	}
      	*/
      }
   });
    
    var dropdownPanel1 = Ext.create('Ext.Panel', {
    	id: "dropdownPanel1-"+sourceNumber,
    	layout: 'fit',
    	//width: 240,
    	//height: 240,
    	border: true,
    	items: [
			//{html: "", flex: 1, border: false},
			dropdownForm,
			//{html: "", flex: 1, border: false}
		]
    });
    
    var dropdownPanel2 = Ext.create('Ext.Panel', {
    	id: "dropdownPanel2-"+sourceNumber,
    	layout: {
    		type: 'vbox',
    		align: 'stretch'
    	},
    	width: 240,
    	padding: "10px",
	   	height: 132,
    	border: false,
    	items: [
			//{html: "", flex: 1, border: false},
			dropdownPanel1,
			//{html: "", flex: 1, border: false}
		]
    });
    
	var urlButton = Ext.create('Ext.button.Button', {
		//id: 'source_add_button'+sourceNumber,
		class: 'add_button',
		text: 'Add',
		bodyStyle: 'padding: 10px;',
		//height: 20,
		width: 50,
		handler: function(){ 
			executeAddButton(sourceNumber, "url");
		},
	});
    
    
    var urlForm = new Ext.form.FormPanel({
      //flex: 1,
      border: false,
      //layout: 'fit',
	  bodyStyle: 'padding: 10px;',
	  //height: 200,
      items: [
      	 {html: "<div class='sourcePanel'>URL Data Source</div>", bodyStyle: "background: #DFE9F6; border: 0px;",},
      	 //window["combobox"+sourceNumber]
         
         new Ext.form.TextField({
         	xtype: 'textfield',
			id:'urlInput'+sourceNumber,
			name: 'urlInput'+sourceNumber,
			label: "Web Address",
			hideLabel: 'true',
			//height: 40,
			width: 200,
		}),
		
      ],
      buttons: [urlButton],
      listeners: {
      	/*
      	boxready: function(t, width, height) {
      		//console.log("Box ready! Resizing url form...");
      		var textField = Ext.get('urlInput'+sourceNumber);
      		var firstWidth = t.getWidth();
      		textField.setWidth(firstWidth - 30);
      	},
      	resize: function(t, width, height, oldWidth, oldHeight, eOpts ) {
      		//console.log("Resizing...");
      		var textField = Ext.get('urlInput'+sourceNumber);
      		textFieldOldWidth = textField.getWidth();
      		textField.setWidth(textFieldOldWidth + (width - oldWidth));
      	}
      	*/
      }
   });
    
    var urlPanel1 = Ext.create('Ext.Panel', {
    	id: "urlPanel1-"+sourceNumber,
    	layout: 'fit',
    	//width: 240,
    	//height: 240,
    	border: true,
    	items: [
			//{html: "", flex: 1, border: false},
			urlForm,
			//{html: "", flex: 1, border: false}
		]
    });
    
    var urlPanel2 = Ext.create('Ext.Panel', {
    	id: "urlPanel2-"+sourceNumber,
    	layout: {
    		type: 'vbox',
    		align: 'stretch'
    	},
    	width: 240,
	   	height: 132,
    	border: false,
    	padding: "10px",
    	items: [
			//{html: "", flex: 1, border: false},
			urlPanel1,
			//{html: "", flex: 1, border: false}
		]
    });
    
	var or = Ext.create('Ext.Panel', {
		layout: {
			type: 'vbox',
			align: 'stretch',
			//pack: 'center'
		},
		width: 20,
		height: 20,
		border: false,
		items: [
			{html: "", border: false, height: 66},
			{html: "or", style: "text-align: center", border: false, width: 20, height: 20}
			]
	});


    var source_choice = Ext.create('Ext.Panel', {
    	id: "source_choice"+sourceNumber,
    	layout: {
    		type: 'hbox',
    		align: 'stretch'
    	},
    	border: false,
    	defaults: {
    		cls: 'round-corners'
    	},
    	flex: 2,
    	items: [
    		{html: "", flex: 1, border: false},
			dropdownPanel2,		
			or,
			urlPanel2,
			{html: "", flex: 1, border: false},
    	],
    });
        
    var removeButtonPanel = generateSourceRemoveButtonPanel(sourceNumber);
    //console.log("RemoveButtonPanel = ", removeButtonPanel);
    
    var source_info = Ext.create('Ext.Panel', {
		 title: "Source Successfully Loaded", 
		 id: "sourceInfo"+sourceNumber, 
		 defaults: {border: false},
		 layout: { 
		 	type: 'vbox',
		 	align: 'stretch'
		 },
		 items: [{html: "<div id='continue"+sourceNumber+"' class='continuePanel'></div>", flex:1}, removeButtonPanel],
		 flex:2    
    });
    
    /*
	var source_continue = Ext.create('Ext.Panel', { 
		id: 'source_continue'+sourceNumber,
		border: false,
		//title: "Source Information",
		height:240,
		layout: "hbox",
		items: [{html: "", border: false, flex:1},
				source_info,
				{html: "", border: false, flex:1}],
	});
	//console.log("sourceInfo: ", Ext.getCmp("sourceInfo"+sourceNumber));
	Ext.getCmp("source_continue"+sourceNumber).hide();
    */
    
    var source_banner = generateBannerPanel("Select Data Source "+sourceNumber, "Select a Tailor data source or provide a URL for this widget.");
    
    var source_selector_layout = Ext.create('Ext.Panel', {
		id: "source_selector_layout"+sourceNumber,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		defaults: {
			border: false,
		},
		border: true,
		items: [
				{html: "", flex: 1},
	//			{html: "<div class='progressPanel'><img class='centered' src='resources/images/step"+sourceNumber+"a.png'/></div>", height: 95},
				source_banner,
				source_choice, 
				//source_continue,
				{html: "", flex: 1},
				],
	});
	
	var source_selector = Ext.create('Ext.Panel', {
		id: "source_selector"+sourceNumber,
		layout: 'card',
		defaults: {
			border: false,
		},
		border: true,
		items: [
				source_selector_layout,
				],
	});
	return source_selector;
};

var executeRemoveButton = function(sourceNum){
	Ext.getCmp("source_choice"+sourceNum).show();
	disableButton("next", true);
	if (sourceNum == 1){
			var last_item = source_attribute1.items.items.pop();
			console.log("Destroying: ", last_item);
			last_item.destroy();
			disableButton("next", false);
	}
	if (sourceNum == 2){
			var last_item = source_attribute2.items.items.pop();
			console.log("Destroying: ", last_item);
			last_item.destroy();
			disableButton("next", false);
	}
	
	Ext.getCmp("source_continue"+sourceNum).hide();
}

/*
mapWidget = new widgetData("mapWidget", color_image_sources[0], grey_image_sources[0], [color_image_sources[3], color_image_sources[0]], [grey_image_sources[3], grey_image_sources[0]], ["org.owfgoss.owf.examples.GetDirections", "org.owfgoss.owf.examples.GoogleMaps"], 0);
tableWidget = new widgetData("tableWidget", color_image_sources[1], grey_image_sources[1], [color_image_sources[1]], [grey_image_sources[1]], ["org.owfgoss.owf.examples.NYSE"], 1);
treeWidget = new widgetData("treeWidget", color_image_sources[2], grey_image_sources[2], [color_image_sources[2]], [grey_image_sources[2]], ["org.owfgoss.owf.examples.NYSE"], 2);

var defaultArray = [mapWidget, tableWidget, treeWidget];
*/

console.log("Hello Earth");

var generateWidgetListComponent = function(sourceNum, widgetListFromRecs, recs){
	var newComponent; 
	console.log("WIDGETLISTFROMRECS: ", widgetListFromRecs);
	/*
	if (urlInput.value.slice(-3) == "kml") {
		newComponent = generatePanelWithSizeAndWidgets('w_choice'+sourceNum, 'hbox', 'middle', 555, 300, defaultArray, "tl-bl", "l-r", 0);
	}
	else {
		newComponent = generatePanelWithSizeAndWidgets('w_choice'+sourceNum, 'hbox', 'middle', 555, 300, defaultArray, "tl-bl", "l-r", -1);
	}
	*/
	var childWidgetArray = [];
	var childImageArray = [];
	var childGreyArray = [];
	var childDataArray = [];
	for (i in widgetListFromRecs){
		var currentChild = widgetListFromRecs[i].value;
		childWidgetArray.push(currentChild.universalName);
		//childImageArray.push(currentChild.largeIconUrl);
		childImageArray.push(graph_image);
		childGreyArray.push(graph_grey_image);
		childDataArray.push(recs[i]);
	}
	console.log("childDataArray looks like: ", childDataArray);
	//var firstChild = widgetListFromRecs[0].value;
	var newWidget = new widgetData("recWidget", graph_image, graph_grey_image, childImageArray, childGreyArray, childWidgetArray, 0, childDataArray);
	var finalArray = [newWidget].concat(defaultArray);	
	
	newComponent = generatePanelWithSizeAndWidgets(sourceNum, 'hbox', 'middle', 555, 200, finalArray, "tl-bl", "l-r", 0);
	
	var source_card = Ext.getCmp("source_selector"+sourceNum);
	console.log("source_selector = ", source_card)

	source_card.add(newComponent);
	source_card.getLayout().setActiveItem(1);	
	
}
	

//called when the Add button is clicked
var executeAddButton = function(sourceNum, sourceName){
	console.log("SourceName = ", sourceName);
	if(sourceName == "tailor"){
		var numberOfRecs = 0;
		var widgetListFromRecs = [];
		var comboboxInput = Ext.getCmp("combobox"+sourceNum);
		console.log("Fetched combobox: ", comboboxInput.getValue(), "(", comboboxInput.getRawValue(), ")");	
	
		console.log("MAKING REC REQUEST!");
		var recs;
		Ext.Ajax.request({
		   method: "GET",
		   //url: "https://a2c2srv.mitre.org:8443/tailorcore/recommendations.json?activityType=Monitoring&dataSource=World%20Population%20Data%20Feed",
		   url: "https://a2c2srv.mitre.org:8443/tailorcore/recommendations.json",
		   //url: "http://localhost:8443/Dashboard_Chooser/reccomendations.json",
		   params: {
				activityType: "Monitoring",
				dataSource: comboboxInput.getValue()
			},
		   success: function(response){
				console.log("Success! Response: ", response);
				recs = Ext.JSON.decode(response.responseText)["visRecommendations"];
			
		   },   
		   failure: function(response){
				console.log("FAILURE. Response: ", response);
				recs = responseObject["visRecommendations"];
		   },   
		   //jsonData: { foo: 'bar' }  // your json data
		   //params: { format: 'json' },
		   callback: function(original, successBool, response){	
				numberOfRecs = recs.length;
				for (i in recs){
					console.log("now working on: ", recs[i]);
					console.log("widget_name: ", recs[i]["widget_name"]);
					Ozone.pref.PrefServer.getWidget({
						universalName: recs[i]["widget_name"],
						onSuccess: function(widget) {
							widgetListFromRecs.push(widget);
							if (widgetListFromRecs.length == numberOfRecs){
								generateWidgetListComponent(sourceNum, widgetListFromRecs, recs);
							}
							//scope.guid = result.guid;
							//console.log("widget get! data: ", widget);
						},
						onFailure: function(err) { 
							console.log("failure: ", error); 
							numberOfRecs--;
						} 
				});
			}
		}});
	}
	else {
		var urlInput = Ext.getCmp("urlInput"+sourceNum);
		console.log("urlInput value: ", urlInput);
		console.log("value: ", urlInput.getValue());
		var newComponent;
		if (urlInput.getValue() == "https://a2c2srv.mitre.org:8443/datacreator/MapDataCombined.xml") {
			var finalArray = mapArray; //defaultArray.concat([mapWidget]);
			console.log("finalArray: ", finalArray);	

			newComponent = generatePanelWithSizeAndWidgets(sourceNum, 'hbox', 'middle', 555, 200, finalArray, "tl-bl", "l-r", 0);
		
		}
		else {
			var finalArray = defaultArray; //defaultArray.concat([mapWidget]);
			console.log("finalArray: ", finalArray);	

			newComponent = generatePanelWithSizeAndWidgets(sourceNum, 'hbox', 'middle', 555, 200, finalArray, "tl-bl", "l-r", 0);
		}
		
		var source_card = Ext.getCmp("source_selector"+sourceNum);
		console.log("source_selector = ", source_card)

		source_card.add(newComponent);
		source_card.getLayout().setActiveItem(1);	
	}	
	/*
	var urlInput = Ext.getCmp("urlInput"+sourceNum);
	console.log("Fetched urlinput: ", urlInput, urlInput.value);

	if (urlInput.value){
		console.log("MAKING REQUEST!");
		Ext.Ajax.request({
		   method: "GET",
		   //url: "https://a2c2srv.mitre.org:8443/tailorcore/recommendations.json?activityType=Monitoring&dataSource=World%20Population%20Data%20Feed",
		   url: "https://a2c2srv.mitre.org:8443/tailorcore/recommendations.json",
		   //url: "http://localhost:8443/Dashboard_Chooser/reccomendations.json",
		   params: {
		   		activityType: "Monitoring",
		   		dataSource: comboboxInput.getValue()
		   	},
		   success: function(response){
        		console.log("Success! Response: ", response);
		   },   
		   failure: function(response){
        		console.log("FAILURE. Response: ", response);
		   },   
		   //jsonData: { foo: 'bar' }  // your json data
		   //params: { format: 'json' },
		   callback: function(original, successBool, response){	
		   		console.log("made request: received: ", response);
		   }});
	}
	*/
 
	/*
	if (urlInput.value.slice(-3) == "kml") {
		newComponent = generatePanelWithSizeAndWidgets('w_choice'+sourceNum, 'hbox', 'middle', 555, 300, defaultArray, "tl-bl", "l-r", 0);
	}
	else {
		newComponent = generatePanelWithSizeAndWidgets('w_choice'+sourceNum, 'hbox', 'middle', 555, 300, defaultArray, "tl-bl", "l-r", -1);
	}
	*/
	
	/*
	newComponent = generatePanelWithSizeAndWidgets(sourceNum, 'hbox', 'middle', 555, 300, defaultArray, "tl-bl", "l-r", 0);
	
	var source_card = Ext.getCmp("source_selector"+sourceNum);
	console.log("source_selector = ", source_card)

	source_card.add(newComponent);
	source_card.getLayout().setActiveItem(1);
	*/
	/*
	if (urlInput.value){
		//console.log("Found URL, proceeding");
		var urlValue =  urlInput.value;
		
		if (sourceNum == 1){
			sourceURL1 = urlValue;
		}
		else {
			sourceURL2 = urlValue;
		}
		if (urlValue == "data"+sourceNum+".csv" || urlValue == "undefined") {
			urlInput = DOMAIN+"/DataEngine/csvSlurper?url="+DOMAIN+ROOT+"/data"+sourceNum+".csv";
		}
		else {
			if (urlValue.slice(-3) == "csv"){
				urlInput = DOMAIN+"/DataEngine/"+CSVSLURPER+"?url="+urlValue;
			}
			else{
				urlInput = DOMAIN+"/DataEngine/"+JSONSLURPER+"?url="+urlValue;
			}
		}
		Ext.Ajax.request({
		   method: "GET",
		   url: urlInput, 
		   //success: slurperPass,   
		   //failure: slurperFail,
		   //jsonData: { foo: 'bar' }  // your json data
		   params: { format: 'json' },
		   callback: function(original, successBool, response){
				//console.log("ResponseText: ", response.responseText);
				var jsonResponse = JSON.parse(response.responseText);
				//console.log(jsonResponse);
				
				var keys = Object.keys(jsonResponse.feed.records[0].ext);
				if (sourceNum == 1){
					global_keys1 = keys;
				}
				else {
					global_keys2 = keys;
				}
				//console.log("Data"+sourceNum+"'s keys: ", keys);
				Ext.define("Data"+sourceNum,{
					extend: 'Ext.data.Model',
					fields: keys,
				});
							
				//console.log("Data"+sourceNum+"'s data: ", jsonResponse);				
				var new_store = Ext.create('Ext.data.Store', {
					id: "data_store"+sourceNum+"",
					model: "Data"+sourceNum,
					autoLoad: true,
					data: jsonResponse.feed,
					proxy: {
						type: 'memory',
						reader: {
							type: 'json',
							root: 'records',
							record: 'ext',
						}
					}
				});
				
				new_store.load({
					callback: function(records, operation, success) {
					//console.log("Objects in store: ", new_store.getCount());
					if(success){
						//console.log("Source "+sourceNum+": Success!");
						//console.log("Records: ", records);
						//console.log("Name: ", jsonResponse.title); 
						var title = jsonResponse.title;
						if (title == null){
							title = "Source "+sourceNum;
						}
						var type = jsonResponse.description;
						if (type == null){
							type = "Undefined";
						}
						if (sourceNum == 1){
							global_store = new_store;
						}
						else {
							global_store2 = new_store;
						}
						//var msg = sourceTemplate.applyTemplate({name: title, type: type, url: urlValue, dataRecords: new_store.getCount(), dataFields: keys.length, num: sourceNum});

						sourceTemplate.overwrite("continue"+sourceNum, {name: title, type: type, url: urlValue, dataRecords: new_store.getCount(), dataFields: keys.length, num: sourceNum});
						//continueButton1.render('continueButton1');
						//Ext.getCmp("main_next").setDisabled(false);
						//Ext.getCmp("main_next").setSrc("resources/images/button_next.png");
						disableButton("next", false);
						//Ext.getCmp("urlButton"+sourceNum).setDisabled(true);
						Ext.getCmp("source_choice"+sourceNum).hide();
						//Ext.getCmp('add_button_panel'+sourceNum).hide();
						//Ext.getCmp('remove_button_panel'+sourceNum).show();
						
						//urlPanel = Ext.get('urlPanel'+sourceNum);
						//check.show();
						//check.alignTo(urlPanel, "c-c");
						Ext.getCmp("source_continue"+sourceNum).show();
						
						
					}	
					else{
						//console.log("Source "+sourceNum+": Failure.");
						failureTemplate.overwrite("continue"+sourceNum);
					}
				}});
				
			}
		});	
		
		//remove_button = Ext.getCmp("source_remove_button"+sourceNum);
		//console.log("Found remove_button: ",remove_button);
		//remove_button.visibility = "visible";	
		
		
		return;
	}
	else {
		//console.log("Didn't find URL, ignoring");	
	}
	*/
};

function generateBannerPanel(title, text){	
	var banner_panel = Ext.create('Ext.Panel', {
		layout: {
			type: 'vbox',
			align: 'stretch',
		},
		border: false,
		defaults: {border:false},
		height: 100,
		items: [
			{html:"<div class='banner'>"+title+"</div>", flex:1},
			{html:"<div class='text'>"+text+"</div>", height: 40},
			//title_panel,
			//text_panel,
			//preview_panel,
		],

	});
	return banner_panel;
}