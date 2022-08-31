import { Request, Response } from "express";
import { getPropertiesService } from "../../services/properties/getProperties.service";

export const getPropertiesController = async (req: Request, res: Response) => {

    const properties = await getPropertiesService();

    return res.status(200).json(properties);
}