import { Component, OnInit, Input,ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdventureTimeService } from '../../real-time/front-end1/services/adventure-time.service';
import { ActivatedRoute } from '@angular/router';
import { CpuDataModel, LineData, threadValues ,bar } from '../../real-time/front-end1/health-data/cpu.model';
import { TokenStorageService } from '../../login/auth/token-storage.service';

@Component({
  selector: 'app-war-thread',
  templateUrl: './war-thread.component.html',
  styleUrls: ['./war-thread.component.css']
})
export class WarThreadComponent implements OnInit {

  private subscription: Subscription = new Subscription();



  dataSource: object;
  chartConfig: Object;
  res: any;
  svg: any;
  margin = { top: 5, right: 5, bottom: 5, left: 5 };
  width: number;
  height: number;
  gg: any = [];
  aa: any = [];
  bb: any = [];
  x: any;
  y: any;
  dd: any = [];
  cc: any = [];
  uu: any = [];
  vv: any = [];
  ww: any = [];
  ee: any = [];
  ff: any = [];
  gh: any = [];
  az: any = [];
  by: any = [];
  cx: any = [];
  dw: any = [];
  xx: any = [];
  yy: any = [];
  valueline: any;
  linedata: LineData[];
  // str: CpuDataModel;
  ud: any = [];
  // contain: any;
  data: CpuDataModel;
  data4: CpuDataModel;
  str: bar;
  charts: any = [];
  lineChartData: Array<any>;
  lineChartLabels: Array<any>;
  lineChartData1: Array<any>;
  lineChartLabels1: Array<any>;
  barChartData: Array<any>;
  barChartLabels: Array<any>;
  lineChartData2: Array<any>;
  lineChartLabels2: Array<any>;
  lineChartData5: Array<any>;
  lineChartLabels5: Array<any>;
  lineChartData7: Array<any>;
  lineChartLabels7: Array<any>;
  interval: any;
  // lineChartOptions:any = [];

