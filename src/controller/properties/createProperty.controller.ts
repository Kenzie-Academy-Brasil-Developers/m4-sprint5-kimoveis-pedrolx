import { Request, Response } from "express";
import { createPropertyService } from "../../services/properties/createProperty.service";

export const createPropertyController = async(req: Request, res: Response) => {

    const { value, size, address, categoryId } = req.body;
    const { district, zipCode, number, city, state } = address

    const property = await createPropertyService({ value, size, address, categoryId }, { district, zipCode, number, city, state });

    return res.status(201).json(property);

}