import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigadaJuridicaComponent } from './brigada-juridica.component';

describe('BrigadaJuridicaComponent', () => {
  let component: BrigadaJuridicaComponent;
  let fixture: ComponentFixture<BrigadaJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigadaJuridicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrigadaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
