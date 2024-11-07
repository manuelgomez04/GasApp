import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GasService } from '../../services/gas.service';
import { Gasolinera } from '../../models/gas-item.dto';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit, OnChanges {
  constructor(private gasService: GasService) { }
  listadoGasolineras: Gasolinera[] = [];
  gasolinerasFiltradas: Gasolinera[] = [];

  @Input() filters: { fuelType: string, valueMin: number, valueMax: number } | null = null;
  @Input() gasolineras: Gasolinera[] = [];

  originalListadoGasolineras: Gasolinera[] = [];
  filteredPostalCodes: Observable<string[]> | undefined;
  postalCodeControl = new FormControl('');


  private loadGasList() {
    this.gasService.getGasList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.originalListadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.listadoGasolineras = [...this.originalListadoGasolineras];
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }
  private _filterPostalCodes(value: string): string[] {
    const filterValue = value.trim();
    const postalCodes = this.originalListadoGasolineras.map(g => g.postalCode);
    return postalCodes.filter(option => option.startsWith(filterValue));
  }


  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      // Transformo la respuesta del API en String (JSON)
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        // Transformo el String en un objeto JSON
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.gasolinerasFiltradas = this.listadoGasolineras;
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });

    this.loadGasList();
    this.filteredPostalCodes = this.postalCodeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPostalCodes(value || ''))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.applyFilters();
    }
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      let gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        this.corregirPrecio(gasolineraChusquera['Precio Gasolina 95 E5']),
        this.corregirPrecio(gasolineraChusquera['Precio Gasoleo A']),
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Horario'],
        this.corregirPrecio(gasolineraChusquera['Precio Gasoleo Premium']),
        this.corregirPrecio(gasolineraChusquera['Precio Gasolina 98 E5']),
        gasolineraChusquera['IDCCAA'],
        gasolineraChusquera['IDMunicipio']
      );
      newArray.push(gasolinera);
    });
    return newArray;
  }

  private corregirPrecio(price: string): number {
    const precioCorregido = parseFloat(price.replace(',', '.'));
    return isNaN(precioCorregido) ? 0 : precioCorregido;
  }
  private applyFilters() {
    this.gasolinerasFiltradas = []; // Crear una lista vacía

    if (this.filters) {
      for (let gasolinera of this.listadoGasolineras) {
        let price = 0;
        switch (this.filters.fuelType) {
          case 'Sin Plomo 95':
            price = gasolinera.price95;
            break;
          case 'Gasoleo':
            price = gasolinera.priceDiesel;
            break;
          case 'Sin Plomo 98':
            price = gasolinera.price98;
            break;
          case 'Gasoleo Premium':
            price = gasolinera.priceGasoleoPremium;
            break;
        }

        if (
          price > 0 && // Excluir gasolineras con precio 0
          price >= this.filters.valueMin &&
          price <= this.filters.valueMax
        ) {
          this.gasolinerasFiltradas.push(gasolinera); // Agregar las gasolineras que correspondan
        }
      }
    } else {
      this.gasolinerasFiltradas = this.listadoGasolineras;
    }
  }



}