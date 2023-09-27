import { L } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
import { operationServices } from 'src/zsoonServices/operation.service';

const API = environment.baseURL;

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {

  step = 0;
  panelOpenState = false;
  fromMax;
  toMax;
  toMin;
  fromValue;
  toValue;
  public graphDetails: any = {}
  isSearched: boolean = false;

  public filterjson = {
    reportStart: null,
    reportEnd: null,
  };

  tabledata: any = [];
  MaximumRange = 0;
  MinimumRange = 0;

  constructor(private operatorservice: operationServices, private spinner: NgxSpinnerService) { }

  GetMonthlyTraffic() {
    this.spinner.show();
    this.operatorservice.MonthlyReports(this.filterjson).subscribe((res: any) => {
      this.spinner.hide();
      res.monthlyTraffics.forEach(e => {
        e.month = this.getMonthName(Number(e.visitmonth.substring(0, 2)));
      });
      this.tabledata = res?.monthlyTraffics;
      let months: any = [];
      let wdaybookings: any = [];
      let wdayvisitors: any = [];
      let wendbookings: any = [];
      let wendvisitors: any = [];

      this.tabledata.forEach(e => {
        months.push(e.month);
        wdaybookings.push(e.wdayBookings);
        wdayvisitors.push(e.wdayVisitors);
        wendbookings.push(e.wendBookings);
        wendvisitors.push(e.wendVisitors);
      });

      this.graphDetails = {
        "months": months,
        "weekday_bookings": wdaybookings,
        "weekday_visitor": wdayvisitors,
        "weekend_bookings": wendbookings,
        "weekend_visitor": wendvisitors
      }

      let wdaybookings_: any = [];
      let wdayvisitors_: any = [];
      let wendbookings_: any = [];
      let wendvisitors_: any = [];

      this.tabledata.forEach(e => {
        wdaybookings_.push(e.wdayBookings);
        wdayvisitors_.push(e.wdayVisitors);
        wendbookings_.push(e.wendBookings);
        wendvisitors_.push(e.wendVisitors);
      });

      let sortwdaybookings = this.sortArrays(wdaybookings_)
      let sortwdayvisitors = this.sortArrays(wdayvisitors_)
      let sortwendbookings = this.sortArrays(wendbookings_)
      let sortwendvisitors = this.sortArrays(wendvisitors_)
      let tempMaxRange = 0;

      if (sortwdaybookings[sortwdaybookings.length - 1] > tempMaxRange) {
        tempMaxRange = sortwdaybookings[sortwdaybookings.length - 1];
      }
      if (sortwdayvisitors[sortwdayvisitors.length - 1] > tempMaxRange) {
        tempMaxRange = sortwdayvisitors[sortwdayvisitors.length - 1];
      }
      if (sortwendbookings[sortwendbookings.length - 1] > tempMaxRange) {
        tempMaxRange = sortwendbookings[sortwendbookings.length - 1];
      }
      if (sortwendvisitors[sortwendvisitors.length - 1] > tempMaxRange) {
        tempMaxRange = sortwendvisitors[sortwendvisitors.length - 1];
      }

      for (let i = 0; i += 20;) {
        if (i >= tempMaxRange) {
          this.MaximumRange = i;
          break;
        }
      }
    })
  }

  SearchFilter() {
    if (this.filterjson.reportStart !== null && this.filterjson.reportEnd !== null) {
      this.isSearched = true;
      this.ngOnInit()
    }
  }

  fromSelect(event) {
    this.filterjson.reportStart = this.IsoFormat(event.target.valueAsDate);
    this.toMin = event.target.value;
    this.fromValue = event.target.value;
  }

  toSelect(event) {
    this.fromMax = event.target.value;
    this.filterjson.reportEnd = this.IsoFormat(event.target.valueAsDate);
    this.toValue = event.target.value;
  }


  convertDateString(date: Date) {
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return (month < 10) ? year + '-0' + month : year + '-' + month;
  }

  ngOnInit(): void {
    this.spinner.show();
    if (!this.isSearched) {
      this.fromValue = this.convertDateString(new Date());
      this.toValue = this.convertDateString(new Date());
      this.filterjson.reportStart = this.IsoFormat(new Date());
      this.filterjson.reportEnd = this.IsoFormat(new Date());
      this.toMin = this.fromValue;
      this.fromMax = this.convertDateString(new Date());
      this.toMax = this.convertDateString(new Date());
    }
    this.GetMonthlyTraffic()

    setTimeout(() => {
      const chart = new Chart('canvas', {
        type: "line",
        // plugins: [{
        //   beforeDraw: chart => {
        //     var ctx = chart.chart.ctx;
        //     var xAxis = chart.scales['x-axis-0'];
        //     var yAxis = chart.scales['first-y-axis'];
        //     ctx.save();
        //     ctx.fillStyle  = 'lightgray';
        //     ctx.beginPath();
        //     var yTop = yAxis.getPixelForValue(16.5);
        //     var yBottom = yAxis.getPixelForValue(12.5);
        //     ctx.fillRect(xAxis.left, yTop, xAxis.right - xAxis.left, yBottom - yTop);
        //     ctx.stroke();
        //     ctx.restore();
        //   }
        // }],
        data: {
          labels: this.graphDetails?.months,
          datasets: [{
            // data: [2, 3, 4, 5],
            data: this.graphDetails?.weekday_bookings,
            borderWidth: 3,
            pointBackgroundColor: "#324ea8",
            backgroundColor: "black",
            borderColor: "#324ea8",
            fill: false,
            lineTension: 0,
            yAxisID: 'first-y-axis'
          },
          {
            // data: [20, 30, 40, 50],
            data: this.graphDetails?.weekday_visitor,
            borderWidth: 3,
            pointBackgroundColor: "lightgreen",
            backgroundColor: "black",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            yAxisID: 'first-y-axis'
          },
          {
            // data: [40, 60, 80, 60, 100],
            data: this.graphDetails?.weekend_bookings,
            borderWidth: 3,
            pointBackgroundColor: "Orange",
            backgroundColor: "black",
            borderColor: "Orange",
            fill: false,
            lineTension: 0,
            yAxisID: 'first-y-axis'
          },
          {
            // data: [2, 3, 4, 5],
            data: this.graphDetails?.weekend_visitor,
            borderWidth: 3,
            pointBackgroundColor: "gray",
            backgroundColor: "black",
            borderColor: "gray",
            fill: false,
            lineTension: 0,
            yAxisID: 'first-y-axis'
          },
            // {
            //   yAxisID: 'third-y-axis'
            // }
          ],
        },
        options: {
          title: {
            display: false,
            text: 'Monthly Traffic',
            fontSize: 20,
          },
          scales: {
            yAxes: [{
              id: 'first-y-axis',
              type: 'linear',
              gridLines: {
                drawOnChartArea: true
              },
              scaleLabel: {
                display: false,
                // padding: '15px',
                labelString: 'Intensity'
              },
              ticks: {
                max: this.MaximumRange,
                min: this.MinimumRange,
                stepSize: 20
              }
            },
              // {
              //   id: 'second-y-axis',
              //   type: 'linear',
              //   position: 'left',
              //   gridLines: {
              //     drawOnChartArea: true
              //   },
              //   ticks: {
              //     display: false,
              //     min: 1,
              //     max: 8,
              //     stepSize: 1
              //   }
              // },
              // {
              //   id: 'third-y-axis',
              //   position: 'right',
              //   type: 'linear',
              //   gridLines: {
              //     drawOnChartArea: false
              //   },
              //   scaleLabel: {
              //     display: true,
              //     padding: '10px',
              //     labelString: 'Segment'
              //   },
              //   ticks: {
              //     max: 7.5,
              //     min: 0.5,
              //     stepSize: 1
              //   },
              //   afterTickToLabelConversion: function(scaleInstance) {
              //     scaleInstance.ticks[0] = null;
              //     scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;
              //     scaleInstance.ticksAsNumbers[0] = null;
              //     scaleInstance.ticksAsNumbers[scaleInstance.ticksAsNumbers.length - 1] = null;
              //   },
              // }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              // label: function (tooltipItem) {
              //   return tooltipItem.yLabel;
              // }
            }
          }
        }
      });
    }, 1000);
    this.spinner.hide();
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  Refresh() {
    this.fromValue = "";
    this.toValue = "";
    this.filterjson = {
      reportStart: null,
      reportEnd: null,
    }
    this.toMin = ""
    this.toMax = this.convertDateString(new Date());

  }

  DownloadExcel() {
    this.operatorservice.GetAllWeekEndBookingsDownload(API, this.filterjson).subscribe((res: any) => {
      if (res.success) {
        window.location.href = res.downloadLink;
      }
    })
  }

  IsoFormat(data) {
    // let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    // let starthours = data.getHours();
    // let startmintues = data.getMinutes();
    let startseconds = data.getSeconds();
    // var startDate = (startdate < 10) ? '0' + JSON.stringify(startdate) : JSON.stringify(startdate);
    var startMonth = (startmonth < 10) ? '0' + JSON.stringify(startmonth) : JSON.stringify(startmonth);
    // var startHours = (starthours < 10) ? '0' + JSON.stringify(starthours) : JSON.stringify(starthours);
    // var startMintues = (startmintues < 10) ? '0' + JSON.stringify(startmintues) : JSON.stringify(startmintues);
    var startSeconds = (startseconds < 10) ? '0' + JSON.stringify(startseconds) : JSON.stringify(startseconds);
    const StartDateTime =
      startyear + '-' + startMonth + '-' + '01' + 'T00:00:00.000Z';
    ':' + startSeconds;
    return StartDateTime;
  }

  getMonthName(index) {
    switch (index) {
      case 1:
        return "Jan"
      case 2:
        return "Feb"
      case 3:
        return "Mar"
      case 4:
        return "Apr"
      case 5:
        return "May"
      case 6:
        return "June"
      case 7:
        return "July"
      case 8:
        return "Aug"
      case 9:
        return "Sep"
      case 10:
        return "Oct"
      case 11:
        return "Nov"
      case 12:
        return "Dec"
    }
  }

  sortArrays(x) {
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x.length; j++) {
        if (x[i] < x[j]) {
          x[j] = x[i] + x[j] - (x[i] = x[j]);
        }
      }
    }
    return x ;
  }

}
