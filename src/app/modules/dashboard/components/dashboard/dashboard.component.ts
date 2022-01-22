import {Component, OnInit} from '@angular/core';

import {tabs} from "./dashboard.constants";
import {Category} from "@shared/enums/category.enum";
import {Tab} from "@shared/interfaces/tab.interface";
import {GameService} from "@app/services/game.service";
import {Game} from "@shared/interfaces/game.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tabs: Tab[] = [];
  activeCategory: Category = Category.Top;
  games: Game[] = [];

  constructor(
    private gameService: GameService
  ) {
    this.tabs = tabs;
  }

  ngOnInit(): void {
    this.getGames();
    this.getJackpots();

    setInterval(() => {
      this.getJackpots();
    }, 3000);
  }

  navigate(category: Category): void {
    this.activeCategory = category;
    this.tabs = tabs.map((tab: Tab) => ( { ...tab, active: tab.category === category } ));
    this.getGames();
    this.getJackpots();
  }

  getGames(): void {
    this.gameService.getAllGames().subscribe((games: Game[]) => {
      if (this.activeCategory === Category.Other) {
        this.games = games.filter((game) =>
          game.categories?.includes('ball')
          || game.categories?.includes('virtual')
          || game.categories?.includes('fun')
        );
      } else if (this.activeCategory === Category.Jackpots) {
        this.games = games;
        this.getJackpots();
      } else {
        this.games = games.filter((game) => game.categories?.includes(this.activeCategory));
      }
    });
  }

  getJackpots(): void {
    this.gameService.getJackpots().subscribe((jackpots) => {
      this.games = this.games
        .map((game) => {
          const exist = jackpots.find((jackpot) => jackpot.game === game.id);
          if (exist) {
            return {
              ...game,
              jackpot: exist.amount,
            }
          }
          return game;
          })
        .filter((game) => {
          if (this.activeCategory === Category.Jackpots) {
            return !!game.jackpot;
          } else {
            return true;
          }
        });
    });
  }
}
