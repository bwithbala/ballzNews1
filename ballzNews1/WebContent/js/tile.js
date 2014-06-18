var selectedNews = "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18";

var feedData = {
		chunks : []
	};

function fillFeedListData(url) {

	var urlFeed = url;

	$.jGFeed(urlFeed, function(feeds) {

		if (!feeds.entries.length) {
			// there was an error
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show("No Data Found!");
		}
		else {
			for ( var i = 0; i < feeds.entries.length; i++) {
				var entry = feeds.entries[i];

				var feedArray = {};

				var date = new Date(entry.publishedDate);

				var months = Array("January", "February", "March", "April",
						"May", "June", "July", "August", "September",
						"October", "November", "December");
				var string = date.getDate() + " " + months[date.getMonth()]
						+ " " + date.getFullYear();

				feedArray.timestamp = string;
				feedArray.sender = entry.title;
				feedArray.text = entry.contentSnippet;
				feedArray.info = entry.link;
			//	feedArray.iconActive = entry.link;
				feedArray.showIcon = false;
			//	feedArray.Press = fnOpenPopup;

				var fName = entry.author.substr(0, entry.author.indexOf(' '));
				var lName = entry.author.substr(entry.author.indexOf(' ') + 1);
				var fullName = fName.toLowerCase() + "." + lName.toLowerCase();
				feedData.chunks.push(feedArray);
			}
			
			var oModel = new sap.ui.model.json.JSONModel();
			// set the data for the model
			oModel.setData(feedData);
			// set the model to the list
			oFeedList.setModel(oModel);
			// bind Aggregation
			oFeedList.bindAggregation("items", "/chunks", oFeedListItemTemplate);			
		}
		
	},
      
	
	30);
}

var oFeedList = new sap.m.List("oFeedItemList", {
	mode : "SingleSelectMaster",
	BackgroundDesign: sap.m.BackgroundDesign.Translucent,
	
//showSeparators: "None",
});

var fnOpenPopup = function(oControlEvent) {
	//oPopover.openBy(oControlEvent.getParameters().domRef);
	var info = +oControlEvent.getParameters().getInfo() ;
	alert("DomRef:" +oControlEvent.getParameters().getInfo());
	var str = "'";
	var link = str.concat(oEvent.oSource.getinfo()); 
	sap.m.URLHelper.redirect(link);
};

/*function handlePress(oEvent) {
	var str = "'";
	var link = str.concat(oEvent.oSource.getinfo()); 
	alert("Inside Handle Press" + link);
	
	sap.m.URLHelper.redirect(link);
	}*/

var oFeedListItemTemplate = new sap.m.FeedListItem({
	type : sap.m.ListType.Active,
	//icon : "{icon}",
	//activeIcon : "{activeIcon}",
	text : "{text}",
	sender : "{sender}",
	showIcon : "{showIcon}",
	//senderActive: "{senderActive}",
	//iconActive : "{iconActive}",
	info : "{info}",
	timestamp : "{timestamp}",
senderPress : fnOpenPopup,
//iconPress : fnOpenPopup,
//press : handlePress
//	detailPress:fnOpenPopup
});

jQuery.sap.require("sap.ui.core.IconPool");
var sURI = sap.ui.core.IconPool.getIconURI("personnel-view");

fillFeedListData(selectedNews) ;

//	create JSON model instance
var oModel = new sap.ui.model.json.JSONModel();

// JSON sample data
var mData = {

	// path : items
	"items" : [
		{
			"value": "0",
			"text": "Maalai Malar"
		},

		{
			"value": "1",
			"text": "Daily Thanthi"
		},

		{
			"value": "2",
			"text": "Dina Karan"
		},

		{
			"value": "3",
			"text": "Dina Mani"
		}
	],
	"selected": "5"
};

// set the data for the model
oModel.setData(mData);

// set the model to the core
sap.ui.getCore().setModel(oModel);

var oItemTemplate = new sap.ui.core.Item({
	key: "{value}",
	text: "{text}"
});

// select
var oSelect0 = new sap.m.Select({
	items: {
		path: "/items", template: oItemTemplate
	},
	selectedKey: {
		path : "/selected",
		template: "{selected}"
	},
	change: function(oControlEvent) {
		//alert("Selected Item:" +oControlEvent.getParameter("selectedItem").getKey());
        
		var selectedKey = oControlEvent.getParameter("selectedItem").getKey();
		
		if (selectedKey == 0) {
			
			selectedMainPaper = "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18";
			
		}
		
		if (selectedKey == 1) {
			selectedMainPaper = "http://www.dailythanthi.com/RSS/SectionRssFeed.aspx?Main=2&Id=6";
		}
		
		
		if (selectedKey == 2) {
			selectedMainPaper = "http://www.dinakaran.com/rss_Latest.asp";
		}
		
		if (selectedKey == 3) {
			selectedMainPaper = "http://demo.dinamani.com/edition/rssSectionXml.aspx?SectionId=129";
		}
		
		fillFeedListData(selectedMainPaper);
	}
});	
	


//Create a ColorPicker Control without parameters
var oColorPicker1 = new sap.ui.commons.ColorPicker();

//Attach eventhandler for change event
oColorPicker1.attachChange(handleColorPickerChange);

