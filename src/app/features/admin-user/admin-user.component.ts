import {Component, OnInit} from '@angular/core';
import {Usuario, UsuarioService} from '../../services/usuario.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit{
  usuarios: Usuario[] = [];
  textoBusqueda: string = '';
  usuariosFiltrados: any[] = [];
  menuVisible: boolean = false;

  obtenerNombreEstado(estado: number): string {
    const estados = ['Inactivo', 'Pendiente', 'En Proceso', 'Activo'];
    return estados[estado] || 'Desconocido';
  }

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
  navigateTo(ruta: string): void {
    this.menuVisible = false;
    this.router.navigate(['/' + ruta]);
  }

  // Método para cargar los usuarios
  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios) => {
        const usuarioLogueado = this.authService.obtenerUsuarioLogueado();
        if (usuarioLogueado) {
          console.log('ID del usuario logueado:', usuarioLogueado.userId);  // Verifica que el ID es correcto
          // Filtrar los usuarios asegurándonos de que el ID no coincida con el usuario logueado
          this.usuariosFiltrados = usuarios.filter(
            (usuario) => usuario.id !== usuarioLogueado.userId  // Usamos 'userId' en lugar de 'id'
          );
        } else {
          this.usuariosFiltrados = usuarios;
        }
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }


  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      // Eliminación optimista: eliminamos el usuario inmediatamente de la lista
      this.usuariosFiltrados = this.usuariosFiltrados.filter(u => u.id !== id);

      // Realizamos la solicitud al backend
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
        },
        error: (err) => {
          // Si hay un error, volvemos a agregar al usuario a la lista y mostramos el error
          console.error('Error al eliminar usuario', err);
          alert('Error al eliminar el usuario');
          this.cargarUsuarios(); // Cargamos de nuevo los usuarios para asegurarnos de que la lista sea correcta
        }
      });
    }
  }
  banearUsuario(id: number): void {
    if (confirm('¿Estás seguro de que quieres banear este usuario?')) {
      this.usuarioService.banearUsuario(id).subscribe({
        next: () => {
          alert('Usuario baneado correctamente');
          this.cargarUsuarios(); // Recargar la lista de usuarios
        },
        error: (err) => {
          console.error('Error al banear usuario', err);
          alert('Error al banear el usuario');
        }
      });
    }
  }


}
