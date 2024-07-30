export async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  if (response.status === 200) {
    console.log(data);
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function getData() {
  let data = await fetchData();
  return data;
}
