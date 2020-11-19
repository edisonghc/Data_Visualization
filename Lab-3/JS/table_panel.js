
var table_svg;

/*
	Table of states
*/
function drawTable(casesByState, casesByMonth) {

	table_svg = tabulate(["state", "total_cases"], casesByState);

	function tabulate(columnNames, data) {

		table_svg = d3.select('#table_svg')
					.append('table')
					.attr("width", 150)
	    			.attr("height", 250);

		var thead = table_svg.append('thead');
		var	tbody = table_svg.append('tbody');

		// append the header row
		thead.append('tr')
		  	.selectAll('th')
		  	.data(columnNames).enter()
		  	.append('th')
		  	.text(function (d) { return d; });


		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data).enter()
		  .append('tr')
		  .attr("id", function (d) { return d['state']; })
		  .on("mouseover", selectOnState)
		  .on("mouseout", handleMouseOut);

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
		    return columnNames.map(function (columnName) {
		      return {
		      	key: columnName, 
		      	value: row[columnName]
		      };
		    });
		  }).enter()
		  .append('td')
		  .text(function (d) { return d['value']; });


	  	return table_svg;
	}


		function getMonCasesByState(state) {
			var monthlyData = [];
			for (const row of casesByMonth) {
				if (row['state'] == state) {
					monthlyData.push(row);
				}
			}
			return monthlyData;
		}


		function selectOnState() { 
			onState = this['id'];
			// change the circle color 
			d3.select('[id="'+onState+'"]')
			  .style("fill", "orange");
			// update the bar chart:
			d3.select('#bar_svg').select("svg").remove();
			update_barChart(getMonCasesByState(onState));
			// update the pie chart:
			d3.select('#pie_svg').select("svg").remove();
			update_pieChart(getMonCasesByState(onState));
		}


		function handleMouseOut() {
			d3.select('[id="'+(this['id'])+'"]')
			  .style("fill", "steelblue");
		}


 
}




