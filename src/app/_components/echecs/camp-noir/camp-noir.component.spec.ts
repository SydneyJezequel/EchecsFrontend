import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampNoirComponent } from './camp-noir.component';

describe('CampNoirComponent', () => {
  let component: CampNoirComponent;
  let fixture: ComponentFixture<CampNoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampNoirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampNoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
