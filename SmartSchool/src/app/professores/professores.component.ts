import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/professor';
import { ProfessorService } from './professor.service';

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
  public modo = 'post';

  public professores: Professor[];
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private ProfessorService: ProfessorService) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarProfessores();
  }

  criarForm(){
    this.professorForm = this.fb.group ({
      id: [''],
      nome: ['', Validators.required],
      // disciplina: ['', Validators.required]
    })
  }
 

  carregarProfessores(){
    this.ProfessorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  salvarProfessor(professor: Professor){
    (professor.id === 0) ? this.modo = 'post' : this.modo = 'put';

    this.ProfessorService[this.modo](professor).subscribe(
      (retorno: Professor) => {
        console.log(retorno);
        this.carregarProfessores();
      },
      (erro:any) => {
        console.log(erro);
      }
    );
  }

  professorSubmit(){
    this.salvarProfessor(this.professorForm.value);
  }

  professorNovo(){
    this.professorSelecionado = new Professor;
    this.professorForm.patchValue(this.professorSelecionado);
  }

  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar(){
    this.professorSelecionado = null;
  }
  
  

}
