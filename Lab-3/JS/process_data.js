
// pre-process the us-state.csv data to the desired format
var states = [];


function unique(array) {
  return array.filter(function(a){
    return !this[a] ? this[a] = true : false;
  }, {});
}


d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv", readcsv);

function readcsv(error, rawdata) {
 
    var dates = rawdata[0]['date'];

 	// group rawdata by state
	var rawdataByState = d3.nest()
  						.key(function(d) { return d['state']; })
  						.entries(rawdata);
	
	// get all state names
	rawdata.map(function(d) { states.push(d['state'])} );
  	states = unique(states).sort();

  	/* 
  		group the rawdata by state, then by month 
  	*/
  	var groupedData = []; //(state, month, cases)

  	for (var i = 0; i < states.length; i++) 
  	{
  		var prevCases = 0;
  		var state = rawdataByState[i]['key'];
  		var dataByDate = rawdataByState[i]['values'];

	  	// sum up the cases number by month for a state
	  	var dataByMonth = d3.nest()
		  .key(function(d) { return d['date'].split('-').slice(0, 2).join('-'); })
		  .sortKeys(d3.ascending)
		  .rollup(function(leaves) {
		      return {
		        cases: d3.sum(leaves, function(d) { 
		        	var tempCases = prevCases;
		        	prevCases = d['cases']; 
		        	return d['cases'] - tempCases; 
		        })
		      };
		   })
		  .entries(dataByDate);


		dataByMonth.map(function(rowdata) {
			var data = {'state' : state, 'month' : rowdata['key'], 
						'cases' : rowdata['value']['cases']};
			groupedData.push(data);
		});
  	}

  	/* 
  		group the rawdata by state, then by month 
  	*/
  	var data_total = []; //(state, total_cases)

	var latest_date = rawdata.slice(-1)[0]['date']; // change to 10/20/2020! here is update-to-date

	var latest_data = [];
	
	rawdata.map(function(d) {
		if (d['date'] == latest_date) {
			latest_data.push(d);
			var data = {'state':d['state'], 'total_cases':Number(d['cases'])};
			data_total.push(data);
		}
	})

 	
 	// console.log(groupedData);
	// console.log(data_total);
	// console.log(states);
	

	// Format:
	// groupedData: (state, month, cases)
	// data_total: (state, total_cases)


	/*
		Pass the processed data to update svgs
	*/
	drawTable(data_total, groupedData);
	
	drawMapCircle(data_total, groupedData);

	draw_bubbleChart(data_total);



}
























