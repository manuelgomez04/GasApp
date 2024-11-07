import { Component } from '@angular/core';
import { Gasolinera } from '../../models/gas-item.dto';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
  filters: { fuelType: string, valueMin: number, valueMax: number } | null = null;
  gasolineras: Gasolinera[] = [];

  onSearchClicked(filters: { fuelType: string, valueMin: number, valueMax: number }) {
    this.filters = filters;
  }
}
