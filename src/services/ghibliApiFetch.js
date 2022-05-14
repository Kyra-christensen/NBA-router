export async function ghibliApiFetch() {
  const res = await fetch('https://ghibliapi.herokuapp.com/films');
  const data = await res.json();

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    originalTitle: item.original_title,
    image: item.image,
    description: item.description,
    director: item.director,
    producer: item.producer,
    characters: item.people,
  }));
}