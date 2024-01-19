import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import { InvoiceService } from 'src/app/services/invoice.service'
import { ActivatedRoute } from '@angular/router'
import { Revenue } from 'src/app/shared/model/Invoice'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-revenue-statistics',
  templateUrl: './revenue-statistics.component.html',
  styleUrls: ['./revenue-statistics.component.scss'],
})
export class RevenueStatisticsComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined

  public chartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {},
      y: {
        // min: 10,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  }
  public chartType: ChartType = 'bar'
  public chartPlugins = [DataLabelsPlugin]

  public chartData: ChartData<'bar'> = {
    labels: ['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Doanh thu' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Số đơn hàng' },
    ],
  }

  constructor(
    private api: InvoiceService,
    private activatedRoute: ActivatedRoute,
  ) {}

  revenues: Revenue[] = []
  revenuesSubscription: Subscription | undefined

  year: string = '2023'
  includeMonth: boolean = true

  ngOnInit(): void {
    this.year = '2023'
    this.includeMonth = true
  }

  ngOnDestroy() {}

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent
    active?: object[]
  }): void {
    // console.log(event, active)
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent
    active?: object[]
  }): void {
    // console.log(event, active)
  }

  public getRevenue(year: string, includeMonth: boolean): void {
    this.revenuesSubscription = this.api
      .getRevenue(year, includeMonth.toString())
      .subscribe({
        next: (serverRevenues: Revenue[]) => {
          if (!this.chartData) {
            console.error('Chart data is undefined')
            return
          }

          let labels: string[] = []
          let datasets: { data: number[]; label: string }[] = []

          for (let i = 0; i < serverRevenues.length; i++) {
            labels.push('Tháng ' + String(serverRevenues[i]._id.month))

            if (!datasets[0]) {
              datasets[0] = { data: [], label: 'Doanh thu' }
            }
            datasets[0].data.push(serverRevenues[i].totalCost)

            if (!datasets[1]) {
              datasets[1] = { data: [], label: 'Số đơn hàng' }
            }
            datasets[1].data.push(serverRevenues[i].quantity)
          }

          this.chartData.labels = labels

          if (datasets[0]) {
            this.chartData.datasets[0].data = datasets[0].data
            this.chartData.datasets[0].label = 'Doanh thu'
          }

          if (datasets[1]) {
            this.chartData.datasets[1].data = datasets[1].data
            this.chartData.datasets[1].label = 'Số đơn hàng'
          }

          this.chart?.update()
        },
        error: (error: any) => {
          console.error('Get Revenue error: ', error)
        },
      })
  }
}
