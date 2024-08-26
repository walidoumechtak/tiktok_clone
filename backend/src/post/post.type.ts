import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.model";

@ObjectType()
export class PostType{
    @Field(() => Int)
    id: number;

    @Field()
    text: string;

    @Field()
    createdAt: Date;

    @Field()
    video: string;

    @Field(() => User)
    user: User;

    @Field(() => [LikeType], {nullable: true})
    likes?: LikeType;
}

export class LikeType{
    @Field(() => Int)
    id: number;

    @Field(() => User)
    user: User;

    @Field(() => PostType)
    post: PostType;
}