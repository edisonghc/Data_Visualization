

// Initialize global variables
var selected_state = 'Ohio'; // default state
var data_url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var states = [];
var state_data;

// Load the csv file
d3.csv(data_url, load_csvdata);

function load_csvdata(error, dataset) {

    // console.log(dataset);

    // Subset data based on default selection
    state_data = subset_data(dataset, selected_state)
    console.log(state_data);
    
    // Calculate monthly sums
    state_data = monthly_sum(state_data)




    // Get a list of all states
    for (var i = 0; i < dataset.length; i++) {
        states.push(dataset[i]['state']);
        // names.push(dataset[i]['Name']);
    }
    states = unique(states)
    console.log(states);

    // Draw bar chart
    //draw_barChart(state_data);

    // Draw pie chart
    draw_pieChart(state_data);


}

// Subset the dataset by the selected_state
function subset_data(dataset, selected_state) {

    var subset;

    subset = dataset.filter(entry => entry.state == selected_state)

    return subset;
}

// Compute the monthly totals
function monthly_sum(state_data) {
    var mapDayToMonth = state_data.map(x => ({ ...x, date: new Date(x.date).getMonth() }));

    var sum_by_state = d3.nest()
        .key(function (d) { return d.date; })
        .rollup(function (v) {
            return {
                // state: v.state,
                // fips: v.fips,
                cases: d3.sum(v, function (d) { return d.cases; }),
                // deaths: d3.sum(v, function (d) { return d.deaths; })
            };
        })
        .entries(mapDayToMonth);
    sum_by_state = sum_by_state.slice().sort((a, b) => d3.ascending(a['month'], b['month']))

    var rs = [];
    for (var i = 0; i < sum_by_state.length; i++) {
        var temp = new Object;
        temp['month'] = month[sum_by_state[i].key];
        temp['cases'] = sum_by_state[i].value.cases;
        rs.push(temp);
    }

    console.log(rs);
    return rs;
}