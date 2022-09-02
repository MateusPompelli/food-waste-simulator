import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
})
export class SimulationComponent implements OnInit {
  consumoGramas: number = 3000;
  periodo: number = 365;
  precoRacao: number = 2.3;
  qtdAnimais: number = 500;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Dinheiro perdido',
        backgroundColor: 'rgba(255,0,0,0.1)',
        borderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#999',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,0,0,1)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Dinheiro investido',
        backgroundColor: 'rgba(0,255,0,0.1)',
        borderColor: 'rgba(0,255,0,1)',
        pointBackgroundColor: '#999',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0,255,0,1)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'right',
      },
    },
  };
  public lineChartType: ChartType = 'line';

  dinheiroPerdido: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.consumoGramas = +params['consumoGramas'];
      this.periodo = +params['periodo'];
      this.precoRacao = +params['precoRacao'];
      this.qtdAnimais = +params['qtdAnimais'];
    });
    console.log(
      this.consumoGramas,
      this.periodo,
      this.precoRacao,
      this.qtdAnimais
    );
  }
  ngOnInit(): void {}

  pauseSimulation() {
    console.log('pause');
  }
  simulation2x() {
    console.log('2x');
  }
}
