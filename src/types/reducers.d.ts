// menuMgnt.ts, menuSlct.ts, wishList.ts,
// orderSheet.ts, dailySales.ts, tableMgnt.ts
export interface InitialState_Data {
  data: any[];
  isLoading: boolean;
  isDone: boolean;
  error: null;
}

// select.ts
export interface InitialState_Select {
  select: any;
  isLoading: boolean;
  isDone: boolean;
  error: null;
}

// modal.ts
export interface InitialState_Open {
  open: boolean[];
  isLoading: boolean;
  isDone: boolean;
  error: null;
}
