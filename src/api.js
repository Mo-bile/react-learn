export async function getFoods(order){
    const query = `order=${order}`;
    const response =
        await fetch(`https://learn.codeit.kr/1330/foods?${query}`);
    const body = response.json();
    return body;
}