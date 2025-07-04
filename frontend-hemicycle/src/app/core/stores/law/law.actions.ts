import { Law } from "@app/core/models/law/law.model";
import { StoreOperationStatus } from "@app/core/models/store/store-operation-status.model";
import { createAction, props } from "@ngrx/store";

export const fetchAllLaws = createAction(
  '[Law] Fetch All Laws'
);

export const fetchAllLawsSuccess = createAction(
  '[Law] Fetch All Laws Success',
  props<{ laws: Law[], status: StoreOperationStatus }>()
);

export const fetchAllLawsFailure = createAction(
  '[Law] Fetch All Laws Failure',
  props<{ status: StoreOperationStatus }>()
);

export const fetchLaw = createAction(
  '[Law] Fetch Law',
  props<{ id: string }>()
);

export const fetchLawSuccess = createAction(
  '[Law] Fetch Law Success',
  props<{ law: Law, status: StoreOperationStatus }>()
);

export const fetchLawFailure = createAction(
  '[Law] Fetch Law Failure',
  props<{ status: StoreOperationStatus }>()
);


