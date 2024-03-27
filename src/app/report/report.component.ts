import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartData, ChartConfiguration, ChartOptions } from 'chart.js';
import { cases } from '../mock-data';
import { FormControl, FormGroup } from '@angular/forms';
import { CaseDetail } from 'src/dto/case-detail.dto';

// interface CaseDetail {
//   caseNo: string;
//   departmentName: string;
//   branchName: string;
//   reporter: {
//     code: string;
//     name: string;
//     email: string;
//   };
//   reportedOn: string;
//   subject: string;
//   description: string;
//   employeeInvolved: {
//     code: string;
//     name: string;
//     email: string;
//   }[];
//   closedOn: string | null;
//   status: string;
//   statusHistory: {
//     status: string;
//     statusDesc: string;
//     updateOn: string;
//     updatedBy: {
//       code: string;
//       name: string;
//       email: string;
//     };
//     comment: string;
//     attachment?: {
//       filename: string;
//       fileurl: string;
//     }[];
//   }[];
// }

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  cases: CaseDetail[] = [];

  // employees: { empNo: string; name: string }[] = [];
  searchForm: FormGroup;
  casesOverTimeChart: Chart | null = null;
  casesByStatusChart: Chart | null = null;
  casesByDepartmentChart: Chart | null = null;

  ngOnInit(): void {
    this.cases = cases;
    this.initTATByDepartmentChart();
    this.prepareFraudCasesData();
    this.filterData();
  }
  constructor() {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    this.searchForm = new FormGroup({
      startDate: new FormControl(oneYearAgo),
      endDate: new FormControl(today),
    });
  }

  downloadReport(format: string): void {
    if (format === 'pdf') {
      alert('Downloading as PDF...');
    } else {
      alert('Downloading as Excel...');
    }
  }

  initCasesOverTimeChart(cases: any[], startDate: Date, endDate: Date): void {
    const ctx = (
      document.getElementById('casesOverTimeCanvas') as HTMLCanvasElement
    ).getContext('2d');

    if (this.casesOverTimeChart) {
      this.casesOverTimeChart.destroy();
    }
    const canvas = document.getElementById('casesOverTimeCanvas');
    if (canvas) {
      canvas.style.display = 'block';
    }

    if (ctx) {
      const monthlyCaseCounts = this.aggregateMonthlyCaseCounts(
        cases,
        startDate,
        endDate
      );

      const data = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Cases Over Time',
            data: monthlyCaseCounts,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      const config: ChartConfiguration<'line'> = {
        type: 'line',
        data: data,
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: 2,
              },
            },
          },
        },
      };

      this.casesOverTimeChart = new Chart(ctx, config);
    }
  }

  filterData(): void {
    const startDate = new Date(this.searchForm.get('startDate')!.value);
    const endDate = new Date(this.searchForm.get('endDate')!.value);

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      startDate > endDate
    ) {
      console.error('Invalid date range');
      return;
    }

    const filteredCases = this.cases.filter((c) => {
      const reportedDate = new Date(c.reportedOn);
      return reportedDate >= startDate && reportedDate <= endDate;
    });

    this.initCasesOverTimeChart(filteredCases, startDate, endDate);
    this.filterDeptData(startDate, endDate);
    this.filterStatusData(startDate, endDate);
  }

  aggregateMonthlyCaseCounts(
    cases: any[],
    startDate: Date,
    endDate: Date
  ): number[] {
    console.log('aggregateMonthlyCaseCounts function called');
    const monthlyCounts = Array(12).fill(0);

    cases.forEach((c) => {
      const reportedDate = new Date(c.reportedOn);
      if (reportedDate >= startDate && reportedDate <= endDate) {
        const monthIndex = reportedDate.getMonth();
        monthlyCounts[monthIndex]++;
      }
    });
    console.log('monthlyCaseCounts:', monthlyCounts);
    return monthlyCounts;
  }

  initCasesByDepartmentChart(startDate: Date, endDate: Date): void {
    const canvas = document.getElementById(
      'casesByDepartmentCanvas'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Could not get 2D rendering context for canvas');
      return;
    }

    if (this.casesByDepartmentChart) {
      this.casesByDepartmentChart.destroy();
    }

    const filteredCases = this.filterCasesByDate(startDate, endDate);

    const casesByDepartment = this.aggregateCasesByDepartment(filteredCases);
    const colors = [
      '#BCE893',
      '#00D09B',
      '#00A6E1',
      '#556BFA',
      '#9191E9',
      '#52528C',
      '#FFB040',
      '#893168',
      '#E84866',
      '#EFE000',
    ];
    var casesByDepartmentArray = Object.entries(casesByDepartment).sort(
      (a, b) => b[1] - a[1]
    );

    const data: ChartData = {
      labels: casesByDepartmentArray.map((val) => val[0]),
      datasets: [
        {
          label: 'Cases by Department',
          data: casesByDepartmentArray.map((val) => val[1]),
          backgroundColor: colors.slice(
            0,
            Object.values(casesByDepartment).length
          ),
          borderWidth: 0,
          radius: 150,
        },
      ],
    };

    const options: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Cases by Department',
        },
        legend: {
          display: true,
          position: 'right',
        },
      },
      maintainAspectRatio: false,
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: options,
    };

    this.casesByDepartmentChart = new Chart(ctx, config);
  }

  filterDeptData(startDate: Date, endDate: Date): void {
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      this.initCasesByDepartmentChart(startDate, endDate);
    } else {
      console.error('Invalid date range');
    }
  }

  private filterCasesByDate(startDate: Date, endDate: Date): any[] {
    return this.cases.filter((c) => {
      const reportedDate = new Date(c.reportedOn);
      return reportedDate >= startDate && reportedDate <= endDate;
    });
  }

  private aggregateCasesByDepartment(cases: any[]): { [key: string]: number } {
    return cases.reduce((acc: { [key: string]: number }, curr: any) => {
      acc[curr.departmentName] = (acc[curr.departmentName] || 0) + 1;
      return acc;
    }, {});
  }

  initCasesByStatusChart(filteredCases: any[]): void {
    const canvas = document.getElementById(
      'casesByStatusCanvas'
    ) as HTMLCanvasElement;
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    console.log(ctx);
    if (!ctx) {
      console.error('Could not get 2D rendering context for canvas');
      return;
    }

    if (this.casesByStatusChart) {
      this.casesByStatusChart.destroy();
    }
    const openCases = filteredCases.filter((c) => c.status === 'open').length;
    const closedCases = filteredCases.filter(
      (c) => c.status === 'closed'
    ).length;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Open', 'Closed'],
        datasets: [
          {
            label: 'Cases by Status',
            data: [openCases, closedCases],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    this.casesByStatusChart = new Chart(ctx, config);
  }

  filterStatusData(startDate: Date, endDate: Date): void {
    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      startDate > endDate
    ) {
      console.error('Invalid date range');
      return;
    }

    const filteredCases = this.cases.filter((c) => {
      const reportedDate = new Date(c.reportedOn);
      return reportedDate >= startDate && reportedDate <= endDate;
    });

    this.initCasesByStatusChart(filteredCases);
  }

  initTATByDepartmentChart(): void {
    const departmentLabels = this.getDepartments();
    const averageTATs = this.calculateAverageTATs(departmentLabels);

    const ctx = document.getElementById(
      'tatByDepartmentCanvas'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: departmentLabels,
        datasets: [
          {
            label: 'Average Turnaround Time (days)',
            data: averageTATs,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getDepartments(): string[] {
    return this.cases
      .map((caseItem) => caseItem.departmentName)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  calculateAverageTATs(departments: string[]): number[] {
    const averageTATs: number[] = [];
    departments.forEach((department) => {
      const departmentCases = this.cases.filter(
        (caseItem) => caseItem.departmentName === department
      );
      const totalTAT = departmentCases.reduce((acc, curr) => {
        const reportedDate = new Date(curr.reportedOn).getTime();
        const closedDate =
          curr.status === 'closed'
            ? new Date(curr.closedOn || new Date()).getTime()
            : new Date().getTime();
        return (
          acc + Math.abs(closedDate - reportedDate) / (1000 * 60 * 60 * 24)
        );
      }, 0);
      const averageTAT = totalTAT / departmentCases.length;
      averageTATs.push(averageTAT);
    });
    return averageTATs;
  }

  prepareFraudCasesData(): void {
    const flattenedData: any[] = [];
    console.log(this.cases[0]);

    // Iterate through each employee object in the 'employee' array
    this.cases.forEach((caseDetail) => {
      caseDetail.employeeInvolved.forEach((employee) => {
        flattenedData.push({ ...caseDetail, empNo: employee.code });
      });
    });
    const caseCountsByEmployee = flattenedData.reduce(
      (acc: { [key: string]: number }, { empNo }) => {
        acc[empNo] = (acc[empNo] || 0) + 1;
        return acc;
      },
      {}
    );

    const labels = [];
    const data = [];
    for (const [empNo, count] of Object.entries(caseCountsByEmployee)) {
      if (count > 1) {
        labels.push(empNo);
        data.push(count);
      }
    }

    this.initFraudCasesChart(labels, data);
  }

  initFraudCasesChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById(
      'fraudCasesCanvas'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Fraud Cases',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
