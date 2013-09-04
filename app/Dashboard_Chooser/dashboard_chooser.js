function getObjectClass(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return undefined;
}

//color_image_sources = ["resources/images/map.png","resources/images/table.png","resources/images/tree.png"];
//grey_image_sources = ["resources/images/map_grey.png","resources/images/table_grey.png","resources/images/tree_grey.png"];

var basicSuccess = function(dashboard) {
	console.log("got dashboard: ", dashboard.guid, dashboard.layoutConfig);
};

var basicFailure = function(error) {
	console.log("failure: ", error);
};

//console.log("configDict: ", configDict);

Ext.define('changingIcon', {
    extend: 'Ext.Img',
    testFunc: function () {
       console.log("Success!");
    },
    unselect: function () {
    	//console.log("Unselecting...", this.children); 
    	this.displaying_children = false;
    	this.setSrc(this.greySrc);
    	for(i in this.children){
			//child = Ext.getCmp(this.id+"-"+i);
			child = this.children[i];
			child.hide();
			child.unselect();
		}
    }
});

function arrayMinusIndex(array, i){
	if (i == array.length - 1) {
		return array.slice(0, i) //skip "after", because you can't do array.slice(-0)
	}
	before = array.slice(0,i);
	//for some reason, I can't just use the positive index (i+1) here
	//it returns an empty array if i is not 0 or the max index. (!?)
	after = array.slice(i - array.length + 1); 
	return before.concat(after);

	//return array.slice(0, i).concat(array.slice(i+1)); //this only worked for the first/last i
}

function putItemInPanel(item){
	return Ext.create('changingChild', {
		layout: "fit",
		items: [item]
	});
}

var selectedSources = 0;
var numberOfSources = 99;

function executeSubmitFunction(index){
	console.log("EXECUTING! ", index);
	
	var chosenWidgetNameArray = [];
	var chosenWidgetDataArray = [];
	for(var i=1; i<selectedSources+1; i++){
		console.log("Operating on: ", window["widgetSelected"+i]);
		chosenWidgetNameArray[i-1] = window["widgetSelected"+i]["name"];
		chosenWidgetDataArray[i-1] = window["widgetSelected"+i]["data"];
	}
	console.log("chosenWidgetNameArray: ", chosenWidgetNameArray);
	
	var chosenWidgetArray = [];
	for(var i=0; i<selectedSources; i++){
		Ozone.pref.PrefServer.getWidget({
			universalName: chosenWidgetNameArray[i],
				onSuccess: function(widget) {
					console.log("widget get! data: ", widget);
					chosenWidgetArray.push(widget);
					if(chosenWidgetArray.length == numberOfSources){
						continueExection(index, chosenWidgetArray, chosenWidgetDataArray);
					}
				},
				onFailure: function(err) { console.log("failure: ", error); } ,
				async: false,
		});
	}
};

