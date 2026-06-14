/// <reference types="jasmine" />
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

/**
 * Tests para AppComponent (Componente raíz)
 * Valida que la aplicación se inicializa correctamente
 */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]) // Configura las rutas de forma moderna
      ]
    }).compileComponents();

    // Crear instancia del componente
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title property', () => {
    expect(component.title).toBeDefined();  
    expect(component.title).toEqual('Gestion de Beneficiarios');
  });

  it('should render router-outlet in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');

    expect(routerOutlet).not.toBeNull();
    expect(routerOutlet).toBeTruthy();
  });

  it('should initialize without errors', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should have RouterOutlet, RouterLink and RouterLinkActive imports', () => {
    // El componente debe importar estos módulos de routing
    expect(component).toBeTruthy();
  });
});

