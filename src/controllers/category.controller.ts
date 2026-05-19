import { NextFunction,Request,Response } from "express";
import Category from "../models/category.models";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";



export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    if (!category) {
      throw new AppError(`category ${id} not found`, 404);
    }

    sendResponse(res, {
      message: `category ${id} fetched`,
      data: category,
      statusCode: 200,
    });
  });


export const getById = catchAsync(
	async(req:Request,res:Response,next:NextFunction) => {
		const{ id} = req.params;
		const category = await Category.findOne({_id: id});
		if(!category){
			throw new AppError(`category ${id} not found` , 404);
		}
		sendResponse(res,{
			message:`category ${id} fetched`,
			data:category,
			statusCode:200,
		});
	});


	// create
	export const create = catchAsync(async(req:Request,res:Response) =>{
		const {name,description} = req.body;
		if(!name) {
			throw new AppError("name is requried",400);
		}
		const category =new Category({ name,description});
		// todo:handle image

		await category.save();
		sendResponse(res,{
			message:"category created",
			data:category,
			statusCode:201,
		});
	});

	// update
	export const update = catchAsync(async(req:Request,res:Response) =>{
		const {name,description} = req.body;
		const{id} = req.params;

		const category = await Category.findOne({_id:id});
		if(!category){
			throw new AppError(`category ${id} not found` , 404);
		}
		if (name) category.name = name
		if(description) category.description = description;
		// * save update category to database
		await category.save();
		sendResponse(res,{
			message:"category ${id} updated",
			data:category,
			statusCode:200,
		});
	});

	// delete
	export const remove =catchAsync (async(req:Request,res:Response) =>{
		const{ id} = req.params;
		const category = await Category.findOne({_id: id});
if(!category){
			throw new AppError(`category ${id} not found` , 404);
		}
		await category.deleteOne();
		sendResponse(res,{
			message:`category ${id} deleted`,
			data:category,
			statusCode:200,
		});

	});