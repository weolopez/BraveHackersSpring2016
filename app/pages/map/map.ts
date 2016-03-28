import {Page, NavController, NavParams} from 'ionic-angular';
import {Story} from '../../models/story/story';

@Page({
    templateUrl: 'build/pages/map/map.html',
    providers: [ Story ]
})
export class Map {
     app: any;
     currentScene: any = 0;
     constructor(
        private nav: NavController, 
        private navParams: NavParams, 
        private story: Story
        ) {
        this.app=story.getApp('map');
        this.currentScene=0;
        this.displayMap();
    }
    displayMap() {
      
                   
        queue().defer(d3.json, "appdata/us-states.json")
               .defer(d3.csv, "appdata/att_poi.csv")
               .await(ready);
                     
        function ready(error, us, pois) {
           if (error) throw error;
           
           var width = window.innerWidth;
           var height = window.innerHeight;
           var centered;
           var projection = d3.geo.albersUsa()
                           .scale(width)
                           .translate([width / 2, height / 2]);
                                     
                  
           var path = d3.geo.path()
                     .projection(projection);
                                
        

           var svg = d3.select("svg")
                    .attr("width", width)
                    .attr("height", height);
                                

           var rect = svg.append("rect")
                    .attr("class", "background")
                    .attr("width", width)
                    .attr("height", height);
        
           var g = svg.append("g");
           
           g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("id", "states-path")
            .attr("d", path)
            .on("click", clicked);
                       
           g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("id", "state-borders")
            .attr("d", path);
            
           var poi_circles = g.append("g")
            .selectAll(".pois")
            .data(pois)
            .enter().append("circle")
            .attr("class", "pois")
            .attr("transform", function(d) {
                return "translate(" + projection([d.lon,d.lat]) + ")";})
            .attr("r", 5) 
            .attr("poi", function(d) {
               //console.log("poi is "+ d.name);
               return d.name;
             })
             // .style("stroke-dasharray", ("5,5")) 
             .style("stroke", "red") 
             .style("stroke-opacity", 1) 
             .style("fill-opacity", .2)      
             .style("fill", "red");
           
            
           function clicked(d) {                                
              var x, y, k;
  
              if (d && centered !== d) {
                 var centroid = path.centroid(d);
                 x = centroid[0];
                 y = centroid[1];

                 k = 4;
                 centered = d;
              }  else {
                  
                 x = width / 2;
                 y = height / 2;
                 k = 1;
                 centered = null;
              }

              g.selectAll("path")
               .classed("active", centered && function(d) { return d === centered; });

              g.transition()
               .duration(750)
               .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
               .style("stroke-width", 1.5 / k + "px");
                                       
           } //end clicked
                 
              d3.select(window).on('resize', resize);

              function resize() {
              // adjust things when the window size changes
                 width = window.innerWidth;
                 height = window.innerHeight;

                 // update projection
                                 
                 projection = d3.geo.albersUsa()
                                .scale(width)
                                .translate([width / 2, height / 2]);
                                      
                                      
                 path = d3.geo.path()
                          .projection(projection);

                 // resize the map container
                 svg.attr("width", width)
                    .attr("height", height);
                       
                 rect.attr("width", width)
                     .attr("height", height);
                 
                 // resize the map
                 d3.selectAll('#states-path').attr('d', path);
                 d3.selectAll('#state-borders').attr('d', path);
                 
                 var x = width / 2;
                 var y = height / 2;
                 var k = 1;
                 centered = null;
                 g.selectAll("path")
                   .classed("active", centered && function(d) { return d === centered; });

                 g.transition()
                  .duration(750)
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                  .style("stroke-width", 1.5 / k + "px"); 
                   
              } //end resize
        } // end ready                
                      
    }
}
