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
  periodo: number = 1;
  precoRacao: number = 2.3;
  qtdAnimais: number = 100;

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
  armazenamento: Array<{}> = [{
    consumo: 0,
  }];

  constructor() { }

  ngOnInit(): void {
    this.controlTime();
  }

  async controlTime(): Promise<void> {
    const time = this.periodo * 12;

    for (let i = 0; i < time; i++) {
      this.desperdicioCarrinho();
      this.calculoMes(this.consumoGramas);
      await this.delay(1000);
    }
  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  calculoMes(value: number): number {
    let desperdicioAtoTratar = 0;
    let desperdicioPegarDemaisRacao = 0;
    let desperdicioRacaoNaoIngerida = 0;
    let desperdicioDoAnimal = 0;

    for (let i = 0; i < 30; i++) {
      let desperdico1 = this.desperdicioAtoTratar(value);
      value = value - (desperdico1 / this.qtdAnimais);

      let desperdico2 = this.desperdicioPegarDemaisRacao(value);
      value = value - (desperdico2 / this.qtdAnimais);

      let desperdico3 = this.desperdicioRacaoNaoIngerida(value);
      value = value - (desperdico3 / this.qtdAnimais);

      let desperdico4 = this.desperdicioDoAnimal(value);
      value = value - (desperdico4 / this.qtdAnimais);
    }
    return 1;
  }

  desperdicioCarrinho(): number {
    return ((this.generateRandom() * (this.consumoGramas * this.qtdAnimais)) * 7);
  }

  desperdicioAtoTratar(value: number): number {
    return ((this.generateRandom() * (value * this.qtdAnimais)));
  }

  desperdicioPegarDemaisRacao(value: number): number {
    return ((this.generateRandom() * (value * this.qtdAnimais)));
  }

  desperdicioRacaoNaoIngerida(value: number): number {
    return ((this.generateRandom() * (value * this.qtdAnimais)));
  }

  desperdicioDoAnimal(value: number): number {
    return ((this.generateRandom() * (value * this.qtdAnimais)));
  }

  // pegarMenosRacao(): number {
  //   return ((this.generateRandom() * (this.consumoGramas * this.qtdAnimais)));
  // }

  generateRandom(): number {
    const randomico = (Math.random() * (0.01 - 0.001) + 0.001);
    return parseFloat(randomico.toFixed(3));
  }

}
