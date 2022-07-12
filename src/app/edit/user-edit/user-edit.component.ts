import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmSenha: string
  tipoUsuaria: string



  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      // alert ('Sua sessão expirou. Faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUsuaria = event.target.value
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuaria

    if (this.usuario.senha != this.confirmSenha) {
      alert('As senhas não coincidem. Digite corretamente!')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        alert('Atualização realizada com sucesso!')
      })
    }

  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}
