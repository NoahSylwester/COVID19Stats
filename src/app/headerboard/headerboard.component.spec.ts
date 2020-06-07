import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderboardComponent } from './headerboard.component';

describe('HeaderboardComponent', () => {
  let component: HeaderboardComponent;
  let fixture: ComponentFixture<HeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
