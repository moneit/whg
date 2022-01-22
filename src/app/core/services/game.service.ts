import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';
import { Game } from "@shared/interfaces/game.interface";
import { Jackpot } from "@shared/interfaces/jackpot.interface";

@Injectable({providedIn: 'root'})
export class GameService extends ApiService {
  constructor(
    protected toastService: ToastrService,
    protected http: HttpClient,
    protected spinner: NgxSpinnerService,
  ) {
    super(http, spinner, toastService);
  }

  public getAllGames(): Observable<Game[]> {
    return this.get<any>('http://stage.whgstage.com/front-end-test/games.php', undefined, true)
      .pipe(map((res: Game[]) => res))
  }

  public getJackpots(): Observable<Jackpot[]> {
    return this.get<any>('http://stage.whgstage.com/front-end-test/jackpots.php')
      .pipe(map((res: Jackpot[]) => res));
  }
}
