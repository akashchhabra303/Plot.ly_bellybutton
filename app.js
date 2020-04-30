function init() {
   var menu = d3.select("#selDataset");
   
    d3.json("samples.json").then(function(data) {
        console.log(data);  
        var sampleID= data.names ;
        sampleID.forEach((x) => {
            menu
            .append("option")
            .text(x)
            .property("value",x);
            });
        var sample1 = sampleID[0];
        buildtable(sample1);
        buildcharts(sample1);
        buildbubblechart(sample1)
    });

}
init()

function buildtable(ID) {
    var demotable = d3.select("#sample-metadata");
   
    d3.json("samples.json").then(function(data) {
        console.log(data); 
        var sampleMetaData= data.metadata ;
        var results= sampleMetaData.filter(x => x.id == ID)
        console.log(results)
        var result = results[0]
        Object.entries(result).forEach(([x,y])=> {
            var row = demotable.append("tr");
            row.append("td").html(`<strong><font size = '1'>${x}</font></strong>:`);
            row.append('td').html(`<font size ='1'>${y}</font>`);

        });
        buildGauge(result.wfreq)
    });
    
}

function buildcharts(ID) {
    d3.json("samples.json").then(function(data) {
        console.log(data); 
        var sampleData= data.samples ;
        var results= sampleData.filter(x => x.id == ID)
        console.log(results)
        var result = results[0];
        var yticks = result.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`);
        var data = [
        {
            x: result.sample_values.slice(0,10),
            y: yticks,
            type: 'bar', orientation :'h',
        }
        ];

        var barlayout = {
            title : "Bar Chart",
        }
  
        Plotly.newPlot('bar', data, barlayout);
        
    });
}

//bubble chart
function buildbubblechart(ID){
    d3.json("samples.json").then(function(data) {
        console.log(data); 
        var sampleData= data.samples ;
        var results= sampleData.filter(x => x.id == ID)
        // var sampleMetaData= data.metadata ;
        // var results= sampleMetaData.filter(x => x.id == ID)
        console.log(results)
        var result = results[0]
        var trace1 = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
              size: result.sample_values,
              color: result.otu_ids
            }
          };
            console.log("hello world")
            // console.log(x);
            // console.log(y);
        
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
     

          };
          
          Plotly.newPlot('bubble', data, layout);
    });
}

function optionChanged(sample){
    buildtable(sample);
    buildcharts(sample);
    buildbubblechart(sample);
}



