export async function getAccommodations() {
  const response = await fetch('http://localhost:3001/accommodations')

  if (!response.ok) {
    throw new Error('Erro ao buscar acomodações')
  }

  return response.json()
}
