import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarFactoryService } from 'src/app/car-factory.service';
import { SedanCar } from 'src/app/car-models';
import { Car } from 'src/app/car.model';

@Component({
  selector: 'app-sedan',
  templateUrl: './sedan.component.html',
  styleUrls: ['./sedan.component.css']
})
export class SedanComponent {
  brand: string = "";
  model: string = "";
  year: number = 0;

  individualFields: { title: string, value: string | number }[] = []
  carForm: FormGroup;
  constructor(public carFactoryService: CarFactoryService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [0, Validators.required],
      individualFields: this.fb.array([]),
    });
  }

  get individualFieldsControls() {
    return (this.carForm.get('individualFields') as FormArray).controls;
  }

  addIndividualField() {
    const individualFields = this.carForm.get('individualFields') as FormArray;
    individualFields.push(this.fb.group({
      title: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  onSubmit() {
    if (this.carForm.valid) {
      const sedanFields = this.carForm.value.individualFields;
      const sedanCar = new SedanCar(
        this.carForm.value.brand,
        this.carForm.value.model,
        this.carForm.value.year,
        sedanFields
      );
      this.carFactoryService.registerCar('sedan', sedanCar);
      this.carFactoryService.addCreatedCar('sedan', sedanCar);
    }
  }

  removeIndividualField(index: number) {
    const individualFields = this.carForm.get('individualFields') as FormArray;
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
