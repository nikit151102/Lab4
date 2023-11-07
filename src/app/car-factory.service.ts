import { Injectable } from '@angular/core';
import { Car } from './car.model';

@Injectable({
    providedIn: 'root',
})
export class CarFactoryService {
    private prototypes: { [key: string]: Car } = {};
    private createdCars: { type: string, car: Car }[] = [];

    registerCar(type: string, car: Car): void {
        this.prototypes[type] = car;
    }

    getCar(type: string): Car {
        return this.prototypes[type].clone();
    }

    getCreatedCars(type: string): { type: string, car: Car }[] {
        console.log("createdCars", this.createdCars)
        return this.createdCars.filter(carInfo => carInfo.type === type);
    }

    addCreatedCar(type: string, car: Car): void {
        this.createdCars.push({ type, car });
    }

    private clonedCars: { [key: string]: { car: Car }[] } = {};

    addClonedCars(type: string): void {
        this.clonedCars[type] = [];
        const carsOfType = this.createdCars.filter(carInfo => carInfo.type === type);
        carsOfType.forEach(carInfo => {
            const car = carInfo.car;
            const clonedCar = car.clone();
            clonedCar.memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
            const carObject = { car: clonedCar };
            this.clonedCars[type].push(carObject);
        });
    }


    getClonedCars(type: string): { car: Car }[] {
        return this.clonedCars[type] || [];
    }

    updateCar(updatedCarData: any, memoryLocation: string, type: string): void {
        const clonedCars = this.clonedCars[type];
        const index = clonedCars.findIndex(car => car.car.memoryLocation === memoryLocation);
        if (index !== -1) {
            const updatedCar = clonedCars[index].car;
            updatedCar.brand = updatedCarData.brand;
            updatedCar.model = updatedCarData.model;
            updatedCar.year = updatedCarData.year;
            updatedCar.individualFields = updatedCarData.individualFields;
            clonedCars[index].car = updatedCar;
        }
    }


    clearCreated(type: string){
        this.createdCars = this.createdCars.filter(car => car.type !== type);
    }
    
    clearCloned(type: string){
        this.clonedCars[type] = []
    }
    clearAll(type: string){
        this.createdCars = []
        this.clonedCars[type] = []
    }
}

interface update {
    memoryLocation: string;
    brand: string;
    model: string;
    year: number;
    individualFields: { title: string, value: string | number }[]
}