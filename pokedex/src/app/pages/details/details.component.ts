import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlPokemonName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;

  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private pokeService: PokeApiService) { }

  ngOnInit() {
    this.getPokemon();
  }


  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const pokemonName = this.pokeService.apiGetPokemon(`${this.urlPokemonName}/${id}`);

    return forkJoin([pokemon, pokemonName]).subscribe(
      res => {
        console.log("teste do forkjoin ->>", res);

        this.pokemon = res;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }

}
