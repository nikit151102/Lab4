export class Car {
    memoryLocation: string = '';
    brand: string = '';
    model: string = '';
    year: number = 0;
    individualFields: { title: string, value: string | number }[] = []

    clone(): Car {
        const clonedCar = new Car();
        clonedCar.memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
        clonedCar.brand = this.brand;
        clonedCar.model = this.model;
        clonedCar.year = this.year;
        clonedCar.individualFields = [...this.individualFields]; 
        return clonedCar;
    }
}
