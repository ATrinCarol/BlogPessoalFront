import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  id = environment.id

  postagem: Postagem = new Postagem()
  listPostagem: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listTema: Tema[]
  idTema: number
  descricaoTema: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key: string = 'data'
  reverse: boolean = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService, //estpu deixando como public para poder acessar ele no html
    private alertas: AlertasService,

  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    this.validarFoto()


    if (environment.token == '') {
      this.alertas.showAlertDanger('Sua sessão expirou. Faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.findAllTema()
    this.findAllPostagem()
  }

  validarFoto(){
    if (environment.foto == ''){
      this.foto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    }
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listTema = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByDescricaoTema(){
    if(this.descricaoTema == ''){
      this.findAllTema()
    } else {
      this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp: Tema[]) => {
        this.listTema = resp
      })
    }
  }

  findAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listPostagem = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.findAllPostagem()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listPostagem = resp
      })
    }
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertInfo('Sua postagem foi realizada com sucesso!')
      this.postagem = new Postagem()
      this.findAllPostagem()
    })
  }

}

