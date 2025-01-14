import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraAbasComponent } from './barra-abas.component';

describe('BarraAbasComponent', () => {
  let component: BarraAbasComponent;
  let fixture: ComponentFixture<BarraAbasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraAbasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraAbasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
