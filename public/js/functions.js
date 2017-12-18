/**
 * http://usejsdoc.org/
 */
function showDonutChart(){
	
	var category = document.getElementById("category").value;
	var place = document.getElementById("place").value;
	
	$.get('/getDoughnutChartData/'+category+'/'+place,function (data){
		setTimeout(drawDonutChart, 100);
		
		function drawDonutChart(){
			var chart = AmCharts.makeChart( "chartdiv", {
				  "type": "pie",
				  "theme": "light",
				  "color" : "white",
				  "titles": [ {
				    "text": "Review Share Chart",
				    "size": 16
				  } ],
				  "dataProvider": data,
				  "valueField": "Reviews",
				  "titleField": "Name",
				  "startEffect": "elastic",
				  "startDuration": 2,
				  "labelRadius": 15,
				  "innerRadius": "50%",
				  "depth3D": 10,
				  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
				  "angle": 15,
				  "export": {
				    "enabled": true
				  }
				} );
		}
		
	});	
		
}

//makeCall(processResponse);

function makeCall(callback) {
    
	$.get('/getDoughnutChartData/Restaurants/Los Altos', function (data) {
		finalresponse = data;
        callback(finalresponse);
      });
}


function processResponse( response ) {
	var chart = AmCharts.makeChart( "chartdiv", {
		  "type": "pie",
		  "theme": "light",
		  "titles": [ {
		    "text": "Review Share",
		    "size": 16
		  } ],
		  "dataProvider": response,
		  "valueField": "Name",
		  "titleField": "Reviews",
		  "startEffect": "elastic",
		  "startDuration": 2,
		  "labelRadius": 15,
		  "color": "white",
		  "innerRadius": "50%",
		  "depth3D": 10,
		  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
		  "angle": 15,
		  "export": {
		    "enabled": true
		  }
		});
}