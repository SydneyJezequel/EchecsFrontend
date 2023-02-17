import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampBlancComponent } from './camp-blanc.component';

describe('CampBlancComponent', () => {
  let component: CampBlancComponent;
  let fixture: ComponentFixture<CampBlancComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampBlancComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampBlancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
