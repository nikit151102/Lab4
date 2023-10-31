import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarFactoryService } from 'src/app/car-factory.service';
import { SportsCar } from 'src/app/car-models';
import { Car } from 'src/app/car.model';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent {

brand: string = "";
model: string = "";
year: number = 0;

individualFields: { title: string, value: string | number }[] = []
FormSports: FormGroup;
constructor(public carFactoryService: CarFactoryService, private fb: FormBuilder) {
  this.FormSports = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [0, Validators.required],
    individualFields: this.fb.array([]),
  });
}

get individualFieldsControls() {
  return (this.FormSports.get('individualFields') as FormArray).controls;
}

addIndividualField() {
  const individualFields = this.FormSports.get('individualFields') as FormArray;
  individualFields.push(this.fb.group({
    title: ['', Validators.required],
    value: ['', Validators.required]
  }));
}

onSubmit() {
  if (this.FormSports.valid) {
    const sedanFields = this.FormSports.value.individualFields;
    const sedanCar = new SportsCar(
      this.FormSports.value.brand,
      this.FormSports.value.model,
      this.FormSports.value.year,
      sedanFields
    );
    this.carFactoryService.registerCar('Sports', sedanCar);
    this.carFactoryService.addCreatedCar('Sports', sedanCar);
  }
}

removeIndividualField(index: number) {
  const individualFields = this.FormSports.get('individualFields') as FormArray;
  individualFields.removeAt(index);
}

sedanNew: any
sedans: any[] = [];

cloneCars(type: string): void {
  const clonedCar = this.carFactoryService.getCar(type);
  this.carFactoryService.addClonedCars(type, clonedCar);
  console.log("clonedCar",clonedCar)
  if (this.sedanNew === clonedCar) {
    console.log("true")
  } else {
    console.log("false")
  }
}


getClonedCars(type: string): { car: Car}[] {
  return this.carFactoryService.getClonedCars(type);
}

}