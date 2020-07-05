import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosNuevoComponent } from './usuarios-nuevo.component';

describe('UsuariosNuevoComponent', () => {
  let component: UsuariosNuevoComponent;
  let fixture: ComponentFixture<UsuariosNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
