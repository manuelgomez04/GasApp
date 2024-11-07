import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { GasService } from '../../services/gas.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent  {


  @Output() searchClicked = new EventEmitter<{ fuelType: string, valueMin: number, valueMax: number }>();

  valueMin: number = 0;
  valueMax: number = 3;
  selectedFuelType: string = '';


  filterByPrice() {
    if (this.selectedFuelType && this.valueMin !== null && this.valueMax !== null) {
      this.searchClicked.emit({ fuelType: this.selectedFuelType, valueMin: this.valueMin, valueMax: this.valueMax });
    } else {
      alert('Por favor, selecciona un tipo de gasolina y un rango de precios.');
    }
  }

} 
