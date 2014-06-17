
		var oFeedList = new sap.m.List("oFeedItemList", {
		    mode: "SingleSelectMaster",
		    //showSeparators: "None",
		});
		
		
		var fnOpenPopup = function(oControlEvent) {
			oPopover.openBy(oControlEvent.getParameters().domRef);
		};
		
		
		var oFeedListItemTemplate = new sap.m.FeedListItem({
			type: sap.m.ListType.Active,
			//icon : "{icon}",
			//activeIcon : "{activeIcon}",
			text : "{text}",
			sender : "{sender}",
			//showIcon : "{showIcon}",
			//senderActive: "{senderActive}",
			iconActive: "{iconActive}",
			info: "{info}",
			timestamp : "{timestamp}",
			//senderPress : fnOpenPopup,
			//iconPress : fnOpenPopup,
		});
		
		function bindFeedListData(data, itemTemplate, list)
		{
			var oModel = new sap.ui.model.json.JSONModel();
			// set the data for the model
			oModel.setData(data);
			// set the model to the list
			list.setModel(oModel);

			// bind Aggregation
			list.bindAggregation("items", "/chunks", itemTemplate);
		}
		
		jQuery.sap.require("sap.ui.core.IconPool");
		var sURI = sap.ui.core.IconPool.getIconURI("personnel-view");
		
		var url = "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18";
		var urlFeed = url;
		
		var feedData = {
				chunks : []
			};
		
		$.jGFeed(urlFeed, function(feeds) {
			
			if (!feeds.entries.length) {
				// there was an error
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("No Data Found!");
			}		
			
			else {
				alert("Length:" +feeds.entries.length);
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
					feedArray.info = entry.author;
					feedArray.iconActive = entry.link;
					
					var fName = entry.author.substr(0, entry.author
							.indexOf(' '));
					var lName = entry.author
							.substr(entry.author.indexOf(' ') + 1);
					var fullName = fName.toLowerCase() + "."
							+ lName.toLowerCase();
                    
				feedData.chunks.push( feedArray
					);			
					
				}
			}
		}
		);
			
		bindFeedListData(feedData, oFeedListItemTemplate, oFeedList);
		
		var appFeedList = new sap.m.App("myApp", {initialPage:"feedListPage"});
		
		var feedListPage = new sap.m.Page("feedListPage", 
			{title: "Feed List Item Test Page"}
		);
		
		
		feedListPage.addContent(oFeedList);
		appFeedList.addPage(feedListPage);
		appFeedList.placeAt("content");
		
		

