import { Injectable } from '@angular/core';
import { Car } from './car.model';

@Injectable({
    providedIn: 'root',
})
export class CarFactoryService {
    private prototypes: { [key: string]: Car } = {};
    private createdCars: { type: string, car: Car}[] = [];

    registerCar(type: string, car: Car): void {
        this.prototypes[type] = car;
    }

    getCar(type: string): Car {
        return this.prototypes[type].clone();
    }

    getCreatedCars(type: string): { type: string, car: Car }[] {
        return this.createdCars.filter(carInfo => carInfo.type === type);
    }

    addCreatedCar(type: string, car: Car ): void {
        this.createdCars.push({ type, car });
    }



    private clonedCars: { [key: string]: { car: Car }[] } = {};

    addClonedCar(type: string, car: Car): void {
        if (!this.clonedCars[type]) {
            this.clonedCars[type] = [];
        }
        this.clonedCars[type].push({ car });
    }

    addClonedCars(type: string, car: Car): void {
        if (!this.clonedCars[type]) {
            this.clonedCars[type] = [];
        }
        let cars = this.createdCars.filter(carInfo => carInfo.type === type);
        this.clonedCars[type] = this.clonedCars[type].concat(cars);
        console.log("this.clonedCars[type]",this.clonedCars[type])
    }
    
    getClonedCars(type: string): { car: Car}[] {
        return this.clonedCars[type] || [];
    }
    
}