import {Component, OnInit, Input} from '@angular/core';

import {Game} from "@shared/interfaces/game.interface";
import {Category} from "@shared/enums/category.enum";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game: Game | undefined;
  @Input() activeCategory: Category | undefined;

  newRibbon = false;
  topRibbon = false;

  constructor() { }

  ngOnInit(): void {
    if (this.game?.categories?.includes(Category.New) && this.activeCategory !== Category.New) {
       this.newRibbon = true;
    }

    if (this.game?.categories?.includes(Category.Top) && this.activeCategory !== Category.Top) {
      this.topRibbon = true;
    }
  }
}
