import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudJornadaComponent } from './solicitud-jornada.component';

describe('SolicitudJornadaComponent', () => {
  let component: SolicitudJornadaComponent;
  let fixture: ComponentFixture<SolicitudJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudJornadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
