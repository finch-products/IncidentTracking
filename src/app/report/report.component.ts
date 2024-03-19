import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartData, ChartConfiguration, ChartOptions } from 'chart.js';
import { Case } from '../model/dashboard.model';
import { cases } from '../mock-data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  cases: Case[] = [];

  employees: { empNo: string; name: string }[] = [];
  searchForm: FormGroup;
  deptsearchForm: FormGroup;
  statusSearchForm: FormGroup;
  casesOverTimeChart: Chart | null = null;
  casesByStatusChart: Chart | null = null;

  ngOnInit(): void {
    this.cases = cases;
    this.initTATByDepartmentChart();
    this.prepareFraudCasesData();
    this.initCasesByAgeChart();
  }
  constructor() {
    const today = new Date();
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    this.searchForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
    this.deptsearchForm = new FormGroup({
      deptStartDate: new FormControl(''),
      deptEndDate: new FormControl(''),
    });
    this.statusSearchForm = new FormGroup({
      statusStartDate: new FormControl(''),
      statusEndDate: new FormControl(''),
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
    console.log('filterData called');
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
      const reportedDate = new Date(c.reportedDate);
      return reportedDate >= startDate && reportedDate <= endDate;
    });
    this.initCasesOverTimeChart(filteredCases, startDate, endDate);
  }

  aggregateMonthlyCaseCounts(
    cases: any[],
    startDate: Date,
    endDate: Date
  ): number[] {
    console.log('aggregateMonthlyCaseCounts function called');
    const monthlyCounts = Array(12).fill(0);

    cases.forEach((c) => {
      const reportedDate = new Date(c.reportedDate);
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

    const filteredCases = this.filterCasesByDate(startDate, endDate);

    const casesByDepartment = this.aggregateCasesByDepartment(filteredCases);

    const data: ChartData = {
      labels: Object.keys(casesByDepartment),
      datasets: [
        {
          label: 'Cases by Department',
          data: Object.values(casesByDepartment),
          backgroundColor: [],
          borderWidth: 1,
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
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: options,
    };

    new Chart(ctx, config);
  }

  filterDeptData(): void {
    const startDate = new Date(this.deptsearchForm.get('deptStartDate')!.value);
    const endDate = new Date(this.deptsearchForm.get('deptEndDate')!.value);

    console.log(startDate, endDate);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      this.initCasesByDepartmentChart(startDate, endDate);
    } else {
      console.error('Invalid date range');
    }
  }

  private filterCasesByDate(startDate: Date, endDate: Date): any[] {
    return this.cases.filter((c) => {
      const reportedDate = new Date(c.reportedDate);
      return reportedDate >= startDate && reportedDate <= endDate;
    });
  }

  private aggregateCasesByDepartment(cases: any[]): { [key: string]: number } {
    return cases.reduce((acc: { [key: string]: number }, curr: any) => {
      acc[curr.department] = (acc[curr.department] || 0) + 1;
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

  filterStatusData(): void {
    const startDate = new Date(
      this.statusSearchForm.get('statusStartDate')!.value
    );
    const endDate = new Date(this.statusSearchForm.get('statusEndDate')!.value);

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      startDate > endDate
    ) {
      console.error('Invalid date range');
      return;
    }

    const filteredCases = this.cases.filter((c) => {
      const reportedDate = new Date(c.reportedDate);
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
      .map((caseItem) => caseItem.department)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  calculateAverageTATs(departments: string[]): number[] {
    const averageTATs: number[] = [];
    departments.forEach((department) => {
      const departmentCases = this.cases.filter(
        (caseItem) => caseItem.department === department
      );
      const totalTAT = departmentCases.reduce((acc, curr) => {
        const reportedDate = new Date(curr.reportedDate).getTime();
        const closedDate =
          curr.status === 'closed'
            ? new Date(curr.closedDate).getTime()
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
    const caseCountsByEmployee = this.cases.reduce(
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

  initCasesByAgeChart(): void {
    const ageGroups = ['0-30', '31-60', '61-90', '91-120', '121+'];
    const ageGroupCounts = ageGroups.map(() => 0);

    const currentDate = new Date();

    this.cases.forEach((caseItem) => {
      const reportedDate = new Date(caseItem.reportedDate);
      const ageInDays = Math.floor(
        (currentDate.getTime() - reportedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (ageInDays <= 30) ageGroupCounts[0]++;
      else if (ageInDays <= 60) ageGroupCounts[1]++;
      else if (ageInDays <= 90) ageGroupCounts[2]++;
      else if (ageInDays <= 120) ageGroupCounts[3]++;
      else ageGroupCounts[4]++;
    });
    const canvasElement = document.getElementById('casesByAgeCanvas');
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      console.error('Canvas element not found or is not a canvas element');
      return;
    }
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
      console.error('Unable to get canvas context');
      return;
    }
    if (!ctx) {
      console.error('Canvas context not supported');
      return;
    }
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ageGroups,
        datasets: [
          {
            label: 'Cases by Age (days)',
            data: ageGroupCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
