import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingCounterComponent } from './ring-counter.component';

describe('RingCounterComponent', () => {
  let component: RingCounterComponent;
  let fixture: ComponentFixture<RingCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
