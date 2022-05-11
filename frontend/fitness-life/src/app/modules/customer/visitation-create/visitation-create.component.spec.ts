import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitationCreateComponent } from './visitation-create.component';

describe('VisitationCreateComponent', () => {
  let component: VisitationCreateComponent;
  let fixture: ComponentFixture<VisitationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