function handleColorPickerChange(oEvent) {
	var colors = oEvent.getParameters();
	//Change the background color of the HTML control according the chosen color
	//The parameter 'colors' delivers the folowing values:
	//colors.r = value of RED (0-255)
	//colors.g = value of GREEN (0-255)
	//colors.b = value of BLUE (0-255)
	//colors.h = value of HUE (0-360)
	//colors.s = value of SATURATION (0-100)
	//colors.v = value of VALUE (0-100)
	//colors.hex = hex-value
	//colors.old = hex-value of the old color value
	//jQuery.sap.byId('NewCol').css('background-color',colors.hex);
	
	
	appFeedList.setBackgroundColor(colors.hex);
	appFeedList.setBackgroundOpacity(0.6);
	sap.ui.getCore().byId("opacitySlider")
			.setValue(0.6);
	appFeedList.setBackgroundRepeat(true);
	appFeedList.ui.getCore().byId("repeatSelect")
			.setSelectedKey("repeat");
	
};
		


	var oPopover = new sap.m.Popover(
			{
				placement : sap.m.PlacementType.Bottom,
				title : "Settings",
				showHeader : true,
				//		beginButton: oBeginButton,
				//	endButton: oEndButton,
				beforeOpen : function(oEvent) {
					jQuery.sap.log.info("before popover opens!!!");
				},
				afterOpen : function(oEvent) {
					jQuery.sap.log.info("popover is opened finally!!!");
				},
				beforeClose : function(oEvent) {
					jQuery.sap.log.info("before popover closes!!!");
				},
				afterClose : function(oEvent) {
					jQuery.sap.log.info("popover is closed properly!!!");
				},
				//	footer: footer,
				content : [
						oColorPicker1,
						// background image switches
						new sap.m.Button(
								{
									text : "Stretched Cheetah",
									press : function() {
										appFeedList
												.setBackgroundImage("images/huntingLeopard.jpg");
										appFeedList.setBackgroundColor("");
										appFeedList.setBackgroundOpacity(1);
										appFeedList.ui.getCore().byId("opacitySlider")
												.setValue(1);
										appFeedList.setBackgroundRepeat(false);
										sap.ui.getCore().byId("repeatSelect")
												.setSelectedKey("stretch");
									}
								}),

						new sap.m.Button(
								{
									text : "Repeating translucent Cheetah",
									press : function() {
										appFeedList
												.setBackgroundImage("images/huntingLeopard.jpg");
										appFeedList.setBackgroundColor("#67E02B");
										appFeedList.setBackgroundOpacity(0.6);
										sap.ui.getCore().byId("opacitySlider")
												.setValue(0.6);
										appFeedList.setBackgroundRepeat(true);
										sap.ui.getCore().byId("repeatSelect")
												.setSelectedKey("repeat");
									}
								}),

						new sap.m.Button({
							text : "Clear Background",
							press : function() {
								appFeedList.setBackgroundImage("");
								appFeedList.setBackgroundColor("");
								appFeedList.setBackgroundOpacity(1);
								sap.ui.getCore().byId("opacitySlider").setValue(1);
								appFeedList.setBackgroundRepeat(false);
								sap.ui.getCore().byId("repeatSelect")
										.setSelectedKey("stretch");
							}
						}),

						new sap.m.Select("repeatSelect",
								{
									items : [ new sap.ui.core.Item({
										text : "Stretch background",
										key : "stretch"
									}), new sap.ui.core.Item({
										text : "Repeat background",
										key : "tile"
									}) ],
									change : function(oEvent) {
										var selectedItem = oEvent
												.getParameter("selectedItem");
										appFeedList.setBackgroundRepeat(selectedItem
												.getKey() === "stretch" ? false
												: true);
									}
								}),

						new sap.m.Slider("opacitySlider", {
							width : "50%",
							min : 0,
							max : 1,
							step : 0.01,
							liveChange : function(oEvent) {
								var value = oEvent.getParameter("value");
								appFeedList.setBackgroundOpacity(value);
							}
						}),

				],
				initialFocus : "focusInput"
			});	     	


var d = sap.ui.Device;
var Bar = new sap.m.Bar({
	contentLeft : [ new sap.m.Button('SlideRight', {
		icon : sap.ui.core.IconPool.getIconURI("menu2"),
		press : function() {
			//app.to("page2", "slide");
		}
	}) ],
	
	contentMiddle : [ 
	                  oSelect0
	],
    contentRight: [
		new sap.m.Button('settings', {
			icon : sap.ui.core.IconPool.getIconURI("settings"),
			press : function() {
		
				oPopover.setPlacement(sap.m.PlacementType.Left);
				oPopover.openBy(this);
			}
		})
]
});

var appFeedList = new sap.m.App("myApp", {
	initialPage : "feedListPage",
	//BackgroundColor: "green",
});

var feedListPage = new sap.m.Page("feedListPage", {
	title : "Ballz News",
	BackgroundDesign: sap.m.BackgroundDesign.Translucent
});

feedListPage.setCustomHeader(Bar); 
//feedListPage.addContent(busyCSSSize2);
feedListPage.addContent(oFeedList);



appFeedList.addPage(feedListPage);
appFeedList.placeAt("content");
