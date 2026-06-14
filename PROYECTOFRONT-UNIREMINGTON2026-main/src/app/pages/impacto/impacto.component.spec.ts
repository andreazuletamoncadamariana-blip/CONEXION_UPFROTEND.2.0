import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactoComponent } from './impacto.component';

describe('ImpactoComponent', () => {
  let component: ImpactoComponent;
  let fixture: ComponentFixture<ImpactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
