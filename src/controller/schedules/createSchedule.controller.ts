import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedules/createSchedule.service";

export const createScheduleController = async (req: Request, res: Response) => {

    let userId = req?.user?.id;

    const { date, hour, propertyId } = req.body;

    const schedule = await createScheduleService({ date, hour, propertyId, userId });

    return res.status(201).json({ message: 'Schedule created', schedule: schedule });

}