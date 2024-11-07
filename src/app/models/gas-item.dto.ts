export class Gasolinera {
  constructor(
    public id: number,
    public nombre: string,
    public price95: number,
    public priceDiesel: number,
    public postalCode: string,
    public address: string,
    public schedule: string,
    public priceGasoleoPremium: number,
    public price98: number,
    public comunidad: string,
    public provincia: string
  ) { }
}