
var bar_svg, onMonth; 

/*
   Use bar chart to display the monthly cases of selected state
*/

function update_barChart(casesByMonth) {


	var margin = {top: 20, right: 20, bottom: 135, left: 90},
		width = 500 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	var x = d3.scaleBand()
			      .range([0, width])
			      .padding(0.1);
	var y = d3.scaleLinear().range([height, 0]);


	bar_svg = d3.select("#bar_svg").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  	.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// set x y axis domains:
	x.domain(casesByMonth.map(function(d) { return d['month']; }));
	y.domain([0, d3.max(casesByMonth.map(function(d) { return d['cases']; }))])

	var xAxis = d3.axisBottom().scale(x);
	var yAxis = d3.axisLeft().scale(y);


	bar_svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	  .selectAll("text")
	    .style("text-anchor", "end")
	    .attr("dx", "-.8em")
	    .attr("dy", "-.6em")
	    .attr("transform", "rotate(-70)" );

  	bar_svg.append("g")
       .attr("class", "y axis")
       .attr("transform", "translate(0," + 6 + ")")
       .call(yAxis);

  	bar_svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x",0 - (height/2))
       .attr("y", 0 - margin.left)
       .attr("dy", "1em")
       .text("Number of cases");    


  	bar_svg.append("text")
       .attr("x", height/2 + margin.left )
       .attr("y", height + margin.bottom/2)
       .attr("dy", "1em")
       .text("Month");   
 

  	bar_svg.selectAll("bar")
       .data(casesByMonth).enter()
       .append("rect")
       .attr("id", function (d){ return d['month']; }) // set month as id
       .style("fill", "steelblue")
       .attr("x", function(d) { return x(d['month']); })
       .attr("width", (x.bandwidth() - 10)) // bar width
       .attr("y", function(d) { return y(d['cases']); })
       .attr("height", function(d) { return height - y(d['cases']) })
       .on("mouseover", handleMouseOn)
       .on("mouseout", handleMouseOut);



    function getMonCasesByMonth(month) {
      var data = [];
      console.log(month);
      console.log(casesByMonth);
      for (const row of casesByMonth) {
        if (row['month'] == month) {
            data = row['cases'];
        }
      }
      return data;
    }


    function handleMouseOn() { 
      onMonth = this['id'];
      var casesNum = getMonCasesByMonth(onMonth);

      d3.select('[id="'+onMonth+'"]')
        .style("fill", "orange")
      bar_svg.append("text")
             .attr("id", 'bar_text')
             .attr("x", x(onMonth) - 15)
             .attr("y", y(casesNum) - 18)
             .attr("dy", "1em")
             .text(casesNum);  
    }


    function handleMouseOut() {
      d3.select('[id="'+(this['id'])+'"]')
        .style("fill", "steelblue");
      bar_svg.select('#bar_text') .remove();
    }





}










