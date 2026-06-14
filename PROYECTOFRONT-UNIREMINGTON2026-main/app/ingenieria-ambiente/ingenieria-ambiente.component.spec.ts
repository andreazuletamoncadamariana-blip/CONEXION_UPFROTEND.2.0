import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenieriaAmbienteComponent } from './ingenieria-ambiente.component';

describe('IngenieriaAmbienteComponent', () => {
  let component: IngenieriaAmbienteComponent;
  let fixture: ComponentFixture<IngenieriaAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngenieriaAmbienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngenieriaAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
