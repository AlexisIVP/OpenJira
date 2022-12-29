import { FC, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import router from "next/router";

export interface EntriesState {
  entries: Entry[];
}

export interface Props {
  children?: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: "pending",
    // };

    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });

      //TODO:mostrar snackbar
      if (showSnackbar)
        enqueueSnackbar("Entrada Actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        router.replace('/');
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
