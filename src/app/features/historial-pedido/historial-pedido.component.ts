import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { HistorialPedidoDTO } from '../../dto/HistorialPedidoDTO';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './historial-pedido.component.html',
  styleUrls: ['./historial-pedido.component.css'],
})
export class HistorialPedidosComponent implements OnInit {

  historial: HistorialPedidoDTO[] = [];

  private pedidoService = inject(PedidoService);

  ngOnInit(): void {
    this.pedidoService.obtenerHistorialCliente().subscribe({
      next: (data: HistorialPedidoDTO[]) => {
        this.historial = data;
      },
      error: (err) => {
        console.error('Error cargando historial:', err);
      },
    });
  }
}
