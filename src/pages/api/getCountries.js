export default async function handler(req, res) {
    const response = await fetch("http://localhost:8080/countries")
    if(response.status !== 200) {
        return res.status(response.status).json(response.statusText)
    }
    const data = await response.json()

    res.status(200).json(data)
}