function continueExection(index, chosenWidgetArray, chosenWidgetDataArray){

	console.log("chosenWidgetArray: ", chosenWidgetArray);
	console.log("first name: ", chosenWidgetArray[0].value.universalName);
	console.log("first GUID: ", chosenWidgetArray[0].path);
	
	var chosenLayoutArray = indexDict[index];
	var chosenLayout = chosenLayoutArray[0];
	for(var i=1; i<selectedSources+1; i++){
		chosenLayout += '"universalName":"';
		chosenLayout += chosenWidgetArray[i-1].value.universalName; //'org.owfgoss.owf.examples.NYSE';
		chosenLayout += '","widgetGuid":"'; 
		chosenLayout += chosenWidgetArray[i-1].path; //'fe137961-039d-e7a5-7050-d6eed7ac4782';
		chosenLayout += '",';
		chosenLayout += chosenLayoutArray[i];
	}
	//console.log("chosenLayout set to: ", chosenLayout);			
				
	//TAKE 3
	var createSuccess = function(dashboard) {
		console.log("CREATE SUCCESS: ", dashboard);
		console.log("guid: ", dashboard.guid);
		//console.log("layoutConfig: ", dashboard.layoutConfig);
		console.log("RELOADING!");
		var newLocation = window.parent.location.origin + "/owf/#guid=" + dashboard.guid;
		console.log("newLocation = ", newLocation);
		
		console.log("chosenWidgetArray: ", chosenWidgetArray);
		for (var i=0; i<chosenWidgetArray.length; i++){
			if (chosenWidgetDataArray[i]){
				console.log("Sending message: ", 'data'+i);
				var dataName = chosenWidgetArray[i].value.universalName;
				console.log("Name set to: ", dataName);
				var dataSet = chosenWidgetDataArray[i];
				console.log("Data set to: ", dataSet);		
				//console.log("About to invoke launcher, with guid: ", chosenWidgetArray[i].path);
		
				if(dataSet["mapURI"]) {
					console.log("Using mapURI: ", dataSet["mapURI"]);
					OWF.Eventing.publish("map.overlay.create",  {
			        	"overlayId": "123", 
			        	"name": "Data"
			    	} );
			    	
			    	Ext.Ajax.request({
						method: 'GET',
						url: dataSet["mapURI"],
						//dataType: "xml",
						success: function(data) {
							//drawKML(data.responseText);
							console.log("Attempting to set map data: ", data);
							OWF.Eventing.publish("map.feature.plot", {
								"overlayId": "123", 
								"name": "Hostile Data", 
								"featureId": "feature_0", 
								"feature": data.responseText, 
								"zoom": true
							});
						}
			    });
			    	
				}
		
				else {
					var setPrefSuccess = function(successObject) {
						console.log("Success in setting: ", successObject);
					}

					var setPrefFailure = function(error) {
						console.log("Error in setting: ", error);
					}

					console.log("Setting preference: ", dataName, dataSet);
					Ozone.pref.PrefServer.setUserPreference(
						{	
							namespace:dataName,
							 name:'SeamlessData',
							 value: Ext.JSON.encode([dataName, dataSet]),
							 onSuccess:setPrefSuccess, 
							 onFailure:setPrefFailure
						}
					);
				}
		
				//OWF.Eventing.publish(dataName, dataSet);
		
				/*
				OWF.Launcher.launch({
					guid: chosenWidgetArray[i].path,
					launchOnlyIfClosed: false,
					title: 'Data Source',
					//data: '[{"widget_name":"MITRE.CIV","dataURI":"http://a2c2srv.mitre.org:8080/cra/impl/WorldPopDataFeedAdaptor/CraInstanceServlet?requestType=getLatestDataItem","visualizationProperties":{"visualizationId":"d3.scatterPlot","visualizationMappings":[{"elementName":"Label","fieldName":"name"},{"elementName":"Mark X Position","fieldName":"population"},{"elementName":"Mark Y Position","fieldName":"lifeExpectancy"}]',
					data: dataSet
				});
				*/
			}
			else {
				console.log("No data for message ", i, ", skipping.");
			}
		}
		
		window.parent.location = newLocation ;
		window.parent.location.reload(true);
		
	};

	var createFailure = function(error) {
		console.log("CREATE FAILURE: ", error);
	};
	
	var generatedGUID = OWF.Util.guid();
	var chosenDashboard = {
			//isGroupDashboard: false,
			//layout: 'desktop',
			isdefault: false,
			name: 'SeamlessC2 Dashboard',
			//columnCount: 0,
			//defaultSettings: {},
			//groups: [],
			description: 'Automatically generated dashboard',
			guid: generatedGUID,
			//state: [],
			//showLaunchMenu: false,
			layoutConfig: chosenLayout
	};
	
	
	OWF.Preferences.createOrUpdateDashboard({
		json: chosenDashboard,
		saveAsNew: true,
		onSuccess: createSuccess,
		onFailure: createFailure,
		async: true
	});
	
}
	

