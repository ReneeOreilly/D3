var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
}

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
d3.csv("assets/data/data.csv", function(error, ACSdata) {
    if (error) throw error;
    console.log(ACSdata);

ACSdata.forEach(function(data){
    data.poverty = +data.poverty;
    data.smokes = +data.smokes;
});

var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(ACSdata.map(data => data.poverty));

var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(ACSdata, data => data.smokes)]);

var bottomAxis = d3.axisBottom(xTimeScale);
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ')')
    .call(bottomAxis)    
});

