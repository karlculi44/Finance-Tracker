const USER_NAME_STORAGE_KEY = "userName";
const SETUP_COMPLETED_STORAGE_KEY = "setupCompleted";

export function hasCompletedSetup() {
  return localStorage.getItem(SETUP_COMPLETED_STORAGE_KEY) === "true";
}

export function getUserName() {
  return localStorage.getItem(USER_NAME_STORAGE_KEY) ?? "";
}

export function saveUserName(userName: string) {
  localStorage.setItem(USER_NAME_STORAGE_KEY, userName);
}

export function completeSetup(userName: string) {
  localStorage.setItem(USER_NAME_STORAGE_KEY, userName);
  localStorage.setItem(SETUP_COMPLETED_STORAGE_KEY, "true");
}
