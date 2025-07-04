import { createReducer, on } from "@ngrx/store";
import { initialLawState, lawAdapter } from "./law.state";
import * as LawActions from "./law.actions";

export const lawReducer = createReducer(
  initialLawState,
  on(LawActions.fetchAllLaws, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(LawActions.fetchAllLawsSuccess, (state, { laws, status }) =>
    lawAdapter.setAll(laws, {
      ...state,
      operation: {
        loading: false,
        status: status,
      }
    })
  ),
  on(LawActions.fetchAllLawsFailure, (state, { status }) => ({
    ...lawAdapter.removeAll(state),
    operation: {
      loading: false,
      status: status,
    }
  })),
  on(LawActions.fetchLaw, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(LawActions.fetchLawSuccess, (state, { law, status }) =>
    lawAdapter.upsertOne(law, {
      ...state,
      selectedLawId: law.id,
      operation: {
        loading: false,
        status: status,
      }
    })
  ),
  on(LawActions.fetchLawFailure, (state, { status }) => ({
    ...state,
    operation: {
      loading: false,
      status: status,
    }
  })),
)
