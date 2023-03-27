import axios from "axios";

type Workshop = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  slug: string;
};

export async function getWorkshops(): Promise<Array<Workshop>> {

  const workshops = await axios.get('http://127.0.0.1:8000/api/workshops').then(res => res.data)
  return workshops
}

export async function getWorkshop(slug: string) {
  const workshop = await axios.get(`http://127.0.0.1:8000/api/workshops/${slug}`).then(res => res.data)
  return workshop
}
