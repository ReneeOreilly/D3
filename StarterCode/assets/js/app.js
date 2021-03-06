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
    
d3.csv("assets/data/data.csv", function(ACSdata) {
        ACSdata.healthcare = +ACSdata.healthcare;
        ACSdata.poverty = +ACSdata.poverty;
        return ACSdata;
    }).then(function(ACSdata) {
        console.log(ACSdata);
      
        var xLinearScale = d3.scaleLinear()
        .domain([6, d3.max(ACSdata, data => data.poverty)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(ACSdata, data => data.healthcare)+10])
        .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);
    
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);    


    var circles = svg.selectAll("g.circles")
    .data(ACSdata)
    .enter();

        
            // .data(ACSdata)
            // .enter()
           
            circles.append("circle")
                .attr("cx", data => xLinearScale(data.poverty))
                .attr("cy", data => yLinearScale(data.healthcare))
                .attr("r", "15")
                .attr("opacity", ".5")
                .classed("stateCircle", true);
    
            circles.append("text")
                .attr("x", data => xLinearScale(data.poverty))
                .attr("y", data => yLinearScale(data.healthcare))
                .text(function(data){console.log(data); return data.abbr})
                .classed("stateText", true);
                console.log(ACSdata);

    // chartGroup.selectAll("text")
    //     .data(ACSdata)
    //     .enter()
    //     .append("text")
        
    //     console.log(ACSdata);


        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (chartHeight / 2))
        .attr("class", "aText")
        .text("Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top -20})`)
        .attr("class", "aText")
        .text("Poverty (%)");

    });