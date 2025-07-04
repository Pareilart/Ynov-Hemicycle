import { createSelector, MemoizedSelector } from "@ngrx/store";
import { LAW_FEATURE_KEY, lawAdapter, LawState } from "./law.state";
import { DefaultProjectorFn } from "@ngrx/store";
import { createFeatureSelector } from "@ngrx/store";

export const selectLawState: MemoizedSelector<
  object,
  LawState,
  DefaultProjectorFn<LawState>
> = createFeatureSelector<LawState>(LAW_FEATURE_KEY);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = lawAdapter.getSelectors();

export const selectAllLaws = createSelector(
  selectLawState,
  selectAll
);

export const selectLawEntities = createSelector(
  selectLawState,
  selectEntities
);

export const selectLawIds = createSelector(
  selectLawState,
  selectIds
);

export const selectLawTotal = createSelector(
  selectLawState,
  selectTotal
);

export const selectLawSelectedId = createSelector(
  selectLawState,
  (state: LawState) => state.selectedLawId
);

export const selectLawOperation = createSelector(
  selectLawState,
  (state: LawState) => state.operation
);

export const selectLawLoading = createSelector(
  selectLawState,
  (state: LawState) => state.operation.loading
);

export const selectLawStatus = createSelector(
  selectLawState,
  (state: LawState) => state.operation.status
);

export const selectSelectedLaw = createSelector(
  selectLawState,
  (state: LawState) => state.selectedLawId
);

export const selectLawById = (id: string) => createSelector(
  selectLawState,
  (state: LawState) => state.entities[id]
);




