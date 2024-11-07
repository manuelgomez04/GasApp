import { Component, OnInit } from '@angular/core';
import { GasService } from '../../services/gas.service';
import { Gasolinera } from '../../models/gas-item.dto';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrl: './gas-list.component.css'
})
export class GasListComponent implements OnInit {
  constructor(private gasService: GasService) {}
  listadoGasolineras: Gasolinera[] = [];

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
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }
  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      const gasolineraConNombresGuenos: any = {};

      // Recorro los nombres de los atributo de la
      // gasolineraChusquera que están mal escritos
      /*Object.keys(gasolineraChusquera).forEach((key) => {
        // En la variable key tengo el nombre de la
        // propiedad que estoy recorriendo
        if (key === 'C.P.') {
          gasolineraConNombresGuenos['postalCode'] = gasolineraChusquera[key];
        }
      });
      */
      let gasolinera
       = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        gasolineraChusquera['Precio Gasolina 95 E5'],
        gasolineraChusquera['Precio Gasoleo A'],
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Horario'],
        gasolineraChusquera['Precio Gasoleo Premium'],
        gasolineraChusquera['Precio Gasolina 98 E5'],
        gasolineraChusquera['IDCCAA'],
        gasolineraChusquera['IDMunicipio']
      );

      newArray.push(gasolinera);
    });
    return newArray;
  }
}
