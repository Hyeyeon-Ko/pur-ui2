export interface Option {
  value: string;
  label: string;
}

export interface DownProps {
  fileOptions?: Option[];
  reasonOptions?: Option[];
}

export interface State {
  selectedFile: string;
  selectedReason: string;
  otherReason: string;
}

export const initialState: State = {
  selectedFile: "",
  selectedReason: "",
  otherReason: "",
};

export const reducer = (
  state: State,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, selectedFile: action.payload };
    case "SET_REASON":
      return { ...state, selectedReason: action.payload };
    case "SET_OTHER_REASON":
      return { ...state, otherReason: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
