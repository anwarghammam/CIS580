

function all(){
    
 var ctx = document.getElementById('myChart').getContext('2d');
 var ctx2 = document.getElementById('myChart2').getContext('2d');
 var ctx3 = document.getElementById('myChart3').getContext('2d');
 var ctx4 = document.getElementById('myChart4').getContext('2d');
 var ctx5 = document.getElementById('myChart5').getContext('2d');
 var ctx6 = document.getElementById('myChart6').getContext('2d');
 const query1='100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])  * on(instance) group_left(node_name) node_meta * 100) by (node_name))';
 const query2 = 'sum(node_load5 * on(instance) group_left(node_name) node_meta) by (node_name)';
 
 const query3 ='count(node_meta * on(instance) group_left(node_name) node_meta)';
 const query4 ='sum((node_memory_MemTotal_bytes/1000000 - node_memory_MemFree_bytes/1000000 - node_memory_Cached_bytes/1000000 - node_memory_Buffers_bytes/1000000 - node_memory_Slab_bytes/1000000) * on(instance) group_left(node_name) node_meta) by (node_name)'
const query5="sum(rate(container_network_receive_bytes_total[5m]) * on(container_label_com_docker_swarm_node_id) group_left(node_name) node_meta) by (node_name)"
const query6="sum(rate(container_network_transmit_bytes_total [5m]) * on(container_label_com_docker_swarm_node_id) group_left(node_name) node_meta) by (node_name)" 
// const query = 'node_load1';
 // // absolute
 // const start = new Date(new Date().getTime() - (60 * 60 * 1000));
 // const end = new Date();
 // relative
 const start = -30 * 60 * 1000;
 const end = 0; // now
 var myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        },
    options: {
       title: {
           display: true,
           text: '% of cpu usage per node '
       },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'minute',
                                              
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }                        
            }]
        },
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: "http://ec2-54-87-55-164.compute-1.amazonaws.com:9090",
                   
                },
                query: query1,
                timeRange: {
                    type: 'relative',
                    start:start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        
        },
      
    annotation: {
      
       drawTime: 'afterDatasetsDraw', 
       events: ['click'],
       dblClickSpeed: 350, 
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
               
           }
                 }]
   }
              
            },

    plugins: [
        ChartDatasourcePrometheusPlugin,
        
      
       
    ],
 });
 var myChart2 = new Chart(ctx2, {
     type: 'line',
     data: {},
     options: {
        title: {
            display: true,
            text: 'System load per node'
        },
         scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                     
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
         plugins: {
             'datasource-prometheus': {
                 prometheus: {
                     endpoint: "http://ec2-54-87-55-164.compute-1.amazonaws.com:9090",
                    
                 },
                 query: query2,
                 timeRange: {
                     type: 'relative',
                     start: start,
                     end: end,
                     msUpdateInterval: 5 * 1000,
                 },
             },
         },
     
     annotation: {
        // Defines when the annotations are drawn.
        // This allows positioning of the annotation relative to the other
        // elements of the graph.
        //
        // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
        // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
        drawTime: 'afterDatasetsDraw', // (default)

        // Mouse events to enable on each annotation.
        // Should be an array of one or more browser-supported mouse events
        // See https://developer.mozilla.org/en-US/docs/Web/Events
        events: ['click'],

        // Double-click speed in ms used to distinguish single-clicks from
        // double-clicks whenever you need to capture both. When listening for
        // both click and dblclick, click events will be delayed by this
        // amount.
        dblClickSpeed: 350, // ms (default)

        // Array of annotation configuration objects
        // See below for detailed descriptions of the annotation options
        annotations: [{
            drawTime: 'afterDraw', // overrides annotation.drawTime if set
            id: 'a-line-1', // optional
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value:new Date() ,
            borderColor: 'black',
            borderWidth: 2,
    
               onClick: function(e) {
                   // `this` is bound to the annotation element
                   this.options.value=new Date();
                   console.log(this)
               }
                     }]
    }
         },

     plugins: [
         ChartDatasourcePrometheusPlugin,
     ],
 });
 var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'number of nodes'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                       
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: "http://ec2-54-87-55-164.compute-1.amazonaws.com:9090",
                   
                },
                query: query3,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       
       drawTime: 'afterDatasetsDraw', // (default)
       events: ['click'],

       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
      

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
        // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});
var myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'Memory Usage per node (Mb)'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                        
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: "http://ec2-54-87-55-164.compute-1.amazonaws.com:9090",
                   
                },
                query: query4,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       // Defines when the annotations are drawn.
       // This allows positioning of the annotation relative to the other
       // elements of the graph.
       //
       // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
       // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
       drawTime: 'afterDatasetsDraw', // (default)

       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
       events: ['click'],

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
       dblClickSpeed: 350, // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
              
               
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});


var myChart5 = new Chart(ctx5, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'received network traffic per node'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                         
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: "http://ec2-54-87-55-164.compute-1.amazonaws.com:9090",
                   
                },
                query: query5,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        
    
            annotation: {
       
                drawTime: 'afterDatasetsDraw', // (default)
                events: ['click'],
                // Mouse events to enable on each annotation.
                // Should be an array of one or more browser-supported mouse events
                // See https://developer.mozilla.org/en-US/docs/Web/Events
               
         
                // Double-click speed in ms used to distinguish single-clicks from
                // double-clicks whenever you need to capture both. When listening for
                // both click and dblclick, click events will be delayed by this
                // amount.
                 // ms (default)
         
                // Array of annotation configuration objects
                // See below for detailed descriptions of the annotation options
                annotations: [{
                 drawTime: 'afterDraw', // overrides annotation.drawTime if set
                 id: 'a-line-1', // optional
                 type: 'line',
                 mode: 'vertical',
                 scaleID: 'x-axis-0',
                 value:new Date() ,
                 borderColor: 'black',
                 borderWidth: 2,
         
                    onClick: function(e) {
                        // `this` is bound to the annotation element
                        this.options.value=new Date();
                        
                    }
                          }]
            }  }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});

var myChart6 = new Chart(ctx6, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'transmit network traffic per node'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                      
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: "http://ec2-54-87-55-164.compute-1.amazonaws.com:9090",
                   
                },
                query: query6,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       // Defines when the annotations are drawn.
       // This allows positioning of the annotation relative to the other
       // elements of the graph.
       //
       // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
       // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
       drawTime: 'afterDatasetsDraw', // (default)
       events: ['click'],
       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
       //events: ['click'],

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
       dblClickSpeed: 350, // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
               
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});


 document.getElementById('updateBtn').addEventListener('click', () => {
     myChart.update();
 });}