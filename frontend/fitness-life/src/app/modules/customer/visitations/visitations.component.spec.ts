import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitationsComponent } from './visitations.component';

describe('VisitationsComponent', () => {
  let component: VisitationsComponent;
  let fixture: ComponentFixture<VisitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
