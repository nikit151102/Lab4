export class Car {
    brand: string = '';
    model: string = '';
    year: number = 0;
    individualFields: { title: string, value: string | number }[] = []

    clone(): Car {
        const clonedCar = new Car();
        clonedCar.brand = this.brand;
        clonedCar.model = this.model;
        clonedCar.year = this.year;
        clonedCar.individualFields = [...this.individualFields]; 
        return clonedCar;
    }
}
