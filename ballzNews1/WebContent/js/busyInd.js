    var mobile = false;
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    	
 	        var busyDialog2 = (busyDialog2) ? busyDialog2 : 
	        	new sap.m.BusyDialog('busy2',{text:'Fetching News for You!!!', title: 'Fetching News....'});
	
	        setTimeout(function(){
	        	busyCSSSize2.$().css('visibility', 'visible');
	        },1000);
	
	        var busyCSSSize2 = new sap.m.BusyIndicator({
	        	size:'40px',
	        });
	
	        busyDialog2.open();
	        setTimeout(function() {
	        	busyDialog2.close();
	        },3000);        	
   
        document.addEventListener("deviceready", function(){mobile = true; onDeviceReady();}, false);
     //   document.addEventListener("deviceready", onDeviceReady, false);
    } else {
      //  $(document).ready(onDeviceReady);   
    }
    function onDeviceReady() {
     
        var busyDialog2 = (busyDialog2) ? busyDialog2 : 
        	new sap.m.BusyDialog('busy2',{text:'Fetching News for You!!!', title: 'Fetching News....'});

        setTimeout(function(){
        	busyCSSSize2.$().css('visibility', 'visible');
        },1000);

        var busyCSSSize2 = new sap.m.BusyIndicator({
        	size:'40px',
        });

        busyDialog2.open();
        setTimeout(function() {
        	busyDialog2.close();
        },3000);        

    };