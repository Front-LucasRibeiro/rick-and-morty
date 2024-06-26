import { Component, Input, inject } from '@angular/core';
import { Person } from '../../interfaces/rickandmortyapi';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { personagemActions } from '../../store/actions/personagens.actions';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf,RouterModule], 
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})


export class CardComponent {
  @Input() card: Person | undefined;
  store = inject(Store)

  favoritar() {
    
    if (this.card?.favorito === 'ativo') {
      // remove da listagem de favoritos 
      this.card.favorito = ""
      this.store.dispatch(personagemActions.removerItemFavoritos({ id: this.card!.id }))

    } else {
      // guarda o state global
      this.card!.favorito = "ativo"
      
      const card: Person = {
        id: this.card!.id,
        name: this.card!.name,
        status: this.card!.status,
        species: this.card!.species,
        type: this.card!.type,
        gender: this.card!.gender,
        image: this.card!.image,
        favorito: 'ativo'
      }
      
      // enviando uma action 
      this.store.dispatch(personagemActions.createItemFavoritos({ card }))
    }
  }

}
