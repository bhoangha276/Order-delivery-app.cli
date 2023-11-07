import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFoodComponent } from './table-food.component';

describe('TableFoodComponent', () => {
  let component: TableFoodComponent;
  let fixture: ComponentFixture<TableFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFoodComponent]
    });
    fixture = TestBed.createComponent(TableFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
