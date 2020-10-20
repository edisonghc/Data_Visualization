d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv", drawBars);

function drawBars(error, data) {
    var covid = data;

    var padding = 1;
    var barHeight = 3;
    var fontSize = 5;

    var svg = d3.select("svg");
    var texts = svg.selectAll('text')
        .data(covid)
        .enter().append("text")
        .attr('x', 0)
        .attr('y', function (d, i) {
            return (i + 1) * (barHeight + padding);
        })
        .attr('font-size', fontSize)
        .text(function (d) {
            return d.date;
        });

    var scaleFactor = 1e-4;
    var rects = svg.selectAll("rect")
        .data(covid)
        .enter().append("rect")
        .attr("x", 30)
        .attr("y", function (d, i) {
            return padding + i * (barHeight + padding);
        })
        .attr("width", function (d, i) {
            return d.cases * scaleFactor;
        })
        .attr("height", barHeight)
        .style("fill", "steelblue");

    /*
    // highlight cities that populations are larger than five million
    filterCities();

    // sort cities
    sortCities();

    // Create a table
    tabulate(["name", "population"], cities);

    function filterCities() {
        rects
        .filter(function(d, i) {
            return d.population > 5 * 1e6;
        })
        .style("fill", "red");
    }

    function sortCities() {
        texts
            .sort(function(a, b) {
                return d3.ascending(a.population, b.population);
                // return d3.descending(a.population, b.population);
            })
            .attr("y", function(d, i) {
                return (i + 1) * (barHeight + padding);
            })

        rects
            .sort(function(a, b) {
                return d3.ascending(a.population, b.population);
                // return d3.descending(a.population, b.population);
            })
            .attr("y", function(d, i) {
                return padding + i * (barHeight + padding);
            })
    }

    function tabulate(columnNames, data) {
        var table = d3.select('body').append('table');
        var thead = table.append('thead');
        var	tbody = table.append('tbody');

        // append the header row
        thead.append('tr')
            .selectAll('th')
            .data(columnNames)
            .enter()
            .append('th')
            .text(function (d) { 
            return d; 
            });

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
            .data(function (row) {
            return columnNames.map(function (columnName) {
                return {
                key: columnName, 
                value: row[columnName]
                };
            });
            })
            .enter()
            .append('td')
            .text(function (d) { 
            return d.value; 
            });

        return table;
    }
    */
}
