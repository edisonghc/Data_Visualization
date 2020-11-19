
var pie_svg;
var width = 500 , height = 300, margin = 5;


function update_pieChart(casesByMonth) {
	

	// radius of the pieplot is half the width or height
	var radius = Math.min(width, height) / 2 - margin
 
	pie_svg = d3.select("#pie_svg").append("svg")
	    		.attr("width", width)
	    		.attr("height", height)
	  			.append("g")
	    		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3.scaleOrdinal(d3.schemeCategory10);

	// get the position of each group on the pie:
	var pie_fn = d3.pie()
	  			.value(function(d) { return d['value']['cases']; })

	var data_ready = pie_fn(d3.entries(casesByMonth)) 


	// create month legend for pie chart:
	var legendG = pie_svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
	  .data(data_ready)
	  .enter().append("g")
	  .attr("transform", function(d,i){
	    return "translate(" + (155) + "," + (i * 15 ) + ")"; // place each legend on the right and bump each one down 15 pixels
	  })
	  .attr("class", "legend");   

	legendG.append("rect") // make a matching color rect
		  .attr("width", 10)
		  .attr("height", 10)
		  .attr("fill", function(d, i) {
		    return color(i);
		  });
    
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	
	legendG.append("text") // add the legend text
	  .text(function(d){
	    return months[Number((d.data['value']['month']).slice(5))-1];
	  })
	  .style("font-size", 12)
	  .attr("y", 10)
	  .attr("x", 11);


	// build arcs:
	var arcGenerator = d3.arc()
	  .innerRadius(0)
	  .outerRadius(radius)


	// each part of the pie is a path that we build using the arc function
	pie_svg.selectAll('mySlices')
	  	   .data(data_ready).enter()
	      .append('path')
	       .attr('d', arcGenerator)
	       .style("fill", function(d, i) { return color(i); })
	       .attr("stroke", "black")
	       .style("stroke-width", "0.5px");


	// Now add the annotation, Use the centroid method to get the best coordinates
	pie_svg.selectAll('mySlices')
	  	   .data(data_ready).enter()
	  	  .append('text')
	  	   .text(function(d) {  
	  	   		return d.data['value']['cases']; })
	       .attr("transform", function(d) { 
	       		return "translate(" + arcGenerator.centroid(d) + ")";  
	       	})
	       .style("text-anchor", "middle")
	       .style("font-size", 10 )




}

 





