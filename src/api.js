export async function getFoods({ order = '', cursor = '', limit = 10 }){
    const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
    const response =
        await fetch(`https://learn.codeit.kr/1330/foods?${query}`);
    if(!response.ok){
        throw new Error("리뷰 불러오기 실패")
    }

    const body = response.json();
    return body;
}