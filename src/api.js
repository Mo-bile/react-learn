export async function getReviews(
    {   order = 'createdAt',
        offset = 0,
        limit = 0}
) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const response =
        await fetch(`https://learn.codeit.kr/1330/film-reviews?${query}`);
    if(!response.ok){
        throw new Error("리부 불러오는 실패");
    }
    const body = await response.json();
    return body;
}