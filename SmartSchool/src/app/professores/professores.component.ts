import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  titulo = "Professores";
  public professorSelecionado: Professor;
  public professorForm: FormGroup;
  public modalRef: BsModalRef;

  public professores = [
    { id: 1,nome: 'Heitor',disciplina: 'Matemática'   },
    { id: 2,nome: 'Vinícius',disciplina: 'Português' },
    { id: 3,nome: 'Cléber',disciplina: 'Física'    },
    { id: 4,nome: 'Mara',disciplina: 'Geografia'      },
    { id: 5,nome: 'Solange',disciplina: 'História'   },
    
  ]
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
  }

  criarForm(){
    this.professorForm = this.fb.group ({
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  professorSubmit(){
    console.log(this.professorForm.value);
  }

  voltar(){
    this.professorSelecionado = null;
  }
  
  

}
