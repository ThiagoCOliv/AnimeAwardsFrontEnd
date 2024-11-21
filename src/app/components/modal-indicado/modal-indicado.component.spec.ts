import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIndicadoComponent } from './modal-indicado.component';

describe('ModalIndicadoComponent', () => {
  let component: ModalIndicadoComponent;
  let fixture: ComponentFixture<ModalIndicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIndicadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIndicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
