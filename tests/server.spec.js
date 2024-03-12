const request = require("supertest")
const server = require("../index")

describe("Operaciones CRUD de cafes", () => {
  test("obteniendo un 200 ,y un arreglo con al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    })
    test("comprobando que se obtiene un codigo 404 al intentar eliminar un cafe con id que no existe", async () => {
        const idNoExistente = "id_que_no_existe"
        const response = await request(server).delete(`/cafes/${idNoExistente}`)
        expect(response.status).toBe(404)
    })
    test("prueba que la ruta post agrega un nuevo cafe y devuelve un codigo 201", async () => {
        const response = await request(server).post("/cafes").send( {"id": "5","nombre": "Mokka Blanco"} )
        expect(response.status).toBe(201)
    })
    test("Prueba que la ruta put devuelva un status 400 al intentar actualizar un cafe con un id disntinto al del payload", async () => {
        const response = await request(server).put("/cafes/4").send({"id": "5","nombre": "Mokka Blanco"})
        expect(response.status).toBe(400)
    })
})
