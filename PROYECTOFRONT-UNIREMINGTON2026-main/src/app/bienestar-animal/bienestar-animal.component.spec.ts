import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienestarAnimalComponent } from './bienestar-animal.component';

describe('BienestarAnimalComponent', () => {
  let component: BienestarAnimalComponent;
  let fixture: ComponentFixture<BienestarAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienestarAnimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BienestarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
