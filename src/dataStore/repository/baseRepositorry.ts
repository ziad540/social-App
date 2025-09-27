import {Document, FilterQuery, Model, ProjectionType, QueryOptions, Types} from "mongoose";


export abstract class BaseRepository<modelType extends Document> {

    constructor(protected model: Model<modelType>) {
    }


    async createNewDocument(model: modelType): Promise<modelType> {
        return await this.model.create(model as any) as unknown as modelType;
    }

    async findOneDocumentById(id: Types.ObjectId): Promise<modelType | null> {
        const doc = await this.model.findById(id).exec();
        return doc as unknown as modelType | null;
    }

    async findOneDocument(filter: FilterQuery<modelType>, projection?: ProjectionType<modelType>, options?: QueryOptions<modelType>): Promise<modelType | null> {
        const doc = await this.model.findOne(filter as any, projection as any, options as any).exec();
        return doc as unknown as modelType | null;
    }

    async updateDocumentById(id: Types.ObjectId, update: Partial<modelType>, options?: QueryOptions<modelType>): Promise<modelType | null> {
        const doc = await this.model.findByIdAndUpdate(id, update as any, {new: true, ...(options || {})} as any).exec();
        return doc as unknown as modelType | null;
    }

    async deleteDocumentById(id: Types.ObjectId): Promise<modelType | null> {
        const doc = await this.model.findByIdAndDelete(id).exec();
        return doc as unknown as modelType | null;
    }

}