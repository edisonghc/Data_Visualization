
var width_map = 750;
var height_map = 750;
var map_svg, paths;
var onState = 'Alabama';


function drawMapCircle(casesByState, casesByMonth) {

	/* 
		draw bar chart & pie chart & bubble
		with a default state 
	*/
	update_barChart(getMonCasesByState(onState));
	update_pieChart(getMonCasesByState(onState));
	// update_bubbleChart(casesByState);


	d3.json("./data/usa_mainland.json", drawUSA);

	function drawUSA(error, states) {

		/* 
			draw the US map
		*/
		var projection = d3.geoEquirectangular()
						   .fitExtent([[0,0], [width_map, height_map]], states);
		
		var geoGenerator = d3.geoPath()
							 .projection(projection);

		map_svg = d3.select("#map_svg")
					.append('svg')
					.attr("width", width_map)
	        		.attr("height", height_map)

		paths = map_svg.selectAll('path')
						   .data(states.features).enter()
						   .append('path')
						   .attr('d', geoGenerator)
						   .style('fill', '#ddd')
						   .style('stroke', '#aaa');

		var texts = map_svg.selectAll('text')
			.data(states.features).enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('alignment-baseline', 'middle')
			.attr('opacity', 0.5)
			.text(function(d) { return d.properties.STUSPS10; })
			.attr('transform', function(d) {
				var center = geoGenerator.centroid(d); // center of state area
				return 'translate (' + center + ')';
			});


		function get_radius(state) {
			var num = 0;
			for (const row of casesByState) {
				if (row['state'] == state) {
					num = row['total_cases']; 
				}
			}
			return num/14000;
		}


		/*
			draw circle on US map 
			(at each center of the state area)
		*/
		map_svg.selectAll('circle')
			   .data(states.features).enter()
			   .append('circle')
			   .attr('cx', function(d) {
			   	// console.log(casesByState);
			   		var center = geoGenerator.centroid(d); 
			   		return center[0];
			   })
			   .attr('cy', function(d) {
			   		var center = geoGenerator.centroid(d); 
			   		return center[1];
			   })
			   .attr("id", function(d) {
			   		var state = d.properties.STUSPS10;
			   		state = abbrState(state, 'name');
			   		return state;
			   })
			   .attr('r', function(d) {
			   		var state = d.properties.STUSPS10;
			   		state = abbrState(state, 'name');
			   		// console.log(state);
			   		return get_radius(state);
			   })
			   .attr('fill', 'steelblue')
			   .attr('opacity', 0.55)
			   .on("mouseover", selectOnState)
			   .on("mouseout", handleMouseOut);

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
		d3.select('[id="'+onState+'"]')
		.style("fill", "orange");
		// update the bar chart:
		d3.select('#bar_svg').select("svg").remove();
		update_barChart(getMonCasesByState(onState));
		// update the pie chart:
		d3.select('#pie_svg').select("svg").remove();
		update_pieChart(getMonCasesByState(onState));
		// // update the circle packing:
		// d3.select('#bubble_svg').select("svg").remove();
		// update_bubbleChart(casesByState);		
	}


	function handleMouseOut() {
		d3.select('[id="'+(this['id'])+'"]')
		  .style("fill", "steelblue");
	}


 	
	


}









