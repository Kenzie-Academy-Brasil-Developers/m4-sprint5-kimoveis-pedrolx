import { Request, Response } from "express";
import { getScheduledPropertiesService } from "../../services/schedules/getScheduledProperties.service";

export const getScheduledPropertiesController = async (req: Request, res: Response) => {

    const { id } = req.params;

    const properties = await getScheduledPropertiesService({ id });

    console.log();

    return res.status(200).json(properties);
}