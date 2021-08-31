import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as roomsActions from '../actions/rooms';
import { of } from 'rxjs'; //crea observable
import { stopLoading } from '../actions/ui/ui.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { RoomsService } from 'src/app/private/services/rooms.service';

@Injectable()
export class RoomsEffects {
  constructor(
    private actions$: Actions,
    private roomsService: RoomsService,
    private store: Store<AppState>
  ) {}

  //   callLoadRoomsSuccess(resp: { ok: boolean; rooms: Room[] }) {
  //     return roomsActions.loadRoomsSuccess({
  //       rooms: resp.rooms,
  //     });
  //   }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roomsActions.loadRooms), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.roomsService.getRooms().pipe(
          map((resp) => roomsActions.loadRoomsSuccess({ rooms: resp.rooms })),
          catchError((error) => {
            console.log('error');
            this.store.dispatch(stopLoading());
            return of(roomsActions.roomsError({ payload: error }));
          })
        )
      )
    )
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  loadRoomsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(roomsActions.loadRoomsSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );
}
