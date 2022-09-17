import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
})
export class SimulationComponent implements OnInit {
  consumptionGrams: number = 3000;
  period: number = 1;
  feedPrice: number = 2.3;
  numberAnimals: number = 100;
  moneyLost: any[] = []
  westLost:any[] = []
  delayInMs: number = 1000
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [] ,
        label: 'Dinheiro perdido',
        backgroundColor: 'rgba(255,0,0,0.1)',
        borderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#999',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,0,0,1)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartDataWest: ChartConfiguration['data'] = {
    datasets: [
      
      {
        data: [],
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
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    animation: {
      duration: 0
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

  manualFlow: Array<{
    wastingWhenTreating: number,
    wastingTooMuchRation: number,
    wastingUneatenRation: number,
    wastingRationByTheAnimal: number,
    wasteTotalMonth: number,
    totalAccumulatedWaste: number,
    moneyLostMonthly: number,
    totalAccumulatedLostMoney: number,
    consumedRationAccumulatedMonth: number,
    consumedRationAccumulated: number,
    wastingOfRationTrolley: number,
  }> = [];

  constructor(private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.consumptionGrams = params['consumptionGrams'];
      this.period = params['period'];
      this.feedPrice = params['feedPrice'];
      this.numberAnimals = params['numberAnimals'];
    });
  
  }

  ngOnInit(): void {
    this.controlTimeSimulation();
  }

  async controlTimeSimulation(): Promise<void> {
    const time = this.period * 12;

    for (let i = 0; i < time; i++) {
      this.manualFlowCalculation();
      await this.delay(this.delayInMs);
    }
  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  manualFlowCalculation(): void {
    let wastingWhenTreating = 0;
    let wastingTooMuchRation = 0;
    let wastingUneatenRation = 0;
    let wastingRationByTheAnimal = 0;
    let wasteTotalMonth = 0;

    let wastingOfRationTrolley = this.wastingOfRationTrolley();

    for (let i = 0; i < 30; i++) {
      let consumptionAccumulatedGrams = this.consumptionGrams;
      let firstWaste = this.wastingWhenTreating(consumptionAccumulatedGrams);
      consumptionAccumulatedGrams = consumptionAccumulatedGrams - (firstWaste / this.numberAnimals);
      wastingWhenTreating = wastingWhenTreating + firstWaste;
      

      let secondWaste = this.wastingTooMuchRation(consumptionAccumulatedGrams);
      consumptionAccumulatedGrams = consumptionAccumulatedGrams - (secondWaste / this.numberAnimals);
      wastingTooMuchRation = wastingTooMuchRation + secondWaste;
      
      let thirdWaste = this.wastingUneatenRation(consumptionAccumulatedGrams);
      consumptionAccumulatedGrams = consumptionAccumulatedGrams - (thirdWaste / this.numberAnimals);
      wastingUneatenRation = wastingUneatenRation + thirdWaste;
      
      let fourthWaste = this.wastingRationByTheAnimal(consumptionAccumulatedGrams);
      consumptionAccumulatedGrams = consumptionAccumulatedGrams - (fourthWaste / this.numberAnimals);
      wastingRationByTheAnimal = wastingRationByTheAnimal + fourthWaste;
    }

    wasteTotalMonth = wastingWhenTreating + wastingTooMuchRation + wastingUneatenRation + wastingRationByTheAnimal + wastingOfRationTrolley;
    console.log(wasteTotalMonth / 1000)
    this.manualFlow.push({
      wastingWhenTreating: wastingWhenTreating,
      wastingTooMuchRation: wastingTooMuchRation,
      wastingUneatenRation: wastingUneatenRation,
      wastingRationByTheAnimal: wastingRationByTheAnimal,
      wasteTotalMonth: wasteTotalMonth,
      wastingOfRationTrolley: wastingOfRationTrolley,
      totalAccumulatedWaste: this.manualFlow.length == 0 ?  wasteTotalMonth : (this.manualFlow[this.manualFlow.length - 1].totalAccumulatedWaste + wasteTotalMonth),
      moneyLostMonthly: (wasteTotalMonth / 1000) * this.feedPrice,
      totalAccumulatedLostMoney: this.manualFlow.length == 0 ?  ((wasteTotalMonth / 1000) * this.feedPrice) : (this.manualFlow[this.manualFlow.length - 1].totalAccumulatedLostMoney + ((wasteTotalMonth / 1000) * this.feedPrice)),
      consumedRationAccumulatedMonth: (this.consumptionGrams * this.numberAnimals) * 30,
      consumedRationAccumulated: this.manualFlow.length == 0 ?  ((this.consumptionGrams * this.numberAnimals) * 30) : (this.manualFlow[this.manualFlow.length - 1].consumedRationAccumulated + ((this.consumptionGrams * this.numberAnimals) * 30)),
    })
    this.moneyLost.push(this.manualFlow[this.manualFlow.length -1].totalAccumulatedLostMoney)
    this.westLost.push(this.manualFlow[this.manualFlow.length -1].totalAccumulatedWaste)
    this.lineChartData = {
      datasets: [
        {
          data: this.moneyLost ,
          label: 'Dinheiro perdido em R$',
          backgroundColor: 'rgba(255,0,0,0.1)',
          borderColor: 'rgba(255,0,0,1)',
          pointBackgroundColor: '#999',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,0,0,1)',
          fill: 'origin',
        },        
      ],
      labels: this.moneyLost.map((item, index)=> index+1),
    };

    this.lineChartDataWest = {
      datasets: [

        {
          data: this.westLost ,
          label: 'Ração perdida em kg',
          backgroundColor: 'rgba(0,0,255,0.1)',
          borderColor: 'rgba(0,0,255,1)',
          pointBackgroundColor: '#999',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,0,255,1)',
          fill: 'origin',
        },
        
      ],
      labels: this.westLost.map((item, index)=> index+1),
    };

    
  }

  wastingOfRationTrolley(): number {
    return ((this.generateRandomWaste() * (this.consumptionGrams * this.numberAnimals)) * 7);
  }

  wastingWhenTreating(value: number): number {
    return ((this.generateRandomWaste() * (value * this.numberAnimals)));
  }

  wastingTooMuchRation(value: number): number {
    return ((this.generateRandomWaste() * (value * this.numberAnimals)));
  }

  wastingUneatenRation(value: number): number {
    return ((this.generateRandomWaste() * (value * this.numberAnimals)));
  }

  wastingRationByTheAnimal(value: number): number {
    return ((this.generateRandomWaste() * (value * this.numberAnimals)));
  }

  // getLessRation(): number {
  //   return ((this.generateRandomWaste() * (this.consumptionGrams * this.numberAnimals)));
  // }

  generateRandomWaste(): number {
    const randomWastePercentage = (Math.random() * (0.06 - 0.001) + 0.001);
    return parseFloat(randomWastePercentage.toFixed(3));
  }

  onClickOnButton(){
    this.delayInMs =10000000000000
    console.log(this.delayInMs)
  }

}
