const BASE_URL = "https://learn.codeit.kr/1330";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 0,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error("리부 불러오는 실패");
  }
  const body = await response.json();
  return body;
}

export async function createReviews(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰 생성하는데 실패함");
  }
  const body = await response.json();
  return body;
}