  userID;
  appID;
  a;
  constructor(private atService: AdventureTimeService,
    private container: ElementRef,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userID = params['userID'];
      console.log("inside console" + params['userID'])
      console.log(this.userID)
      this.appID = params['appID'];
    });
  }

  @Input()
  contain: CpuDataModel;
  ngOnInit() {
    let count = 0;
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 1000);
    // this.route.params.subscribe( params => {
    //   this.userID =params['userID'];
    //   console.log("inside ngoninit"+params[userID])
    //   this.appID = params['appID'];
    // } );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  refreshData() {
    console.log("refreshData",this.userID)
    function parseMillisecondsIntoReadableTime(milliseconds){
      //Get hours from milliseconds
      // var hours = milliseconds / (1000*60*60);
      // var absoluteHours = Math.floor(hours);
      // var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
    
      // //Get remainder from hours and convert to minutes
      // var minutes = (hours - absoluteHours) * 60;
      // var absoluteMinutes = Math.floor(minutes);
      // var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
    
      // //Get remainder from minutes and convert to seconds
      // var seconds = (minutes - absoluteMinutes) * 60;
      // var absoluteSeconds = Math.floor(seconds);
      // var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
    
    
      // return m + ':' + s;

      var date = new Date(milliseconds);

      console.log(date.toString());
    
      return date.toLocaleTimeString();
    }

    let h = this.xx
    let i = this.yy
    let j = this.az
    let k = this.by
    let l = this.cx
    let m = this.dw
    console.log("above service",this.userID);
    this.atService.getDetails("warThread", this.userID, this.appID).subscribe(function (data5) {
      console.log("thread", this.userID, this.appID, ".....................................", data5);
      this.data6 = data5
        //  console.log(JSON.stringify(dat))
        //console.log(data1.results.length)
        
        data5.results.map(function(results) {
            // results.map(function(series) {
            //    series.values.map(function(eachValueArray) {
            //       console.log(eachValueArray)
            //    })
            // })
            
            results.series.map(function(e) {
              //console.log(e.values)
              var c1=0,c2=0,c3=0,c4=0;
              e.values.map(function(eachValueArray) {
                //console.log(eachValueArray)
                
                eachValueArray.map(function(value, index) {
                   //console.log(value, index)
                   if (index === 0) {
            //        console.log(value,"bta");  
                    h.push(parseMillisecondsIntoReadableTime(value))
                    if (h.length > 2700) {
                      h.splice(0,1)
                    }
                      // this.ud.push(value)
                   }else if(index ===6) {
                    //console.log(value,"bta bhai");
                     i.push(value)
                     if (i.length > 2700) {
                      i.splice(0,1)
                    }
                      // this.gg.push(value)
                   }
                   else if(index ===5){
                     if(value === 'RUNNABLE'){
                       c1++;
                       //console.log('state1',value);
                     }
                     else if(value === 'WAITING'){
                       c2++;
                       //console.log('state2',value);
                     }
                     else if(value === 'BLOCKED'){
                       c3++;
                       //console.log('state3',value);
                     }
                     else{
                       c4++;
                       //console.log('state4',value);
                     }
                   }
                   
                })
                j.push(c1);
                if (j.length > 2700) {
                  j.splice(0,1)
                }
                k.push(c2);
                if (k.length > 2700) {
                  k.splice(0,1)
                }
                l.push(c3);
                if (l.length > 2700) {
                  l.splice(0,1)
                }
                m.push(c4);
                if (m.length > 2700) {
                  m.splice(0,1)
                }
              //  console.log(c1,c2,c3,c4)
                
              })
              
              
            })
            //console.log(results.series)
        })
        
      });
      
      //console.log(b);
      //console.log(c);
      //console.log(d);
      //console.log(g);
      //console.log(f);
  
  
      this.lineChartData2 = [
        // {data: b, label: 'Series A'},
        {data: j, label: 'RUNNABLE'},
        {data: k, label: 'WAITING'},
        {data: l, label: 'BLOCKED'},
        {data: m, label: 'TIMED_WAITING'}
        ];
        //console.log(this.lineChartData);
        //console.log(a);
       this.lineChartLabels2 = h;
       //console.log(this.lineChartData);
     



    //    let u = this.uu

    //    let v = this.vv
   
    //    let w = this.ww
   
    //    let x = this.bb
   
    //    let y = this.cc
   
    //    let z = this.dd
   
    //    this.atService.getDetails("networkMetrics").subscribe(function (data1) { 
   
    //      //console.log("ud"+ a);
   
    //      this.data = data1
   
    //      //  console.log(JSON.stringify(dat))
   
    //      //console.log(data1.results.length)
   
    //      data1.results.map(function(results) {
   
    //          // results.map(function(series) {
   
    //          //    series.values.map(function(eachValueArray) {
   
    //          //       console.log(eachValueArray)
   
    //          //    })
   
    //          // })
   
    //          results.series.map(function(e) {
   
    //            //console.log(e.values)
   
    //            e.values.map(function(eachValueArray) {
   
    //              //console.log(eachValueArray)
   
    //              eachValueArray.map(function(value, index) {
   
    //                 //console.log(value, index)
   
    //                 if (index === 0) {
   
    //                  //console.log(value,"bta");  
   
    //                  u.push(parseMillisecondsIntoReadableTime(value))
   
    //                    // this.ud.push(value)
   
    //                 }else if(index === 3) {
   
    //                  //console.log(value,"bta bhai");
   
    //                   v.push(value)
   
    //                    // this.gg.push(value)
   
    //                 }
   
    //                 else if(index === 11){
   
    //                   w.push(value)
   
    //                 }
   
    //                 else if(index === 1){
   
    //                   x.push(value)
   
    //                 }
   
    //                 else if(index === 2){
   
    //                   y.push(value)
   
    //                 }
   
    //                 else if(index === 10){
   
    //                   z.push(value)
   
    //                 }
   
    //              })
   
    //            })
   
               
   
    //          })
   
    //          //console.log(results.series)
   
    //      })
   
    //    });
   
    //    // console.log("sjfhjhsjh",this.str[0][0][1][1]);
   
   
   
       
    //    this.lineChartData7 = [
   
    //      {data: v, label: 'Downlaod Speed'},
   
    //      {data: w, label: 'Upload Speed'},
   
    //      {data: x, label: 'Data in rate'},
   
    //      {data: y, label: 'Data out rate'},
   
    //      {data: z, label: 'Max_transmission_rate'},
   
    //      ];
   
    //      //console.log(a);
   
    //     this.lineChartLabels7 = u;
  
    // }
      }

    public lineChartColors2:Array<any> = [
      // { // grey
      //   backgroundColor: 'white',
      //   borderColor: 'pink',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      // },
      { // dark grey
        //backgroundColor: 'white',
        borderColor: 'lightgreen',
        // pointBackgroundColor: 'rgba(77,83,96,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        //backgroundColor: 'white',
        borderColor: 'skyblue',
        //pointBackgroundColor: 'rgba(148,159,177,1)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // grey
        //backgroundColor: 'white',
        borderColor: 'yellow',
        //pointBackgroundColor: 'rgba(148,159,177,1)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // grey
        //backgroundColor: 'white',
        borderColor: 'red',
        //pointBackgroundColor: 'rgba(148,159,177,1)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];





  public lineChartColors7:Array<any> = [

    { // grey

      //backgroundColor: 'rgba(148,159,177,0.2)',

      borderColor: 'red',

      //pointBackgroundColor: 'rgba(148,159,177,1)',

      //pointBorderColor: '#fff',

      //pointHoverBackgroundColor: '#fff',

      //pointHoverBorderColor: 'rgba(148,159,177,0.8)'

    },

    { // dark grey

      //backgroundColor: 'rgba(77,83,96,0.2)',

      borderColor: 'green',

      //pointBackgroundColor: 'rgba(77,83,96,1)',

      //pointBorderColor: '#fff',

      //pointHoverBackgroundColor: '#fff',

      //pointHoverBorderColor: 'rgba(77,83,96,1)'

    },

    { // grey

      //backgroundColor: 'rgba(148,159,177,0.2)',

      borderColor: 'blue',

      //pointBackgroundColor: 'rgba(148,159,177,1)',

      //pointBorderColor: '#fff',

      //pointHoverBackgroundColor: '#fff',

      //pointHoverBorderColor: 'rgba(148,159,177,0.8)'

    },

    { // grey

      //backgroundColor: 'rgba(148,159,177,0.2)',

      borderColor: 'yellow',

      //pointBackgroundColor: 'rgba(148,159,177,1)',

      //pointBorderColor: '#fff',

      //pointHoverBackgroundColor: '#fff',

      //pointHoverBorderColor: 'rgba(148,159,177,0.8)'

    },

    { // grey

      //backgroundColor: 'rgba(148,159,177,0.2)',

      borderColor: 'black',

      //pointBackgroundColor: 'rgba(148,159,177,1)',

      //pointBorderColor: '#fff',

      //pointHoverBackgroundColor: '#fff',

      //pointHoverBorderColor: 'rgba(148,159,177,0.8)'

    }

  ];
    public lineChartColors5:Array<any> = [
      // { // grey
      //   backgroundColor: 'white',
      //   borderColor: 'pink',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      // },
      { // dark grey
        //backgroundColor: 'white',
        borderColor: 'lightgreen',
        // pointBackgroundColor: 'rgba(77,83,96,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        //backgroundColor: 'white',
        borderColor: 'skyblue',
        //pointBackgroundColor: 'rgba(148,159,177,1)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // grey
        //backgroundColor: 'white',
        borderColor: 'yellow',
        //pointBackgroundColor: 'rgba(148,159,177,1)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // grey
        //backgroundColor: 'white',
        borderColor: 'red',
        //pointBackgroundColor: 'rgba(148,159,177,1)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    public lineChartColors1:Array<any> = [
      { // grey
        backgroundColor: 'white',
        borderColor:  'green',//'rgba(148,159,177,1)',
        pointBackgroundColor: 'brown',//'rgba(148,159,177,1)',
        pointBorderColor: 'red',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'coral',//'rgba(148,159,177,0.8)',
        pointStyle: 'rectRounded',
        pointRadius: 8
      }]


  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'white',
      borderColor:  'coral',//'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public lineChartOptions: any = {
    resposive : false,
    
      
        
      
    
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    // animation: false,
    // //Boolean - If we want to override with a hard coded scale
    // scaleOverride: true,
    // //** Required if scaleOverride is true **
    // //Number - The number of steps in a hard coded scale
    // scaleSteps: 10,
    // //Number - The value jump in the hard coded scale
    // scaleStepWidth: 10,
    // //Number - The scale starting value
    // scaleStartValue: 0
  }
  
  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;




  // var myLineChart = new Chart(ctx).Line(data, options);

  
  // var months = ["January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"
  // ];


}
