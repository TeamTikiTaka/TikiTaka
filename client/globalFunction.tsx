
export function useridFromCookie() {
  const allCookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim());
  for(let i = 0; i < allCookies.length; i++){
    if(allCookies[i].startsWith('user_id=')) {
      return Number(allCookies[i].split('=')[1]);
    }
  }
  return -1;

}
