import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
})
export class SimulationComponent implements OnInit {
  dinheiroPerdido: number = 0;
  quantidadeAnimais: number = 1000;
  consumoPorAnimal = 3000;
  periodo: number = 30; //anos
  precoRacao: number = 2;
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
      this.calculoMes(this.consumoPorAnimal);      
      await this.delay(1000);
      
    }

  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  calculoMes(n:number): number {
    let valorTotal = n;

    for(let i=0; i<30; i++){

      let desperdico1 = this.desperdicioAtoTratar();
      
    }
    return 1;
  }

  desperdicioCarrinho(): number {
    return ((this.generateRandom() * (this.consumoPorAnimal * this.quantidadeAnimais)) * 7);
  }

  desperdicioAtoTratar(): number {
    return ((this.generateRandom() * (this.consumoPorAnimal * this.quantidadeAnimais)));
  }

  desperdicioPegarDemaisRacao(): number {
    return 1;
  }

  pegarMenosRacao(): number {
    return 1;
  }

  desperdicioRacaoNaoIngerida(): number {
    return 1;
  }

  desperdicioDoAnimal(): number {
    return 1;
  }

  generateRandom():number {
    const randomico = (Math.random()*(0.01 - 0.001)+0.001);
    return parseFloat(randomico.toFixed(3));
  }

}
