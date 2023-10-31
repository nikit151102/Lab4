import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarFactoryService } from 'src/app/car-factory.service';
import { SUVCar } from 'src/app/car-models';

@Component({
  selector: 'app-suv',
  templateUrl: './suv.component.html',
  styleUrls: ['./suv.component.css']
})
export class SuvComponent {
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
      const sedanCar = new SUVCar(
        this.carForm.value.brand,
        this.carForm.value.model,
        this.carForm.value.year,
        sedanFields
      );
      const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
      this.carFactoryService.registerCar('suv', sedanCar);
      this.carFactoryService.addCreatedCar('suv', sedanCar);
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
}
