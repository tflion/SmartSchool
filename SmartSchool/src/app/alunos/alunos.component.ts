import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public modalRef: BsModalRef;
  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno;
  public simpleText: string;
  
  public alunos = [
    { id: 1, nome: 'Marta', sobrenome:'Pereira', telefone: 1236547},   
    { id: 2, nome: 'Paula', sobrenome:'Gabriela', telefone: 1255344},     
    { id: 3, nome: 'Laura', sobrenome:'Alves', telefone: 1239876},    
    { id: 4, nome: 'Luiza', sobrenome:'Rodrigues', telefone: 1234588},   
    { id: 5, nome: 'Lucas', sobrenome:'Souza', telefone: 1334593},  
    { id: 6, nome: 'Pedro', sobrenome:'Bernadetti', telefone: 9875334},    
    { id: 7, nome: 'Paulo', sobrenome:'Leão', telefone: 1256787},
  ]

  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
      private modalService: BsModalService) { 
    this.criarForm();
  }

  ngOnInit(): void {
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit(){
    console.log(this.alunoForm.value);
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar(){
    this.alunoSelecionado = null;
  }
 
}