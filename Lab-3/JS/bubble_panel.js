
var bubble_svg;
var diameter = 380;

function draw_bubbleChart(casesByState) {

    // convert the dict data to hierarchy format
    var hier_data = {"children": casesByState};


	/* 
		Bubble chart: size of circle represents the 
		total number of cases in US states
	*/
    var bubble = d3.pack(hier_data)
        .size([diameter, diameter])
        .padding(2);

    bubble_svg = d3.select("#bubble_svg")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter);


    var nodes = d3.hierarchy(hier_data)
        .sum(function(d) { return d['total_cases']; });

    var node = bubble_svg.selectAll()
        .data(bubble(nodes).descendants()).enter()
        .filter(function(d){
            return  !d.children
        }) // filter out the outer bubble
        .append("g") 
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
 

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", '#aed581')
        .attr("id", function(d) { return d.data['state']; })
        .on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);

    // annotate state name
    node.append("text")
        // .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data["state"]; })
        .attr("font-size", function(d){ return d.r/3; })
        .attr("fill", "#696969");

    // handle the mouseover on bubbles 
	function handleMouseOver() {
		var caseNum, 
			state_id = this['id'];
		// console.log(this['id']);
		for (const row of casesByState) {
			if (row['state'] == state_id)
				caseNum = row['total_cases'];
		}
 
		bubble_svg.select('[id="'+state_id+'"]') 
		  		  .style("fill", "orange")
		// annotate case number
		bubble_svg.append("text")
				   .attr("id", 'case_text')
			       .attr("dy", ".2em")
			       .attr("x", 0)
			       .attr("y", 20)
			       .text('Case number: ' + caseNum)
			       .attr("font-size", 15); 
	}

    // handle the mouseout
	function handleMouseOut(argument) {
		var state_id = this['id'];
		bubble_svg.select('[id="'+state_id+'"]') 
		  		  .style("fill", "#aed581")
		bubble_svg.select('#case_text') .remove();
	}



}














