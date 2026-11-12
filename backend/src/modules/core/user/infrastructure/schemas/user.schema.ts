import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "users", versionKey: false })
export class UserDocument {
  @Prop({ type: String, required: true })
  _id!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({ type: String, required: true, select: false })
  passwordHash!: string;

  @Prop({ type: Date, required: true, default: () => new Date() })
  createdAt!: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(UserDocument);
