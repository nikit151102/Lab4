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

  individualFields: { title: string, value: string | number }[] = []
  carForm: FormGroup;

  isEdit: boolean = false;
  valueToEdit: any = [];
  memoryLocationValueToEdit: string = '';

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
      const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
      const sedanCar = new SedanCar(
        memoryLocation,
        this.carForm.value.brand,
        this.carForm.value.model,
        this.carForm.value.year,
        sedanFields
      );
      this.carFactoryService.registerCar('sedan', sedanCar);
      this.carFactoryService.addCreatedCar('sedan', sedanCar);

      this.carForm.reset();
      const individualFieldsFormArray = this.carForm.get('individualFields') as FormArray;
      individualFieldsFormArray.clear();

    }

  }

  removeIndividualField(index: number) {
    const individualFields = this.carForm.get('individualFields') as FormArray;
    individualFields.removeAt(index);
  }

  cloneCars(type: string): void {
    this.carFactoryService.addClonedCars(type);
  }


  getClonedCars(type: string): { car: Car }[] {
    return this.carFactoryService.getClonedCars(type);
  }

  editcar(car: any) {
    this.isEdit = true
    this.valueToEdit = car;
    this.memoryLocationValueToEdit = car.memoryLocation;

    this.carForm.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year
    });

    if (Array.isArray(car.individualFields)) {
      const individualFieldsFormArray = this.carForm.get('individualFields') as FormArray;
      individualFieldsFormArray.clear();

      car.individualFields.forEach((field: { title: string, value: string | number }) => {
        const fieldGroup = this.fb.group({
          title: [field.title, Validators.required],
          value: [field.value, Validators.required]
        });
        individualFieldsFormArray.push(fieldGroup);
      });
    }
  }

  updateCarFromForm() {
    const updatedCarData = this.carForm.value;
    const memoryLocation = this.memoryLocationValueToEdit;
    this.carForm.reset();
    this.isEdit = false;
    const individualFieldsFormArray = this.carForm.get('individualFields') as FormArray;
    individualFieldsFormArray.clear();
    this.carFactoryService.updateCar(updatedCarData, memoryLocation, 'sedan');
  }

  ClearCreated(type: string) {
    this.carFactoryService.clearCreated(type)
  }
  ClearCloned(type: string) {
    this.carFactoryService.clearCloned(type)
  }
  ClearAll(type: string) {
    this.carFactoryService.clearAll(type)
  }

  MemoryCheck: string = '';

  memoryCheck() {
    const clonedCars = this.carFactoryService.getClonedCars('sedan');
    const clonedCar = this.carFactoryService.getCreatedCars('sedan');
    if (clonedCars === clonedCar) {
      console.log("true")
      this.MemoryCheck = 'true'
    } else {
      console.log("false")
      this.MemoryCheck = 'false'
    }
  }
  ClearMemoryCheck(){
    this.MemoryCheck = ''
  }
}
