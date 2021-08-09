import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExectimeComponent } from './exectime.component';

describe('ExectimeComponent', () => {
  let component: ExectimeComponent;
  let fixture: ComponentFixture<ExectimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExectimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExectimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
