import {FilterQuery, Model, ProjectionType, QueryOptions, Types} from "mongoose";


export abstract class BaseRepository<modelType> {

    constructor(private model: Model<modelType>) {
    }


    async createNewDocument(model: modelType): Promise<modelType> {
        return await this.model.create(model);
    }

    async findOneDocumentById(id: Types.ObjectId): Promise<modelType | null> {
        return await this.model.findById(id);
    }

    // async updateDocument(model: modelType): Promise<modelType> {
    //     return await this.model.updateOne(model);
    // }

    // @ts-ignore
    async deleteDocumentById(model: modelType): Promise<modelType> {

    }

   // async findOneDocument(filter: FilterQuery<modelType>, projection?: ProjectionType<modelType>, options?: QueryOptions<modelType>): Promise<modelType> {

    //}

}