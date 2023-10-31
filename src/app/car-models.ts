import { Car } from './car.model';

export class SedanCar extends Car {
    type = 'Sedan';
    override individualFields: { title: string, value: string | number }[] = []

    constructor(brand: string, model: string, year: number, SedanindividualFields: { title: string, value: string | number }[]) {
        super();
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.individualFields = SedanindividualFields;
    }
}

export class SUVCar extends Car {
    type = 'SUV';
    override individualFields: { title: string, value: string | number }[] = []

    constructor(brand: string, model: string, year: number,  SedanindividualFields: { title: string, value: string | number }[]) {
        super();
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.individualFields = SedanindividualFields;
    }
}

export class SportsCar extends Car {
    type = 'Sports';
    override individualFields: { title: string, value: string | number }[] = []
    
    constructor(brand: string, model: string, year: number,  SedanindividualFields: { title: string, value: string | number }[]) {
        super();
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.individualFields = SedanindividualFields;
    }
}