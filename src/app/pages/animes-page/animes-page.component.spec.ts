import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesPageComponent } from './animes-page.component';

describe('AnimesPageComponent', () => {
  let component: AnimesPageComponent;
  let fixture: ComponentFixture<AnimesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