//function generateChangingIcon(id, x, y, colorImg, greyImg, color_child_image_sources, grey_child_image_sources){
function generateChangingIcon(widget){
	//id = widget.id;
	//colorImg = widget.colorImg;
	//greyImg = widget.greyImg;
	//color_child_images = widget.color_child_images;
	//grey_child_images = widget.grey_child_images;
	var returnImg = Ext.create('changingIcon', {

    	id: widget.id,
    	//x: 0,
    	//y: 0,
    	
    	//flex: 10,
    	
    	width: 128,
    	height: 128,
    	
    	src: widget.greyImg,
    	greySrc: widget.greyImg,
    	colorSrc: widget.colorImg,
    	
    	color_child_images: widget.color_child_images,
    	grey_child_images: widget.grey_child_images,
    	displaying_children: false,
    	
    	layoutConfig: widget.layoutConfig,
    	
    	index: widget.index,
    	
    	children: [],
    	
		border: true, 
		shadow: false,	

		listeners: {
			'afterrender': function(){
				//if invalid id, complain / strip out
				//this.doLayout();

				this.children = [];
			},
			
			'added': function(){
				//console.log("added has fired");
			},
			
			el: {
				click: function(eventObject, element) {
					var parent = Ext.getCmp(widget.id); //this seems silly, but it works so whatever
					
					for (i in parent.siblings){
						parent.siblings[i].unselect();	
					} 
					parent.setSrc(parent.colorSrc); 
					
					layout = setLayout(widget.index);
					
					confirm_button = {html: '<center><input id="confirm_button_html" type="submit" value="Create Dashboard" onclick="executeSubmitFunction('+widget.index+')" disabled="disabled"></center>', height: 20}
					button_panel = Ext.create('Ext.Panel', {
												layout: {
													type: 'vbox',
													align: 'stretch'
												},
												height: 60,
												border: false,
												defaults: {
													border: false
												},
												items: [
													{html: "", flex: 1},
													confirm_button,
													{html: "", flex: 1},
												]
											});
					confirm_layout = Ext.create('Ext.Panel', {
												layout: {
													type: 'vbox',
													align: 'stretch'
												},
												items: [
													layout,
													button_panel
												]
											});
					Ext.getCmp("dashboard_chooser").add(confirm_layout);
					Ext.getCmp("dashboard_chooser").getLayout().setActiveItem(1);
					//Ext.getCmp("dashboard_chooser").getLayout().setActiveItem(widget.index+1);
					
					
					//console.log("this: ", this);
					//console.log("this.view: ", this.view);
					//console.log("this.dashboardContainer: ", this.dashboardContainer);
					
					//this.dashboardContainer.activateDashboard(guid, false, stackContext);
					
					//console.log("Window.location: ", window.location) //nope
					//console.log("document.URL: ", document.URL) //nope
					//console.log("test: ", (window.location != window.parent.location) ? document.referrer: document.location); //fancy, but nope
					/*
					console.log("window.parent.location.hash: ", window.parent.location.hash); //bingo! (use href if hash doesn't work)
					var chooser_guid = window.parent.location.hash.slice(6);
					var hardcode_guid = '1ca5f6fc-0f5f-4a07-bda6-d1897a7c1302';
										
					console.log("guid: ", chooser_guid);
					
					console.log("hardcoded guid is equal? ", chooser_guid == hardcode_guid);
					console.log("hardcoded guid is identical? ", chooser_guid === hardcode_guid);
										
					console.log("class of chooser: ", getObjectClass(chooser_guid));
					console.log("class of hardcode: ", getObjectClass(hardcode_guid));
										
					var OWF_enabled = OWF.Util.isRunningInOWF();
					console.log("Running in OWF: ", OWF_enabled);
					
					var generatedGUID = OWF.Util.guid();
					console.log("generated GUID: ", generatedGUID);
															
					//var dbs = OWF.Preferences.findDashboards(cfg);
					//console.log("dbs: ", dbs);
										
					//console.log("Using layoutConfig: ", parent.layoutConfig);
									
					//TAKE 3
					var createSuccess = function(dashboard) {
						console.log("CREATE SUCCESS: ", dashboard);
						console.log("guid: ", dashboard.guid);
						//console.log("layoutConfig: ", dashboard.layoutConfig);
						console.log("RELOADING!");
						console.log(window.parent.location);
						var newLocation = window.parent.location.origin + "/owf/#guid=" + dashboard.guid;
						console.log(newLocation);
						window.parent.location = newLocation ;
						window.parent.location.reload(true);
						//window.parent.navigate(newLocation);
						//window.parent.location.reload(true);
					};

					var createFailure = function(error) {
						console.log("CREATE FAILURE: ", dashboard);
					};
					
					var chosenDashboard = {
							//isGroupDashboard: false,
							//layout: 'desktop',
							isdefault: false,
							name: 'SeamlessC2 Dashboard',
							//columnCount: 0,
							//defaultSettings: {},
							//groups: [],
							description: 'Automatically generated dashboard',
							guid: generatedGUID,
							//state: [],
							//showLaunchMenu: false,
							layoutConfig: parent.layoutConfig
					};
					
					OWF.Preferences.createOrUpdateDashboard({
						json: chosenDashboard,
						saveAsNew: true,
						onSuccess: createSuccess,
						onFailure: createFailure,
						async: true
					});
					*/
	
				},
				mouseenter: function(eventObject, element){
					var parent = Ext.getCmp(widget.id); 
					if(!parent.displaying_children){
						parent.setSrc(parent.colorSrc); 
					}
					/*
					OWF.Preferences.getDashboard({
						dashboardId: '55330aec-fcbc-d10e-458c-04a8aac3df1e',
						onSuccess:basicSuccess,
						onFailure:basicFailure,
						async: false
					});
					*/
				},
				mouseleave: function(eventObject, element){
					var parent = Ext.getCmp(widget.id); 
					if(!parent.displaying_children){
						parent.setSrc(parent.greySrc); 
					}
				},
			}
		}
    });
    //returnImg.testFunction = function () { console.log("Success!") };
    return returnImg;
};

