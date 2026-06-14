import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoriaEmpresarialComponent } from './asesoria-empresarial.component';

describe('AsesoriaEmpresarialComponent', () => {
  let component: AsesoriaEmpresarialComponent;
  let fixture: ComponentFixture<AsesoriaEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesoriaEmpresarialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsesoriaEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
