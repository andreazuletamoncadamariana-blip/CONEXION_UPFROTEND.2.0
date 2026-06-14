import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent] // Al ser standalone, se importa aquí
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el título correcto', () => {
    expect(component.title).toEqual('Uniremington Al Parque');
  });

  it('debería mostrar una alerta de error si el email es inválido en onSubscribe', () => {
    spyOn(window, 'alert');
    component.onSubscribe('email-invalido');
    expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un correo electrónico válido.');
  });

  it('debería mostrar una alerta de éxito si el email es válido en onSubscribe', () => {
    spyOn(window, 'alert');
    const testEmail = 'test@uniremington.edu.co';
    component.onSubscribe(testEmail);
    expect(window.alert).toHaveBeenCalledWith(`¡Gracias! Hemos registrado el correo: ${testEmail}`);
  });

  it('debería tener 4 elementos en el arreglo de estadísticas', () => {
    expect(component.stats.length).toBe(4);
  });
});
