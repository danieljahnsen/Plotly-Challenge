// Create a horizontal bar chart
// Takes in the sample name as the variable
function bar_chart(sample_name){
  //Load in the json data
  d3.json("samples.json").then((data)=>{

    // Grab the values for the data based on the sample name
    var sample_data = data.samples.filter(x => x.id == sample_name);
    
    //Store the values from the sample
    var otu_ids = sample_data[0].otu_ids;
    var otu_labels = sample_data[0].otu_labels;
    var sample_values = sample_data[0].sample_values;

    //Build the bar chart from the data
    var bar_values = [{
      y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }];

    //Creat a chart layout
    var layout = {
      title : "Top 10 Bacteria Cultures Found",
    };

    //Plot the chart
    Plotly.newPlot("bar", bar_values, layout);
    
  })
}

//Create a bubble chart using the same approach
function bubble_chart(sample_name){
  //Load in the json data
  d3.json("samples.json").then((data)=>{

    // Grab the values for the data based on the sample name
    var sample_data = data.samples.filter(x => x.id == sample_name);
    
    //Store the values from the sample
    var otu_ids = sample_data[0].otu_ids;
    var otu_labels = sample_data[0].otu_labels;
    var sample_values = sample_data[0].sample_values;

    //Create the chart data
    var bubble_values = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      }
    ];

    //Create the layout
    var layout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };


    //Plot the chart
    Plotly.newPlot("bubble", bubble_values, layout);
    
  })
}


//Display the sample metadata
function metadata(sample_name){
  d3.json("samples.json").then((data)=>{
    //Grab the metadata from the sample
    var metadata = data.metadata.filter(x => x.id == sample_name);

    //Select the sample-metadata ID
    var demographic = d3.select("#sample-metadata");

    // Reset the table
    demographic.html("");

    //Loop through the metadata and append the data to the table
    Object.entries(metadata[0]).forEach(([key,value])=>{
      demographic.append("h4").text(`${key} : ${value}`);
    });

  });
}

//Create a function to select the sample and chart the values
function page_setup(){
  // Access the data
  d3.json("samples.json").then((data)=>{
    
    // Get a list of the samples
    var sample_list = data.names;

    //Select the option menu
    var options = d3.select("#selDataset");

    //Append the names to the option menu
    sample_list.forEach((sample)=>{
      options.append("option").text(sample).property("value",sample);
    });
  });

  //Display an initial page
  bar_chart("940");
  bubble_chart("940");
  metadata("940");
}

//Capture and graph base on the value changing
function optionChanged(sample){
  bar_chart(sample);
  bubble_chart(sample);
  metadata(sample);
}

//Start the page setup
page_setup();
