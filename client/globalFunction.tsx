
export function useridFromCookie() {
  const allCookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim());
  return Number(allCookies[2].split('=')[1]);

}
