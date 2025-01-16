import { body } from "express-validator";

const middlewareValidadorFormEditPet = [
    body('name').isString('debe ser un string').isLength({min: 3, max: 50}),
    body('species').isString('debe ser un string').isLength({min: 3, max: 50}),
    body('breed').isString('debe ser un string').isLength({min: 3, max: 50}),
    body('adoption_status').isString().matches(['Sin solicitud', 'Aprobada', 'Rechazada', 'Pendiente']),
    body('photo_url').isString().isURL({allow_protocol_relative_urls: true}),
    body('entry_date').isDate().optional()
]

export default middlewareValidadorFormEditPet