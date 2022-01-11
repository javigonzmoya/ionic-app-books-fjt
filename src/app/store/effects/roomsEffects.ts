import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as roomsActions from '../actions';
import { of } from 'rxjs'; //crea observable
import { stopLoading } from '../actions/ui/ui.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { RoomsService } from 'src/app/private/services/rooms.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Injectable()
export class RoomsEffects {
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

  addRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roomsActions.addRoom), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.roomsService.addRoom(action.room).pipe(
          map((resp) => roomsActions.addRoomSuccess({ room: resp.room })),
          catchError((error) => {
            console.log('error');
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            this.store.dispatch(stopLoading());
            return of(roomsActions.roomsError({ payload: error }));
          })
        )
      )
    )
  );

  addRoomSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(roomsActions.addRoomSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );

  editRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roomsActions.editRoom), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.roomsService.editRoom(action.id, action.room).pipe(
          map((resp) =>
            roomsActions.editRoomSuccess({ id: action.id, room: action.room })
          ),
          catchError((error) => {
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            this.store.dispatch(stopLoading());
            return of(roomsActions.roomsError({ payload: error }));
          })
        )
      )
    )
  );

  editRoomSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(roomsActions.editRoomSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roomsActions.deleteRoom),
      switchMap((action) =>
        this.roomsService.deleteRoom(action.id).pipe(
          map((resp) => roomsActions.deleteRoomSuccess({ id: action.id })),
          catchError((error) => {
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            console.log('error');
            this.store.dispatch(stopLoading());
            return of(roomsActions.roomsError({ payload: error }));
          })
        )
      )
    )
  );

  deleteRoomSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(roomsActions.deleteRoomSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );

  constructor(
    private actions$: Actions,
    private roomsService: RoomsService,
    private store: Store<AppState>,
    private toasService: ToastService
  ) {}
}
