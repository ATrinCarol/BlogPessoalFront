import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit { 

  usuario: Usuario = new Usuario()
  confirmSenha: string
  tipoUsuaria: string


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmarSenha(event: any){
    this.confirmSenha = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuaria

    if (this.usuario.senha != this.confirmSenha){
      alert('As senhas não coincidem. Digite corretamente!')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
            this.usuario = resp
            this.router.navigate(['/entrar'])
            alert ('Cadastro realizado com sucesso!')
          })
    }
  } 

  tipoUsuario(event: any){
    this.tipoUsuaria = event.target.value
  }

}
