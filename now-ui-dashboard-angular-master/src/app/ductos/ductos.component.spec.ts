import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuctosComponent } from './ductos.component';

describe('DuctosComponent', () => {
  let component: DuctosComponent;
  let fixture: ComponentFixture<DuctosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuctosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuctosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
