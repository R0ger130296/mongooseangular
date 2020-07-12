import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCursosComponent } from './menu-cursos.component';

describe('MenuCursosComponent', () => {
  let component: MenuCursosComponent;
  let fixture: ComponentFixture<MenuCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
