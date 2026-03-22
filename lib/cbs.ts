const CBS_API = "https://api.cbssports.com/fantasy";
const LEAGUE_ID = "1774188602";
const SPORT = "football";

let cachedToken: { token: string; expires: number } | null = null;

export async function getCBSToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires) {
    return cachedToken.token;
  }

  const res = await fetch("https://api.cbssports.com/general/oauth/generate_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "password",
      username: process.env.CBS_USERNAME!,
      password: process.env.CBS_PASSWORD!,
      response_format: "JSON",
    }),
  });

  if (!res.ok) {
    throw new Error(`CBS auth failed: ${res.status}`);
  }

  const data = await res.json();
  const token = data.body?.access_token ?? data.access_token;
  if (!token) throw new Error("No access token in CBS response");

  cachedToken = { token, expires: Date.now() + 55 * 60 * 1000 };
  return token;
}

export async function cbsFetch(endpoint: string) {
  const token = await getCBSToken();
  const url = `${CBS_API}/${endpoint}&league_id=${LEAGUE_ID}&sport=${SPORT}&version=3.0&access_token=${token}&response_format=JSON`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`CBS API error: ${res.status} ${url}`);
  return res.json();
}
