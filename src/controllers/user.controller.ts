import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

// get all users
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filter = {};
    // get all user query (database ma garni)
    const user = await User.find(filter);

    // * success respone
    res.status(200).json({
      message: " All users are fetched",
      status: "success",
      success: true,
      data: user,
    });
  } catch (error: any) {
    next({
      message: error?.message || " Something went wrong",
      status: "error",
      success: false,
      data: null,
      statusCode: error?.statusCode || 500,
    });
  }
};

// !get by id
export  const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
)=>{

    try{

        //  user id 
        const {id} = req.params;
        // db query
        const user = await User.findOne({_id:id});

        // user not found
        if(!user) {
            const error:any = new Error("User not found");
            error.statusCode= 400;
            error.status="fail";
            throw error;

        }

        // success respone
        res.status(200).json({
        message: ` Users ${id}  fetched`,
      status: "success",
      success: true,
      data: user,
    })
} catch (error: any) {
    next({
      message: error?.message || " Something went wrong",
      status: "success",
      success: false,
      data: null,
      statusCode: error?.statusCode || 500,
    });
}
}