function layoutData(id, colorImg, greyImg, color_child_images, grey_child_images, index){
	this.id = id;
	this.colorImg = colorImg;
	this.greyImg = greyImg;
	this.color_child_images = color_child_images;
	this.grey_child_images = grey_child_images;
	this.index = index;
}

function gridSource(i){
	return "resources/images/Grid"+i.toString()+".png";
}

function greyGridSource(i){
	return "resources/images/Grid"+i.toString()+"_grey.png";
}


grid_array = [];
for(var i = 0; i<8; i++){
	var new_widget = new layoutData("grid"+(i+1).toString(), gridSource(i+1), greyGridSource(i+1), [], [], i);
	grid_array.push(new_widget);
}

grid_array[0].layoutConfig = configDict["basic"];
grid_array[1].layoutConfig = configDict["vertical"];
grid_array[2].layoutConfig = configDict["horizontal"];
grid_array[3].layoutConfig = configDict["right"];
grid_array[4].layoutConfig = configDict["left"];
grid_array[5].layoutConfig = configDict["down"];
grid_array[6].layoutConfig = configDict["up"];
grid_array[7].layoutConfig = configDict["four"];

icon_array = []
for(var i = 0; i<8; i++){
	//console.log("Using ", grid_array[i]);
	var new_icon = generateChangingIcon(grid_array[i]);
	icon_array.push(new_icon);
}

//console.log("icon_array", icon_array);

setSiblings(icon_array);

panel1 = Ext.create('Ext.Panel', {
		layout: {
			type: 'hbox',
			align: 'stretch',
			//defaultMargins: '0, 10'
		},
		border: false,
		defaults: {border: false},
		width: 128*4,
		height: 128,
		items: [icon_array[0], icon_array[1], icon_array[2], icon_array[3]]
});
	

panel2 = Ext.create('Ext.Panel', {
		layout: {
			type: 'hbox',
			align: 'stretch',
			//defaultMargins: '0, 10'
		},
		border: false,
		defaults: {border: false},
		width: 128*4,
		height: 128,
		items: [icon_array[4], icon_array[5], icon_array[6], icon_array[7]]
});	

dashboard_chooser_panel = Ext.create('Ext.Panel', {
		layout: {
			type: 'vbox',
			align: 'center',
			//defaultMargins: '0, 10'
		},
		border: false,
		defaults: {border: false},
		width: 128*4,
		height: 128*2,
		items: [panel1, panel2]
});	

function setSiblings(iconArray){
	//console.log("array is: ", iconArray);
	for (i in iconArray){
		//console.log("Currently working on item ", i);
		iconArray[i].siblings = arrayMinusIndex(iconArray, i);
		//console.log("Siblings set to: ", iconArray[i].siblings);
	}
}

console.log("dashboard_chooser.js loaded");