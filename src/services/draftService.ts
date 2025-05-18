import { getAllSavedData, saveData } from './localStorage.ts'
import { DRAFT_LOCAL_NAME, LOGGED_USER_ID } from '@/constants/constants.ts';
import DraftDto from '@/dto/draft-dto.ts';



export const createDraft = (singleData: DraftDto) => {
  let data: DraftDto[] = getAllSavedData(DRAFT_LOCAL_NAME);
  const userId = getAllSavedData(LOGGED_USER_ID);
  const myDraft = singleData
  if (data) {
    myDraft.id = Date.now();
    data.push(myDraft)

  } else {
    myDraft.id = Date.now();;
    data = [myDraft]
  }
  saveData(DRAFT_LOCAL_NAME, data);
  return true
}



export const getSingleDraft = (singleId: number) => {
  const data: DraftDto[] = getAllSavedData(DRAFT_LOCAL_NAME);
  const userId = getAllSavedData(LOGGED_USER_ID);
  if (data) {
    const singleData: DraftDto | undefined = data.find((draft: DraftDto) => draft.id === singleId && draft.userId == userId)
    return singleData;
  } else {
    return null
  }
}



export const deleteSingleDraft = (singleId: number) => {
  const data: DraftDto[] = getAllSavedData(DRAFT_LOCAL_NAME);
  const userId = getAllSavedData(LOGGED_USER_ID);
  if (data) {
    const remainingData: DraftDto[] = data.filter((draft: DraftDto) => draft.id !== singleId && draft.userId === userId);
    saveData(DRAFT_LOCAL_NAME, remainingData)
    return remainingData;
  } else {
    return null
  }
}


export const updateDraft = (singleData: DraftDto) => {
  let data: DraftDto[] = getAllSavedData(DRAFT_LOCAL_NAME);
  const userId = getAllSavedData(LOGGED_USER_ID);
  if (data) {
    const singleDataIndex: number = data.findIndex((draft: DraftDto) => draft.id == singleData.id && draft.userId === userId);
    data[singleDataIndex] = singleData
    saveData(DRAFT_LOCAL_NAME, data)
    return data;
  } else {
    return null
  }
}

export const getAllSingleUserDraft = (search: string = '') => {
  const data: DraftDto[] = getAllSavedData(DRAFT_LOCAL_NAME);
  const userId = getAllSavedData(LOGGED_USER_ID);
  if (data) {
    let allSingleUser: DraftDto[] | undefined;
    if (search) {
      allSingleUser = data.filter((draft: DraftDto) => draft.userId == userId&&draft.title.toLowerCase().includes(search.toLocaleLowerCase()))
    } else {
      allSingleUser = data.filter((draft: DraftDto) => draft.userId == userId)
    }

    return allSingleUser;
  } else {
    return null
  }
}



