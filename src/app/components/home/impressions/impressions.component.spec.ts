import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionsComponent } from './impressions.component';

describe('ImpressionsComponent', () => {
  let component: ImpressionsComponent;
  let fixture: ComponentFixture<ImpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
